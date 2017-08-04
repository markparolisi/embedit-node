process.env.SUPPRESS_NO_CONFIG_WARNING = 1;
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
const GiphyService = require('./embedit/services/giphy.js');
const ImgurService = require('./embedit/services/imgur.js');

router.get('/', function (req, res) {
    res.send('Please access the service at /media');
});

router.get('/media', function (req, res) {

    const query = req.query.q
    const services = req.query.services.toLowerCase();
    const servicesList = services.split(',');

    if (!(query) || !(services)) {

        var message = "";

        if (!(query)) {
            message += "Missing search query. ";
        }

        if (!(services)) {
            message += "Missing search services.";
        }

        res.status(400);
        return res.json({ message: message });
    }

    console.log("Searching query: " + query);
    console.log("Searching services: " + services);

    async function requests() {
        try {
            var mediaModels = [];


            if (servicesList.includes('giphy')) {
                mediaModels = mediaModels.concat(await GiphyService.getMedia(query));
            }

            if (servicesList.includes('imgur')) {
                mediaModels = mediaModels.concat(await ImgurService.getMedia(query));
            }

            mediaModels = mediaModels.map(function (m) {
                return m.properties;
            });

            res.json(mediaModels);
        } catch (error) {
            error(error);
        }
    }

    requests();

});

app.use('/', router);

app.listen(port);

console.log('Embedit started');