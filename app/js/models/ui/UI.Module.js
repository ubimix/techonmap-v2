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
        this._initialMode = app.options.mode || 'full';
        this._mode = this._initialMode;
        this._viewKey = 'map';
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

    // ------------------------------------------------------------------------

    /** Returns the key of the focused view. */
    getFocusedViewKey : function() {
        return this._viewKey;
    },

    /** Focus a view with the specified key. */
    focusView : function(key) {
        return this.doFocusView({
            viewKey : key || 'map'
        });
    },

    /** Performs the real focus action. */
    doFocusView : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            that._viewKey = intent.params.viewKey || 'map';
        })).then(function() {
            that.notify();
        });
    }),

    // ------------------------------------------------------------------------

    /**
     * Returns <code>true</code> if this application is in mobile mode.
     */
    isMobileMode : function() {
        return this._mode === 'mobile';
    },

    /** Activates the mobile mode. */
    toggleMobileMode : function() {
        return this.setScreenMode({
            mode : this.isTabletMode() ? this._initialMode : 'mobile'
        });
    },

    /** Activates the mobile mode. */
    setMobileMode : function() {
        return this.setScreenMode({
            mode : 'mobile'
        });
    },

    // ------------------

    /**
     * Returns <code>true</code> if this application is in mobile mode.
     */
    isTabletMode : function() {
        return this._mode === 'tablet';
    },

    /** Activates tablet mode. */
    toggleTabletMode : function() {
        return this.setScreenMode({
            mode : this.isTabletMode() ? this._initialMode : 'tablet'
        });
    },

    /** Activates the tablet mode. */
    setTabletMode : function() {
        return this.setScreenMode({
            mode : 'tablet'
        });
    },

    // ------------------

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

    // ------------------

    /** Updates the internal field defining the current visualization mode. */
    setScreenMode : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            that._mode = intent.params.mode || this._initialMode;
        })).then(function() {
            that.notify();
        });
    }),
});
