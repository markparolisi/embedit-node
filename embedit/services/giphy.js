var mediaModel = require('../mediaModel.js');
var config = require('config');
var Giphy = require('giphy')

class GiphyService {

    getMedia(searchQuery) {

        return new Promise(function (resolve, reject) {

            let giphy = new Giphy(config.get('giphy.apiKey'));

            const params = {
                'q': searchQuery,
                'rating': 'r',
                'fmt': 'json',
            };

            giphy.search(params, function (err, m, res) {

                if (err) {
                    return;
                }

                var mediaModels = [];

                m.data.forEach((element) => {

                    var created = new Date(Date.parse(element.import_datetime)).toISOString();

                    var giphyModel = new mediaModel({
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

                resolve(mediaModels);
            });
        });
    }
}

module.exports = new GiphyService()