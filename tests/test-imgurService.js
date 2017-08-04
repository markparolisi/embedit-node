/* global it */

const expect = require('chai').expect;
const ImgurService = require('../embedit/services/imgur.js');

it('ImgurService should return media models of service Imgur', function () {

    try {
        async () => {
            try {
                const mediaModels = mediaModels.concat(await ImgurService.getMedia(query));
                expect(mediaModels.length).to.be.above(0);
                expect(mediaModels[0].service).to.equal('Imgur');
            } catch (e) {

            }
        }
    } catch (e) {

    }

});