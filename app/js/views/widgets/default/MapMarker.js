var _ = require('underscore');
var L = require('leaflet');

var icons = {
    'entreprise' : 'icon-company',
    'incubateur' : 'icon-incubator',
    'default' : 'icon-company'
};

module.exports = function(options) {
    var app = options.app;
    var mapOptions = app.options.map;
    var resource = options.resource;
    var type = app.res.getResourceType(resource);
    var typeIcon = icons[type] || icons['default'];
    var size = '30px';
    var style = _.map({
        'font-size' : size,
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

    var icon = L.divIcon({
        className : '',
        html : '<div class="icon-container ' + type + '">' + '<i class="icon ' +
                typeIcon + '" style="' + style + '"></i>' + '</div>',
        iconSize : [ 28, 28 ],
        iconAnchor : [ 14, 14 ],
        popupAnchor : [ 0, -14 ]
    });
    var latlng = options.latlng;

    var marker = new L.Marker(latlng, {
        icon : icon
    });

    marker.updateZoom = function(zoom) {

    }

    return marker;
};
