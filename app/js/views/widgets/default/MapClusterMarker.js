var _ = require('underscore');
var L = require('leaflet');

module.exports = function(options) {
    var app = options.app;
    var cluster = options.cluster;
    var markers = cluster.getAllChildMarkers();
    var number = markers.length;
    var fullNumber = app.res.getResourceNumber();
    var maxSize = 80;
    var minSize = 40;
    var size = minSize +
            Math.round((maxSize - minSize) * (number / fullNumber));

    var imageUrl = 'images/cluster.svg';
    var width = size;
    var height = size;

    var style = {
        'line-height' : width + 'px',
        'text-align' : 'center',
        'width' : width + 'px',
        'height' : height + 'px',
        'display' : 'inline-block',
        'background-size' : width + 'px ' + height + 'px',
        'background-repeat' : 'no-repeat',
        'background-position' : '50% 50%',
        'background-color' : 'transparent',
        'background-image' : 'url(' + imageUrl + ')'
    };
    var styleStr = '';
    _.each(style, function(value, key) {
        styleStr += key + ': ' + value + '; ';
    })
    var html = '<div style="' + styleStr + '">' + number + '</div>';
    var icon = L.divIcon({
        className : 'cluster-icon',
        html : html,
        iconSize : [ width, height ],
        iconAnchor : [ width / 2, height / 2 ],
        popupAnchor : [ width / 2, -height ],
    });
    return icon;
};
