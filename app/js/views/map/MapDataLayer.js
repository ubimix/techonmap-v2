var _ = require('underscore');
var L = require('leaflet');
require('leaflet.markercluster');
var AbstractMapLayer = require('./AbstractMapLayer');

/** */
module.exports = AbstractMapLayer.extend({

    // -----------------------------------------------------------------------

    /** This method is called when this layer is added to the map. */
    onAdd : function(map) {
        this._map = map;
        this._registerHandlers();
        this._redrawMarkers();
    },

    /**
     * Removes all registered layers from the map. Cleans up all map listeners.
     */
    onRemove : function(map) {
        this._removeMarkers();
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
     * Registers handlers (listeners) responsible for marker redrawing and
     * selected item highlighting.
     */
    _registerHandlers : function() {
        var app = this._getApp();
        app.sites.addChangeListener(this._redrawMarkers);
        app.sites.addSelectListener(this._onSelectResource);
    },

    /**
     * Removes handlers (listeners) responsible for marker redrawing and
     * selected item highlighting.
     */
    _removeHandlers : function(map) {
        var app = this._getApp();
        app.sites.removeChangeListener(this._redrawMarkers);
        app.sites.removeSelectListener(this._onSelectResource);
    },

    // -----------------------------------------------------------------------

    /**
     * Initializes a cluster layer and an internal index of markers. This method
     * does not attache the cluster layer to the map.
     */
    _initMarkers : function() {
        var mapOptions = this._getMapOptions();
        this._index = {};
        var clusterOptions = _.extend({
            spiderfyOnMaxZoom : true,
            showCoverageOnHover : false,
            zoomToBoundsOnClick : true
        }, mapOptions.cluster, {});
        this._clusterLayer = new L.MarkerClusterGroup(clusterOptions);
        this._map.addLayer(this._clusterLayer);
    },

    /**
     * Removes markers and cluster layer from the map; cleans up the index of
     * individual markers.
     */
    _removeMarkers : function() {
        this._clearSelectedMarker();
        if (this._clusterLayer) {
            this._map.removeLayer(this._clusterLayer);
            delete this._clusterLayer;
        }
        delete this._index;
    },

    /**
     * This method is called when the data in the store is updated
     */
    _redrawMarkers : function() {
        this._removeMarkers();
        this._initMarkers();

        var app = this._getApp();
        var data = app.sites.getSites();
        var that = this;
        _.each(data, function(d) {
            var id = app.sites.getResourceId(d);
            if (!id)
                return;

            var marker;
            L.GeoJSON.geometryToLayer(d, function(resource, latlng) {
                marker = that._newMarker(latlng, resource);
                return marker;
            }, L.GeoJSON.coordsToLatLng, options);
            if (marker) {
                this._index[id] = marker;
            }
        }, this);

        var markers = _.values(this._index);
        this._clusterLayer.addLayers(markers);
    },

    // -----------------------------------------------------------------------
    // Resource-specific views

    /** Creates and returns a new marker for the specified resource. */
    _newMarker : function(latlng, resource) {
        // FIXME: use app.viewManager to get the marker
        var options = {};
        return new L.Marker(latlng, options)
    },

    /** Creates and returns a new popup for the specified resource */
    _newPopup : function(latlng, resource) {
        var app = this._getApp();
        var type = app.sites.getType(resource);
        var view = app.viewManager.newView('popup', type, {
            app : app,
            data : resource,
            onClick : function() {
                // FIXME: add a real focus action
                console.log('Clicked in popup!');
            },
            selected : true
        });
        var popup;
        if (view) {
            var popupElement = L.DomUtil.create('div');
            React.renderComponent(view, popupElement);
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
     * This method is called to highlight currently active marker
     */
    _onSelectResource : function() {
        var that = this;
        that._clearSelectedMarker();

        var app = this._getApp();
        var selectedId = app.sites.getSelectedSiteId();
        var marker = that._index[selectedId];
        if (!marker)
            return;
        var latlng = marker.getLatLng();
        if (latlng) {
            // FIXME: use the map viewport of the parent
            // FIXME: use promises to get predictable operations
            // ex: viewport.panTo(latlng).then(function(){ return
            // viewport.zoom(level) }).then(function(){ return
            // viewport.openPopup(); });
            that._map.panTo(latlng);
        }
        that._clusterLayer.zoomToShowLayer(marker, function() {
            that._setSelectedMarker(marker);
        });
    },

    /** Change styles for the selected marker and save it. */
    _setSelectedMarker : function(marker) {
        var that = this;
        that._clearSelectedMarker();
        that._selectedMarker = marker;
        // TODO: add specific styles
        var latlng = marker.getLatLng();
        var resource = app.sites.getSelectedSite();
        var popup = that._newPopup(latlng, resource);
        if (popup) {
            marker.bindPopup(popup);
            marker.openPopup();
        }
    },

    /** Removes specific styles for the selected marker. */
    _clearSelectedMarker : function() {
        var that = this;
        if (that._selectedMarker) {
            // TODO: remove selection from the marker
            delete that._selectedMarker;
        }
    },

    /**
     * This method is called when user clicks on individual markers. This method
     * to launches a select resource intent.
     */
    _selectResource : function(siteId) {
        var app = this._getApp();
        app.sites.selectSite({
            siteId : siteId
        });
    }
});
