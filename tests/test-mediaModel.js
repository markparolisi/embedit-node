/* global it */

const expect = require('chai').expect;
const MediaModel = require('../embedit/mediaModel.js');

it('MediaModel should override properties and ignore unknowns', function () {

    var customProps = {
        'name': 'test name',
        'foo': 'bar',
    };

    const testModel = new MediaModel(customProps);

    expect(testModel.properties['name']).to.equal(customProps['name']);
    expect(testModel.properties['foo']).to.equal(undefined);
    expect(testModel.properties['source']).to.equal('');

});