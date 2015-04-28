var _ = require('underscore');
var Mosaic = require('mosaic-commons');

module.exports = {

    /** Returns a list of normalized tags for the specified resource. */
    getResourceTags : function(resource) {
        var values = this._getPropertyArray(resource, 'tags');
        return this._filterToLowerCase(values);
    },

    /** Returns a list of normalized categories for the specified resource. */
    getResourceCategories : function(resource) {
        var values = this._getPropertyArray(resource, 'category');
        return this._filterToLowerCase(values);
    },

    /** Returns a geographic zone for this resource. */
    getResourceZone : function(resource) {
        var code = this._getFirstProperty(resource, 'postcode');
        if (code && code.length > 2) {
            code = code.substring(0, 2);
        }
        return code;
    },

    /** Returns the name of this resource. */
    getResourceName : function(resource) {
        if (!resource)
            return null;
        var type = this._getFirstProperty(resource, 'name');
        return type;
    },

    getResourceCreationYear : function(resource) {
        if (!resource)
            return null;
        var creationYear = this._getFirstProperty(resource, 'creationyear');
        return creationYear;
    },

    /** Returns type for the specified resource. */
    getResourceType : function(resource) {
        if (!resource)
            return null;
        var categories = this.getResourceCategories(resource);
        return categories.length ? categories[0] : 'default';
        // var type = this._getFirstProperty(resource, 'type');
        // return type;
    },

    getResourceTypeLabel : function(type) {
        if (!type || type.length == 0)
            return 'default';
        var label = type.substring(0, 1).toUpperCase() + type.substring(1);
        return label;
    },

    /** Returns first value of a property with the specified key. */
    _getFirstProperty : function(resource, key, defaultValue) {
        var values = this._getPropertyArray(resource, key);
        var value = defaultValue;
        if (values.length) {
            value = values[0];
        }
        return value;
    },

    /**
     * Returns a resource property with the specified key as an array. The
     * returned values is always an array (which can be empty).
     */
    _getPropertyArray : function(resource, key) {
        var props = (resource ? resource.properties : null) || {};
        var array = props[key] || [];
        return _.isArray(array) ? _.toArray(array) : [ array ];
    },

    /**
     * This utility method transforms all values of the specified array to lower
     * case.
     */
    _filterToLowerCase : function(array) {
        if (!array)
            return [];
        return _.map(array, function(value) {
            return (value + '').toLowerCase();
        });
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
            if (!resource || !resource.geometry
                    || !resource.geometry.coordinates)
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

    /** Normalizes names - remove all accented characters */
    normalizeName : function normalizeName(str) {
        if (!str || str == '')
            return '';
        if (!normalizeName._replacements) {
            var repl = normalizeName._replacements = [];
            function addRegexp(key, val) {
                repl[key] = val;
            }
            addRegexp(/[\s.|!?,;<>&\'"()\\\/%]+/gim, '-');
            addRegexp(/-+/gim, '-');
            // addRegexp([/^-+|-+$/gim, '');
            addRegexp(/^-+/gim, '');
            addRegexp(/[ùûü]/gim, 'u');
            addRegexp(/[ÿ]/gim, 'y');
            addRegexp(/[àâ]/gim, 'a');
            addRegexp(/[æ]/gim, 'ae');
            addRegexp(/[ç]/gim, 'c');
            addRegexp(/[éèêë]/gim, 'e');
            addRegexp(/[ïî]/gim, 'i');
            addRegexp(/[ô]/gim, 'o');
            addRegexp(/[œ]/gim, 'oe');
        }
        str = str + '';
        str = str.toLowerCase();
        var replacements = normalizeName._replacements;
        for ( var regexp in replacements) {
            if (replacements.hasOwnProperty(regexp)) {
                var val = replacements[regexp];
                str = str.replace(regexp, val);
            }
        }
        // _.each(normalizeName._replacements, function(val, regexp) {
        // str = str.replace(regexp, val);
        // });
        return str;
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
            case 'Point':
                listener(coords);
                break;
            case 'MultiPoint':
            case 'LineString':
                visitSequence(coords, listener);
                break;
            case 'MultiLineString':
            case 'Polygon':
                visitSequences(coords, listener);
                break;
            case 'MultiPolygon':
                for (var i = 0; i < coords.length; i++) {
                    visitSequences(coords[i], listener);
                }
                break;
            case 'GeometryCollection':
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
