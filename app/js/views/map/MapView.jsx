/**
 * @jsx React.DOM
 */
'use strict';
var _ = require('underscore');
var React = require('react');
var L = require('leaflet');
var Mosaic = require('mosaic-commons');
var MosaicLeaflet = require('mosaic-core').Leaflet;
var ReactMapFactory = React.createFactory(MosaicLeaflet.ReactMap);
var MapViewport = MosaicLeaflet.MapViewport;

var MapBackgroundLayer = require('./MapBackgroundLayer');
var MapHeatmapLayer = require('./MapHeatmapLayer');
var MapDataLayer = require('./MapDataLayer');
var MapDebugLayer = require('./MapDebugLayer');

/**
 * This class is responsible for creation of a map and showing data on it.
 */
module.exports = React.createClass({
    displayName : 'MapView',

    _getApp : function() {
        return this.props.app;
    },

    /** Initializes this component. */
    componentWillMount : function() {
        var timeout = 50;
        this._onZoomEnd = _.debounce(this._onZoomEnd, timeout);
        this._onMapModelChange = _.debounce(this._onMapModelChange, timeout);
    },

    /** Main rendering method of this class. */
    render : function() {
        var app = this._getApp();
        var mapOptions = app.map.getMapOptions();
        return (ReactMapFactory({
            id : this.props.id,
            className : this.props.className,
            app : this.props.app,
            options : mapOptions,
            onMapAdd : this._onMapAdd,
            onMapRemove : this._onMapRemove,
            style : this.props.style
        }));
    },

    /** Sets a new viewport bounding box for this map. */
    setViewport : function(topLeft, bottomRight, focusPosition) {
        if (!this._viewport)
            return;
        var bounds = L.bounds(topLeft, bottomRight);
        this._viewport.setViewport(bounds);
        if (focusPosition) {
            this._viewport.setFocusPosition({
                top : focusPosition[1],
                left : focusPosition[0]
            });
        }
        if (this._map && !this._map._loaded) {
            // Initial map focus
            var app = this._getApp();
            var mapOptions = app.map.getMapOptions();
            var zoom = mapOptions.zoom || 8;
            var center = mapOptions.center || [ 0, 0 ];
            var latlng = L.latLng(center[1], center[0]);
            var center = L.bounds(topLeft, bottomRight).getCenter();
            this._viewport.focusTo(latlng, center);
        }
    },

    /**
     * This method is called by the Mosaic.Leaflet.ReactMap to notify that the
     * map was attached to the DOM.
     */
    _onMapAdd : function(map) {
        this._map = map;
        this._viewport = new MapViewport({
            map : map
        });
        this._registerLayers(map);
        this._registerHandlers(map);
    },

    /**
     * This method is called by the Mosaic.Leaflet.ReactMap to notify that the
     * map component was removed.
     */
    _onMapRemove : function(map) {
        this._removeHandlers(map);
        this._removeLayers(map);
        delete this._map;
        delete this._viewport;
    },

    // -------------------------------------------------------------------

    /**
     * Registers handlers (listeners) responsible for marker redrawing and
     * selected item highlighting.
     */
    _registerHandlers : function(map) {
        var app = this._getApp();
        app.map.addMapChangeListener(this._onMapModelChange, this);
        map.on('zoomend', this._onZoomEnd, this);
    },

    /**
     * Removes handlers (listeners) responsible for marker redrawing and
     * selected item highlighting.
     */
    _removeHandlers : function(map) {
        var app = this._getApp();
        map.off('zoomend', this._onZoomEnd, this);
        app.map.removeMapChangeListener(this._onMapModelChange, this);
    },

    // -------------------------------------------------------------------

    /** Adds new layers to the map */
    _registerLayers : function(map) {
        var that = this;
        var app = this._getApp();
        var options = {
            parent : this,
            app : app,
            viewport : this._viewport
        };
        that._layers = {};
        that._layers.debug = new MapDebugLayer(options)
        that._layers.tiles = new MapBackgroundLayer(options);

        that._layers.data = new MapDataLayer(options);
        that._layers.heatmap = new MapHeatmapLayer(options);

        this._updateLayersVisibility();
    },

    /** Removes all layers from the map */
    _removeLayers : function(map) {
        _.each(this._layers, function(layer) {
            map.removeLayer(layer);
        }, this);
        delete this._layers;
    },

    // -------------------------------------------------------------------

    /**
     * This method is called when the user changes the zoom level.
     */
    _onZoomEnd : function() {
        var app = this._getApp();
        app.map.changeMapZoom({
            zoom : this._map.getZoom()
        });
    },

    /**
     * Handles notifications about zoom changes requests and changes the zoom
     * level on the map.
     */
    _onMapModelChange : function() {
        var app = this._getApp();
        var zoom = app.map.getMapZoomLevel();
        var oldZoom = this._map.getZoom();
        if (zoom != oldZoom && this._viewport) {
            this._viewport.zoomTo(zoom);
        }
        this._updateLayersVisibility();
    },

    /**
     * Changes visibility of individual layers depending on the current zoom
     * level.
     */
    _updateLayersVisibility : function() {
        if (!this._map)
            return;
        var zoom = this._map.getZoom();
        var app = this._getApp();
        _.each(this._layers, function(layer, layerKey) {
            if (app.map.isLayerVisible(layerKey)) {
                this._map.addLayer(layer);
                if (layer.updateLayerVisibility) {
                    layer.updateLayerVisibility();
                }
            } else {
                this._map.removeLayer(layer);
            }
        }, this);
    },

});
