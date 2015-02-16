var _ = require('underscore');
var L = require('leaflet');

var icons = require('./Categories');

function getIconType(type, selected) {
    var icon = icons[type] || 'company';
    if (selected) {
        icon += '-on';
    }
    return icon;
}

module.exports = function(options) {
    var app = options.app;
    var mapOptions = app.options.map;
    var resource = options.resource;
    var type = app.res.getResourceType(resource);
    
    var resourceId = app.res.getResourceId(resource);
    function getIcon(selected){
        var iconType = getIconType(type, selected);
        var icon = L.icon({
            iconUrl : './images/markers/' + iconType + '.svg',
            iconSize : [ 33, 40 ],
            iconAnchor : [ 16, 20 ],
            popupAnchor : [ 0, -30 ]
        });
        return icon;
    }

    var latlng = options.latlng;
    var marker = new L.Marker(latlng, {
        icon : getIcon(false)
    });
    marker.updateZoom = function(zoom) {
    }
    marker.setSelection = function(selected){
        var icon = getIcon(selected);
        marker.setIcon(icon);
    }
    return marker;
};
