var _ = require('underscore');

module.exports = function(options) {
    var app = options.app;
    return {
        fill : true,
        fillColor : 'white',
        fillOpacity : 0.8,
        dashArray : [ 2, 2 ],
        stroke : true,
        color : 'silver',
        weight : 1,
        opacity : 0.8
    };
};