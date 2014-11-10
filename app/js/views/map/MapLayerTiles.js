define(
// Dependencies
[ 'require', 'underscore', 'leaflet', 'mosaic-styles', './AbstractMapLayer' ],
// Module
function(require) {
    'use strict';
    var _ = require('underscore');
    var L = require('leaflet');
    var StylesGenerator = require('mosaic-styles').StylesGenerator;
    var AbstractMapLayer = require('./AbstractMapLayer');

    /** */
    return AbstractMapLayer.extend({

        _getLayerKey : function() {
            return 'tiles';
        },

        _newInnerLayer : AbstractMapLayer.wrap(function() {
            var app = this.options.app;
            var mapOptions = app.map.getMapOptions();
            var tilesUrl = mapOptions.tilesUrl;
            var attribution = mapOptions.attribution;
            return this._newTilesLayer(tilesUrl, attribution);
        }),

    });

});
