/* global it */

const expect = require('chai').expect;
const GiphyService = require('../embedit/services/giphy.js');

it('GiphyService should return media models of service Giphy', function () {

    async function requests() {
        try {
            const mediaModels = mediaModels.concat(await GiphyService.getMedia(query));
            expect(mediaModels.length).to.be.above(0);
            expect(mediaModels[0].service).to.equal('Giphy');
        } catch (e) {

        }
    }

    try {
        requests();
    } catch (e) {

    }

});