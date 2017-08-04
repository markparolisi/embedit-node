const mediaModel = require('../mediaModel.js');
const config = require('config');
const https = require('https');

class ImgurService {

    getMedia(searchQuery) {

        return new Promise(function (resolve, reject) {

            const options = {
                hostname: 'api.imgur.com',
                path: '/3/gallery/search/viral/?q=cat',
                headers: { 'Authorization': 'Client-ID ' + config.get('imgur.clientID') },
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

                    elements.forEach((element) => {

                        if (element.is_album === true) {
                            return;
                        }

                        var created = new Date(element.datetime).toISOString();

                        var imgurModel = new mediaModel({
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

                    resolve(mediaModels);
                });

            });

            req.end();
        });
    }
}

module.exports = new ImgurService()