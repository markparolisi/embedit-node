/**
 * MediaModel class.
 * 
 * @constructor
 * @param {Object} attributes - The attributes for a media object.
 */
class MediaModel {
  /**
     * 
     * @param {object} attributes - A map of model properties. see defaultProperties for example
     */
  constructor(attributes) {
    const defaultProperties = {
      name: "",
      service: "",
      source: "",
      type: "",
      created: new Date().toISOString(),
      thumbnailURL: "",
      mediaURL: "",
      credit: ""
    };

    // Replace any matching keys in our default properties with ones provided by caller
    for (var key in attributes) {
      if (defaultProperties[key] != undefined) {
        defaultProperties[key] = attributes[key];
      }
    }

    this.properties = defaultProperties;
  }

  getProperties() {
    return this.properties;
  }
}

module.exports = MediaModel;
