const MediaModel = require('../mediaModel.js');
const config = require('config');
const https = require('https');

/**
 * Class to handle Imgur requests
 */
class ImgurService {

    /**
     * Fetch media from the service and return a list of MediaModels
     * 
     * @param {string} searchQuery - The client-requested search term
     */
    getMedia(searchQuery) {

        return new Promise(function (resolve, reject) {
            var clientID;

            if (process.env.IMGURCLIENTID) {
                clientID = process.env.IMGURCLIENTID
            } else {
                try {
                    clientID = config.get('imgur.clientID')
                } catch (e) {
                    reject(e);
                }
            }

            if (!(clientID)) {
                reject(new Error("Missing Imgur Client ID"));
            }

            const options = {
                hostname: 'api.imgur.com',
                path: '/3/gallery/search/top/?q=' + searchQuery,
                headers: { 'Authorization': 'Client-ID ' + clientID },
                method: 'GET'
            };

            var req = https.request(options, function (res) {

                var body = '';

                res.on('data', function (chunk) {
                    body += chunk;
                });

                res.on('end', function () {

                    const elements = JSON.parse(body).data;
                    var mediaModels = [];

                    // Iterate over JSON elements and build a list of MediaModels
                    elements.forEach((element) => {

                        if (element.is_album === true) {
                            return;
                        }

                        var created = new Date(element.datetime).toISOString();

                        var imgurModel = new MediaModel({
                            name: element.title,
                            service: 'Imgur',
                            mediaURL: element.link,
                            source: element.link,
                            type: 'image',
                            created: created,
                            thumbnailURL: element.link.replace(/(\.[a-z]{3,4})$/g, "m$1"),
                            credit: 'http://imgur.com/user/' + element.account_url,
                        });

                        mediaModels.push(imgurModel);
                    });

                    if (mediaModels) {
                        resolve(mediaModels);
                    } else {
                        reject();
                    }
                });

            });

            req.end();
        });
    }
}

module.exports = new ImgurService()