var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var App = require('mosaic-core').App;
var Api = App.Api;
var Teleport = require('mosaic-teleport');

/** This module manages resource statistics. */
module.exports = Api.extend({

    /**
     * Initializes internal fields.
     */
    _initFields : function() {
        this._user = null;
    },

    /**
     * Loads information about selected/active entities.
     */
    start : function() {
    },

    /** Closes this module. */
    stop : function() {
    },

    getUserInfo : function() {
        var that = this;
        var baseUrl = that.app.options.userInfoApiUrl;
        var client = Teleport.HttpClient.newInstance({
            baseUrl : baseUrl
        });
        return client.exec({
            path : '',
            method : 'GET'
        }).then(function(json) {
            var user;
            try {
                user = _.isObject(json) ? json : JSON.parse(json); 
            } catch (err) {
            }
            if (!user || !user.displayName)
                return;
            return user;
        });
    },

    setUserInfo : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            that._user = intent.params;
        })).then(function() {
            that.notify();
        });
    }),

});
