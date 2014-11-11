var _ = require('underscore');
var L = require('leaflet');

/**
 * An utility class managing map layers visibility depending on the zoom level.
 */
module.exports = L.Class.extend({

    statics : {
        wrap : function wrap(f) {
            return function() {
                var error;
                try {
                    return f.apply(this, arguments);
                } catch (err) {
                    error = err;
                } finally {
                    if (error) {
                        console.log('ERROR!', error);
                        throw error;
                    }
                }
            };
        }
    },

    /**
     * Initializes the range of zoom levels where this layer is visible.
     */
    initialize : function(options) {
        L.setOptions(this, options);
        this.app = this.options.app;
        // console.log(' * ', this._getLayerKey(), ' - ',
        // this.options.zIndex);
    },

    /**
     * Returns <code>true</code> if this layer is visible at the specified
     * zoom level.
     */
    isVisible : function() {
        if (!this._map)
            return false;
        var zoom = this._map.getZoom();
        var minZoom = this.options.minZoom || 0;
        var maxZoom = this.options.maxZoom || 25;
        return zoom >= minZoom && zoom <= maxZoom;
    },

    updateLayerVisibility : function() {
        if (!this._map)
            return;
        if (this.isVisible()) {
            this.show();
        } else {
            this.hide();
        }
    },

    /** This method is called to get the layer to show. */
    show : function() {
        var layer = this._getInnerLayer();
        if (this.options.onShow) {
            this.options.onShow(layer);
        }
        this._map.addLayer(layer);
        if (this.onShow) {
            this.onShow(layer);
        }
    },

    /**
     * This method is called to retrieve the layer if it is not visible and
     * should be removed from the map.
     */
    hide : function() {
        var layer = this._getInnerLayer();
        if (this.onHide) {
            this.onHide(layer);
        }
        this._map.removeLayer(layer);
    },

    /** This method is called when this layer is added to the map. */
    onAdd : function(map) {
        this._map = map;
        this.updateLayerVisibility();
    },

    /**
     * Removes all registered layers from the map. Cleans up all map listeners.
     */
    onRemove : function(map) {
        delete this._map;
        this.hide();
        if (this._layer) {
            this._deleteInnerLayer(this._layer);
        }
    },

    _getInnerLayer : function() {
        if (!this._layer) {
            this._layer = this._newInnerLayer();
        }
        return this._layer;
    },

    _getViewport : function() {
        var viewport = this.options.viewport;
        return viewport;
    },

    _newInnerLayer : function() {
        throw new Error('Not implemented');
    },
    _deleteInnerLayer : function(layer) {
    },

    _getLayerKey : function() {
        if (!this.options.layerKey) {
            throw new Error('Layer key is not defined');
        }
        return this.options.layerKey;
    },

    _newTilesLayer : function(tilesUrl, attribution) {
        var app = this.options.app;
        var mapOptions = app.map.getMapOptions();
        var maxZoom = mapOptions.maxZoom;
        var minZoom = mapOptions.minZoom;
        var tilesLayer = L.tileLayer(tilesUrl, {
            attribution : attribution,
            maxZoom : maxZoom,
            minZoom : minZoom,
            zIndex : this.options.zIndex || 0
        });
        return tilesLayer;
    },

});
