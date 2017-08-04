"use strict";

process.env.SUPPRESS_NO_CONFIG_WARNING = 1;
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
const GiphyService = require('./embedit/services/giphy.js');
const ImgurService = require('./embedit/services/imgur.js');

/**
 * Just send back plain text instructions to use the /media endpoint
 */
router.get('/', function (req, res) {
    res.send('Please access the service at /media?q={SEARCH_TERM}&services={SERVICES_CSV}');
});

/**
 * Main endpoint for the services
 */
router.get('/media', function (req, res) {

    let query = req.query.q
    let services = req.query.services;

    // Require both the search term and services list to proceed. Message appropriately
    if (!(query) || !(services)) {

        let message = "";

        if (!(query)) {
            message += "Missing search query. ";
        }

        if (!(services)) {
            message += "Missing search services.";
        }

        res.status(400);
        return res.json({ error: message });
    }

    // Since both params are defined, clean them up for use
    query = encodeURIComponent(query);
    services = services.toLowerCase();
    const servicesList = services.split(',');

    console.log("Searching query: " + query);
    console.log("Searching services: " + services);

    /**
     * Call each of the services requested
     */
    async function requests() {

        try {
            let mediaModels = [];

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
        } catch (e) {
            console.error(e);
            res.status(500);
            return res.json({ error: e.message });
        }

    }

    try {
        requests();
    } catch (e) {
        console.error(e);
        res.status(500);
        return res.json({ error: e.message });
    }

});

app.use('/', router);

app.listen(port);

console.log('Embedit started');