process.env.SUPPRESS_NO_CONFIG_WARNING = 1;
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
var GiphyService = require('./embedit/services/giphy.js');

router.get('/', function (req, res) {
    res.send('Please access the service at /media');
});

router.get('/media', function (req, res) {

    var query = req.query.q
    var services = req.query.services

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
            var mediaModels = await GiphyService.getMedia(query);

            mediaModels = mediaModels.map(function (m) {
                return m.properties;
            });

            res.json(mediaModels);
        } catch (error) {
            console.error(error);
        }
    }

    requests();

});

app.use('/', router);

app.listen(port);

console.log('Embedit started');