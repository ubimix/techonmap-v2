var _ = require('underscore');
var Mosaic = require('mosaic-commons');
require('mosaic-core');

var Api = Mosaic.App.Api;

/** An API allowing to manage Map layers visibility. */
module.exports = Api.extend({

    /**
     * This initializes internal fields of this object.
     */
    _initFields : function(options) {
        this._mapZoomLevel = this.getInitialMapZoom();
    },

    /** Pre-loads map-related information. */
    start : function() {
        var that = this;
        return Mosaic.P.then(function() {
        });
    },

    stop : function() {
    },
    // ------------------------------------------------------------------

    /** This intent handlers increases/decreases the current map zoom level. */
    changeMapZoom : Api.intent(function(intent) {
        var that = this;
        intent.resolve(Mosaic.P.then(function() {
            var zoom = intent.params.zoom;
            if (!zoom) {
                var delta = intent.params.zoomDelta;
                zoom = that.getMapZoomLevel() + delta;
            }
            return that._setMapZoomLevel(zoom);
        })).then(function() {
            // Check that there is no performance issues
            that._notifyMapChanges();
        });
    }),

    // ------------------------------------------------------------------

    /** Returns an object of map-specific options of this application. */
    getMapOptions : function() {
        var app = this.options.app;
        var mapOptions = app.options.map || {};
        return mapOptions;
    },

    // ------------------------------------------------------------------

    /** Returns the initial zoom level for the map. */
    getInitialMapZoom : function() {
        var mapOptions = this.getMapOptions();
        return mapOptions.zoom || 8;
    },

    /** Returns the current zoom level of the map. */
    getMapZoomLevel : function() {
        return this._mapZoomLevel;
    },

    /** Add a new listener for map changes. */
    addMapChangeListener : function(listener, context) {
        this.on('map:change', listener, context);
    },

    /** Removes the specified listener of map changes. */
    removeMapChangeListener : function(listener, context) {
        this.off('map:change', listener, context);
    },

    /**
     * Notifies about changes on the map. Used internally by the Module class.
     */
    _notifyMapChanges : function() {
        this.fire('map:change');
    },

    /** Updates the zoom level. Used internally by the Module class. */
    _setMapZoomLevel : function(zoom) {
        this._mapZoomLevel = Math.max(3, Math.min(zoom, 18));
    },

});
