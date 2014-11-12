var _ = require('underscore');
var L = require('leaflet');

var resourceIcon = L.icon({
    iconUrl : 'dist/images/marker-icon.png',
    iconRetinaUrl : 'dist/images/marker-icon-2x.png',
    iconSize : [ 24, 41 ],
    iconAnchor : [ 12, 41 ],
    popupAnchor : [ 0, -41 ],
    shadowUrl : 'dist/images/marker-shadow.png',
    shadowRetinaUrl : 'dist/images/marker-shadow.png',
    shadowSize : [ 41, 41 ],
    shadowAnchor : [ 14, 40 ]
});

module.exports = function(options) {
    var app = options.app;
    var mapOptions = app.options.map;
    return resourceIcon;
};
