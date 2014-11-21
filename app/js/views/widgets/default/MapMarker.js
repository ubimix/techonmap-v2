var _ = require('underscore');
var L = require('leaflet');

var icons = {'entreprise':'icon-company', 'incubateur':'icon-incubator', 'default' : 'icon-company'};

module.exports = function(options) {
    var app = options.app;
    var mapOptions = app.options.map;
    var resource = options.resource;
    var type = app.res.getResourceType(resource);
    var typeIcon = icons[type] || icons['default'];
    var icon = L.divIcon({
        className : '',
        html : '<div class="icon-container '+type+'" style="border-radius: 28px"><i class="'+typeIcon+'" style="font-size: 28px; line-height: 28px;"></i></div>',
        iconSize: [28, 28],
        iconAnchor : [14, 14],
        popupAnchor : [0, -14]});
    var latlng = options.latlng;
    
    var marker = new L.Marker(latlng, {
        icon : icon
    });
    
    marker.updateZoom = function(zoom) {
        
    }
    
    return marker;
};
