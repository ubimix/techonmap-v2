var _ = require('underscore');
var L = require('leaflet');
var AbstractMapLayer = require('./AbstractMapLayer');
var ResourceUtilsMixin = require('../../tools/ResourceUtilsMixin');
var React = require('react');

/** */
module.exports = AbstractMapLayer.extend({

    initialize : function(options) {
        AbstractMapLayer.prototype.initialize.apply(this, arguments)
    },

    // -----------------------------------------------------------------------

    /** This method is called when this layer is added to the map. */
    onAdd : function(map) {
        this._map = map;
        this._registerHandlers();
        this._reloadData();
    },

    /**
     * Removes all registered layers from the map. Cleans up all map listeners.
     */
    onRemove : function(map) {
        this._removeLayers();
        this._removeHandlers();
        delete this._map;
    },

    // -----------------------------------------------------------------------

    _getApp : function() {
        return this.options.app;
    },

    /**
     * Returns map options from the global application options.
     */
    _getMapOptions : function() {
        var app = this._getApp();
        var mapOptions = app.options.map;
        return mapOptions;
    },

    // -----------------------------------------------------------------------

    /**
     * Registers handlers (listeners) responsible for layer redrawing and
     * selected item highlighting.
     */
    _registerHandlers : function() {
        var app = this._getApp();
        app.res.addChangeListener(this._reloadData, this);
        app.res.addSearchCriteriaChangeListener(this._onSelectCountry, this);
        this._map.on('zoomend', this._onZoomEnd, this);
        this._map.once('initialize', function(ev) {
            this._initialized = true;
            if (ev.reloadData) {
                this._reloadData();
            } else {
                this._onSelectCountry();
            }
        }, this);
    },

    /**
     * Removes handlers (listeners) responsible for layer redrawing and
     * selected item highlighting.
     */
    _removeHandlers : function(map) {
        var app = this._getApp();
        app.res.removeChangeListener(this._reloadData, this);
        app.res.removeSearchCriteriaChangeListener(this._onSelectCountry, this);
        this._map.off('zoomend', this._onZoomEnd, this);
    },

    // -----------------------------------------------------------------------

    /**
     * Initializes a group layer containing all layers. This method does not
     * attach the group layer to the map.
     */
    _initLayers : function() {
        var mapOptions = this._getMapOptions();
        this._index = {};
        var app = this._getApp();
        var type = 'default';
        this._groupLayer = new L.FeatureGroup();
        this._map.addLayer(this._groupLayer);
    },

    /**
     * Removes layers and the group layer from the map; cleans up the index of
     * individual layers.
     */
    _removeLayers : function() {
        this._clearSelectedLayer();
        if (this._groupLayer) {
            this._map.removeLayer(this._groupLayer);
            delete this._groupLayer;
        }
        delete this._index;
    },

    /**
     * This method is called when the data are updated
     */
    _redrawLayers : function() {
        this._removeLayers();
        this._initLayers();

        var app = this._getApp();
        var data = app.res.getZoneGeometries();
        var that = this;
        _.each(data, function(d) {
            var id = app.res.getZoneKey(d);
            if (!id)
                return;
            var layer = that._newLeafletLayer(d);
            if (layer) {
                that._index[id] = layer;
                that._groupLayer.addLayer(layer);
            }
        }, this);
        this._onSelectCountry();
    },

    /**
     * This method is called when search results are updated.
     */
    _reloadData : function() {
        var app = this._getApp();
        var data = app.res.getZoneGeometries();
        this._redrawLayers();
    },

    // -----------------------------------------------------------------------
    // Resource-specific views

    /** Creates and returns a new layer for the specified resource. */
    _newLeafletLayer : function(resource) {
        var app = this._getApp();
        var type = 'country';
        var layer = app.viewManager.newView('mapLayer', type, {
            app : app,
            resource : resource,
            type : type
        });
        if (!layer)
            return null;
        layer.on('click', function() {
            app.res.toggleZones([ resource ]);
        });
        return layer;
    },

    /** Creates and returns a new popup for the specified resource */
    _newPopup : function(latlng, resource, options) {
        var app = this._getApp();
        var type = app.res.getResourceType(resource);
        var id = app.res.getResourceId(resource);
        var selected = id === app.res.getSelectedResourceId();
        var view = app.viewManager.newView('mapPopup', type, _.extend({
            app : app,
            resource : resource,
            onClick : function() {
                var id = app.res.getResourceId(resource);
                app.res.selectResource({
                    resourceId : id
                });
            },
            selected : selected
        }, options));
        var popup;
        if (view) {
            var popupElement = L.DomUtil.create('div', 'popup-panel');
            React.render(view, popupElement);
            popup = L.popup();
            popup.setContent(popupElement);
            popup.on('close', function() {
                React.unmountComponentAtNode(popupElement);
            });
        }
        return popup;
    },

    // -----------------------------------------------------------------------

    /**
     * This method is called to highlight currently active layer
     */
    _onSelectCountry : function(ev) {
        if (!this._map)
            return;
        var that = this;
        var app = this._getApp();
        var selectedZoneKeys = app.res.getFilterZoneKeys();
        var selectedId = selectedZoneKeys.length ? selectedZoneKeys[0] : null;
        var layer = this._index[selectedId];
        if (this._selectedLayer === layer)
            layer = null;
        this._clearSelectedLayer();
        if (!layer)
            return;
        this._setSelectedLayer(layer);
    },

    _onZoomEnd : function() {
        var zoom = this._map.getZoom();
        _.each(this._index, function(layer) {
            if (layer && layer.updateZoom)
                layer.updateZoom(zoom);
        });
    },

    /** Change styles for the selected layer and save it. */
    _setSelectedLayer : function(layer) {
        this._selectedLayer = layer;
        if (this._selectedLayer && this._selectedLayer.setSelection) {
            this._selectedLayer.setSelection(true);
        }
    },

    /** Removes specific styles for the selected layer. */
    _clearSelectedLayer : function() {
        var that = this;
        if (that._selectedLayer) {
            if (that._selectedLayer.setSelection) {
                that._selectedLayer.setSelection(false);
            }
            if (that._selectedLayer.closePopup){
                that._selectedLayer.closePopup();
            }
            delete that._selectedLayer;

        }
    },

    /**
     * This method is called when user clicks on individual layer on the map.
     * This method launches a select resource intent.
     */
    _selectResource : function(resourceId) {
        var app = this._getApp();
        app.res.toggleZones([resourceId]);
    },
    _getCenter : function(layer, resource) {
        var result;
        if (_.isFunction(layer.getLatLng)) {
            result = layer.getLatLng(); 
        } else {
            var bbox = ResourceUtilsMixin.getBoundingBox(resource);
            var latlng = ResourceUtilsMixin.getBoundingBoxCenter(bbox); 
            result = L.latLng(latlng[1], latlng[0]);
        }
        return result;
    } ,

    /** Shows a popup on top of the specified layer */
    _showLayerPopup : function(layer, resource, options) {
        var that = this;
        options = options || {};
        var latLng = options.latLng || this._getCenter(layer, resource);
        var app = that._getApp();
        var popup = that._newPopup(latLng, resource, options);
        if (popup) {
            layer.bindPopup(popup);
            layer.openPopup();
        }

    }
});
