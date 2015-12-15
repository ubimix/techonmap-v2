var _ = require('underscore');
var L = require('leaflet');

module.exports = function(options) {
    var app = options.app;
    var mapOptions = app.options.map;
    var resource = options.resource;
    
    var options = {
        color: 'gray',
        weight: 1,
        opacity : 1,
        fillColor : '#eee',
        fillOpacity: 0.6
            
    };
    var selectedOptions = _.extend({}, options, {
        fillColor : '#FF992F',
    });
    var layer = L.GeoJSON.geometryToLayer(resource, null, L.GeoJSON.coordsToLatLng, options);
    function updateStyle(){
        var maxWidth = 64;
        var maxZoom = 8;
        var maxOpacity = 0.7;
        var zoom = layer._zoom || 0;
        var k = Math.pow(2, zoom - maxZoom);
        var width = Math.min(maxWidth, Math.max(Math.round(maxWidth * k), 1));
        var opacity = maxOpacity * Math.min(1 / (+k ? k : 1) , 1);
        var style = _.extend({}, layer._selected ? selectedOptions : options, {
            weight : width,
            opacity : opacity
        });
        layer.setStyle(style);
    }
    layer.updateZoom = function(zoom) {
        layer._zoom = zoom;
        updateStyle();
    }
    layer.setSelection = function(selected) {
        layer._selected = selected;
        updateStyle();
    }
    return layer;
};
