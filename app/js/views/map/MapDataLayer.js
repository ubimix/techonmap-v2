var _ = require('underscore');
var L = require('leaflet');
var AbstractMapLayer = require('./AbstractMapLayer');

/** */
module.exports = AbstractMapLayer.extend({

    _newInnerLayer : AbstractMapLayer.wrap(function() {
        var app = this.options.app;
        var data = this.
        var markers = [];
        for (var i = 0; i < DATA.features.length; i++) {
            var point = DATA.features[i];
            var latlng = L.latLng(point.geometry.coordinates[1],
                    point.geometry.coordinates[0]);
            var marker = new L.Marker(latlng);

            // Bind a marker popup
            var html = '<h3>' + point.properties.name + '</h3>' + '<p>'
                    + point.properties.description + '</p>';
            marker.bindPopup(html);

            // Add marker to the list
            markers.push(marker);
        }

        // Create a cluster layer and add all markers to it.
        var clusterLayer = new L.MarkerClusterGroup();
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            clusterLayer.addLayer(marker);
        }
        map.addLayer(clusterLayer);
        
        
        var app = this.options.app;
        var mapOptions = app.map.getMapOptions();
        var tilesUrl = mapOptions.tilesUrl;
        var attribution = mapOptions.attribution;
        return this._newTilesLayer(tilesUrl, attribution);
    }),

});
