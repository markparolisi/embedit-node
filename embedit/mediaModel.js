/**
 * MediaModel class.
 * 
 * @constructor
 * @param {Object} attributes - The attributes for a media object.
 */
class MediaModel {

    constructor(attributes) {

        var _properties = {
            'name': '',
            'service': '',
            'source': '',
            'type': '',
            'created': new Date().toISOString(),
            'thumbnailURL': '',
            'mediaURL': '',
            'credit': '',
        };

        for (var key in attributes) {
            if (_properties[key] != undefined) {
                _properties[key] = attributes[key];
            }
        }

        this.properties = _properties;
    }

    getProperties() {
        return this.properties;
    }

}

module.exports = MediaModel;