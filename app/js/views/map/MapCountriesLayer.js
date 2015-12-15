var _ = require('underscore');
var L = require('leaflet');
var MapResourceLayer = require('./MapResourceLayer');
var React = require('react');

/** */
module.exports = MapResourceLayer.extend({

    initialize : function(options) {
        MapResourceLayer.prototype.initialize.apply(this, arguments)
    },

    // -----------------------------------------------------------------------
    _getResources : function(){
        var app = this._getApp();
        var data = app.res.getZoneGeometries();
        return data;
    },

    _getSelectedResourceId : function() {
        var app = this._getApp();
        var selectedZoneKeys = app.res.getFilterZoneKeys();
        return selectedZoneKeys.length ? selectedZoneKeys[0] : undefined;
    },

    _getResourceId : function(resource) {
        var app = this._getApp();
        var zoneKey = app.res.getZoneKey(resource);
        return zoneKey;
    },    
    
    /** Returns a type of the specified resource */ 
    _getResourceType : function(resource){
        return 'country';
    }, 
    
    _registerSelectionListener : function(listener){
        var app = this._getApp();
        app.res.addSearchCriteriaChangeListener(listener, this);
    },

    _removeSelectionListener : function(listener) {
        var app = this._getApp();
        app.res.removeSearchCriteriaChangeListener(listener, this);
    },
    
    /**
     * This method is called when user clicks on individual layer on the map.
     * This method launches a select resource intent.
     */
    _selectResource : function(resourceId) {
        var app = this._getApp();
        var zone = app.res.getZoneByKey(resourceId);
        if (zone) {
            app.res.toggleZones([zone]);
        }
    },
    
});
