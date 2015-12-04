var _ = require('underscore');
var Mosaic = require('mosaic-commons');

//NOMINATIM http://wiki.openstreetmap.org/wiki/Nominatim
var BASE_URL = 'http://nominatim.openstreetmap.org/search.php';
var JSONP_CALLBACK = 'json_callback';
var OsmGeolocation = Mosaic.Class.extend({

  /** Base search URL */
  _baseUrl: BASE_URL,

  initialize: function(options) {
    _.extend(this, options);
  },

  /**
   * @param params.addr
   *            address to geolocalize
   */
  geolocalize: function(params) {
    var that = this;
    var url = this._getServiceUrl(params);
    console.log('>>> URL', url);
    return this._remoteCall(url, JSONP_CALLBACK).then(function(data) {
      var suggestion = that._extractFirstCandidate(data);
      return suggestion;
    }, function(error) {
        console.log('>>> ERROR', error);
        throw error;
    });
  },

  _remoteCall: function(url, callbackName) {
    var jsonp = require('jsonp');
    return Mosaic.P.ninvoke(jsonp, jsonp, url, {param: callbackName});
  },


  /**
   * Returns the full service url corresponding to the requested address
   */
  _getServiceUrl: function(params) {
    var urlParams = {
      format: 'json'
    };
    ['street', 'postcode', 'city', 'country'].forEach(function(param) {
        if (params[param])
          urlParams[param] = params[param];
    });
    var url = this._baseUrl + this._getParamString(urlParams);
    return url;
  },

  _getParamString: function(obj, existingUrl, uppercase) {
    var params = [];
    for (var i in obj) {
      params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
    }
    return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
  },

  /**
   * Transforms data returned by the server into a list of standardized points
   */
  _extractFirstCandidate: function(locations) {
    var len = locations ? locations.length : 0;
    for (var i = 0; i < len; i++) {
      var location = locations[i];
      if (!location)
        continue;
      var point = {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon)
      };
      //TODO: check the most relevant points are returned first
      return point;
      break;
    }
    return null;
  }
});

module.exports = OsmGeolocation;
