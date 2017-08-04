const MediaModel = require('../mediaModel.js');
const config = require('config');
const Giphy = require('giphy')

/**
 * Class to handle Giphy requests
 */
class GiphyService {

    /**
     * Fetch media from the service and return a list of MediaModels
     * 
     * @param {string} searchQuery - The client-requested search term
     */
    getMedia(searchQuery) {

        return new Promise(function (resolve, reject) {
            var apiKey;

            if (process.env.GIPHYAPIKEY) {
                apiKey = process.env.GIPHYAPIKEY;
            } else {
                try {
                    apiKey = process.env.GIPHYAPIKEY || config.get('giphy.apiKey');
                } catch (e) {
                    reject(e);
                }
            }

            if (!(apiKey)) {
                reject(new Error("Missing Giphy API Key"));
            }

            let giphy = new Giphy(apiKey);

            const params = {
                'q': searchQuery,
                'rating': 'r',
                'fmt': 'json',
            };

            giphy.search(params, function (err, m, res) {

                var mediaModels = [];

                // Just send back an empty list on error
                if (err) {
                    return mediaModels;
                }

                // Iterate over all of the JSON objects and convert them into MediaModels
                m.data.forEach((element) => {

                    var created = new Date(Date.parse(element.import_datetime)).toISOString();

                    var giphyModel = new MediaModel({
                        name: element.slug,
                        service: "Giphy",
                        mediaURL: element.url,
                        source: element.url,
                        type: "gif",
                        created: created,
                        thumbnailURL: element.images.downsized.url,
                        credit: element.source,
                    });

                    mediaModels.push(giphyModel);
                });

                if (mediaModels) {
                    resolve(mediaModels);
                } else {
                    reject();
                }
            });
        });
    }
}

module.exports = new GiphyService()