var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var App = require('mosaic-core').App;
var Api = App.Api;

/** This module manages visualization modes for the UI. */
module.exports = Api.extend({

    /**
     * Initializes internal fields.
     */
    _initFields : function() {
        var app = this.options.app;
        this._mode = app.options.mode || 'full';
    },

    /**
     * Loads information about selected/active entities.
     */
    start : function() {
        var that = this;
        return Mosaic.P.then(function() {
        });
    },

    /** Closes this module. */
    stop : function() {
    },

    /**
     * Returns <code>true</code> if this application is in mobile mode.
     */
    isMobileMode : function() {
        return this._mode === 'mobile';
    },

    /** Activates the mobile mode. */
    toggleMobileMode : function() {
        var newMode = this.isMobileMode() ? 'full' : 'mobile';
        return this.setScreenMode({
            mode : newMode
        });
    },

    /** Activates the mobile mode. */
    setMobileMode : function() {
        return this.setScreenMode({
            mode : 'mobile'
        });
    },

    /**
     * Returns <code>true</code> if the application is currently in the full
     * screen mode.
     */
    isFullScreenMode : function() {
        return this._mode === 'full';
    },

    /** Activates the full screen mode. */
    setFullScreenMode : function() {
        return this.setScreenMode({
            mode : 'full'
        });
    },

    /** Updates the internal field defining the current visualization mode. */
    setScreenMode : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            that._mode = intent.params.mode || 'full';
        })).then(function() {
            that.notify();
        });
    }),
});
