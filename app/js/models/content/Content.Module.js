var _ = require('underscore');
var Lunr = require('lunr');
var Mosaic = require('mosaic-commons');
var App = require('mosaic-core').App;
var ContentResource = require('./ContentResource');
var Teleport = require('mosaic-teleport');

var Api = App.Api;

/** Navigation module. Manages search criteria applied to resources. */
module.exports = Api.extend({}, {

    /** Initializes fields */
    _initFields : function() {
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
    },

    stop : function() {
    },

    // ------------------------------------------------------------------
    // Data loading

    loadContent : function(path) {
        var that = this;
        return that._loadText(path).then(function(text) {
            return new ContentResource(text);
        });
    },

    // ------------------------------------------------------------------
    // Private methods

    _loadText : function(path) {
        var that = this;
        return Mosaic.P.then(function() {
            var baseUrl = that.app.options.contentBaseUrl;
            var client = Teleport.HttpClient.newInstance({
                baseUrl : baseUrl
            });
            return client.exec({
                path : path,
                method : 'GET'
            });
        });
    }

});
