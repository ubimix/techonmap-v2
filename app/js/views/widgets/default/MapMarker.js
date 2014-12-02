var _ = require('underscore');
var L = require('leaflet');

var icons = {
    'entreprise' : 'company',
    'tiers-lieu' : 'coworking',
    'communauté' : 'community',
    'école' : 'education',
    'investisseur' : 'investor',
    'incubateur' : 'incubator',
    'acteur public': 'org'
};

function getIconType(type) {
    var icon = icons[type];
    return icon ? icon : 'company';
}

module.exports = function(options) {
    var app = options.app;
    var mapOptions = app.options.map;
    var resource = options.resource;
    var type = app.res.getResourceType(resource);
    var iconType = getIconType(type);
    var iconClass = 'icon-' + iconType + '-mono';

    var size = '30px';
    var iconSize = '24px';
    var style = _.map({
        'font-size' : iconSize,
        'line-height' : size,
        'width' : size,
        'height' : size,
        'border-radius' : size,
        'display' : 'inline-block',
        'vertical-align' : 'middle',
        'text-align' : 'center'
    }, function(value, key) {
        return key + ': ' + value + ';';
    }).join(' ');

//    var icon = L.divIcon({
//        className : '',
//        html : '<div class="icon-container ' + iconType + '">' + '<i class="icon ' + iconClass + '" style="'
//                + style + '"></i>' + '</div>',
//        iconSize : [ 28, 28 ],
//        iconAnchor : [ 14, 14 ],
//        popupAnchor : [ 0, -14 ]
//    });
    
    var icon = L.icon({
        iconUrl : './images/markers/'+iconType+'.png',
        iconSize : [ 33, 40 ],
        iconAnchor : [ 16, 20 ],
        popupAnchor : [ 0, -20 ]
    })
    var latlng = options.latlng;

    var marker = new L.Marker(latlng, {
        icon : icon
    });

    marker.updateZoom = function(zoom) {

    }

    return marker;
};
