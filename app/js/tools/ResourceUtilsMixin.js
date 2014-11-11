var _ = require('underscore');
var Mosaic = require('mosaic-commons');

module.exports = {


    /** Returns type for the specified resource. */
    getResourceType : function(resource) {
        if (!resource)
            return null;
        var props = this._getFirstProperty(resource, 'type');
        return type;
    },

    /** Returns first value of a property with the specified key. */
    _getFirstProperty : function(resource, key, defaultValue) {
        var props = (resource ? resource.properties : null) || {};
        var array = props[key] || [];
        if (array && array.length) {
            return array[0];
        }
        return defaultValue !== undefined ? defaultValue : 'default';
    },

    /** Returns a unique identifier of this resource. */
    getResourceId : function(resource) {
        if (!resource)
            return null;
        var props = resource.properties || {};
        var id = props.id;
        if (!id) {
            id = resource.id;
            if (!id) {
                id = props.id = _.uniqueId('id-');
            }
        }
        return id;
    },

    /**
     * Returns a bounding box for a CCI corresponding to the specified alias.
     */
    getBoundingBox : function(resources) {
        var bounds = [];
        var initialized = false;
        resources = _.isArray(resources) ? resources : [ resources ];
        _.each(resources, function(resource) {
            if (!resource || !resource.geometry ||
                    !resource.geometry.coordinates)
                return;
            this._visitGeometry(resource.geometry, function(point) {
                if (!initialized) {
                    bounds[0] = [ point[0], point[1] ];
                    bounds[1] = [ point[0], point[1] ];
                    initialized = true;
                } else {
                    bounds[0][0] = Math.min(point[0], bounds[0][0]);
                    bounds[0][1] = Math.min(point[1], bounds[0][1]);
                    bounds[1][0] = Math.max(point[0], bounds[1][0]);
                    bounds[1][1] = Math.max(point[1], bounds[1][1]);
                }
            });
        }, this);
        if (!initialized) {
            bounds = [ [ -90, -180 ], [ 90, 180 ] ];
        }
        return bounds;
    },

    /** Returns center of the specified bounding box */
    getBoundingBoxCenter : function(bbox) {
        return [ (bbox[0][0] + bbox[1][0]) / 2, (bbox[0][1] + bbox[1][1]) / 2 ];
    },
    /** Returns center of the specified bounding box */
    isBoundingBoxEmpty : function(bbox) {
        return (bbox[0][0] == bbox[1][0]) && (bbox[0][1] == bbox[1][1]);
    },

    /**
     * An internal method visiting all coordinates of GeoJSON geometry objects.
     */
    _visitGeometry : (function() {
        function visitSequence(coords, listener) {
            for (var i = 0; i < coords.length; i++) {
                listener(coords[i]);
            }
        }
        function visitSequences(coords, listener) {
            for (var i = 0; i < coords.length; i++) {
                visitSequence(coords[i], listener);
            }
        }
        return function visit(geometry, listener) {
            var result;
            var coords = geometry.coordinates;
            switch (geometry.type) {
                case 'Point' :
                    listener(coords);
                break;
                case 'MultiPoint' :
                case 'LineString' :
                    visitSequence(coords, listener);
                break;
                case 'MultiLineString' :
                case 'Polygon' :
                    visitSequences(coords, listener);
                break;
                case 'MultiPolygon' :
                    for (var i = 0; i < coords.length; i++) {
                        visitSequences(coords[i], listener);
                    }
                break;
                case 'GeometryCollection' :
                    (function() {
                        var geoms = geometry.geometries;
                        for (var i = 0, len = geoms.length; i < len; i++) {
                            visit(geoms[i], listener);
                        }
                    })();
                break;
            }
            return result;
        }
    })(),
};
