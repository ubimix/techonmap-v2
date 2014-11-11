var _ = require('underscore');
var L = require('leaflet');
var AbstractMapLayer = require('./AbstractMapLayer');

/** */
module.exports = AbstractMapLayer.extend({

    _newInnerLayer : AbstractMapLayer.wrap(function() {
        var app = this.options.app;
        var mapOptions = app.map.getMapOptions();
        var tilesUrl = mapOptions.tilesUrl;
        var attribution = mapOptions.attribution;
        return this._newTilesLayer(tilesUrl, attribution);
    }),

});
