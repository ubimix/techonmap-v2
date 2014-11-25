var _ = require('underscore');
var Lunr = require('lunr');
var Mosaic = require('mosaic-commons');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');
var App = require('mosaic-core').App;
var Api = App.Api;

/** This module is responsible for management of resources. */
module.exports = Api.extend({}, ResourceUtils, {

    /** Initializes fields */
    _initFields : function() {
        this._fields = {
            fields : {}
        };
        this._resources = [];
        this._allResources = [];
        this._selectedResource = null;
        this._sortByName = 1;
        this._sortByDate = 0;
    },

    /**
     * Returns the parent application.
     */
    getApp : function() {
        return this.options.app;
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        var that = this;
        var app = that.getApp();
        app.nav.addChangeListener(that._searchResources, that);
        return Mosaic.P.then(function() {
            return that._loadAllInfo().then(function() {
                return that._searchResources();
            });
        });
    },

    stop : function() {
        var app = this.getApp();
        app.nav.removeChangeListener(this._searchResources, this);
    },

    // ------------------------------------------------------------------
    // Actions

    /**
     * Selects a resource by an identifier and sets it in the store. Notifies
     * about the selected resource.
     */
    selectResource : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(that._findResourceById(intent.params.resourceId))//
        .then(function(resource) {
            that._selectedResource = resource;
            that.notifySelection();
        });
    }),

    /** Sort resources by name or by modification date. */
    sortResources : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            var params = intent.params;
            var direct = params.direct;
            that._sortByName = 0;
            that._sortByDate = 0;
            if (params.sortBy === 'name') {
                that._sortByName = direct ? 1 : -1;
            } else if (params.sortBy === 'date') {
                that._sortByDate = direct ? 1 : -1;
            }
            that._sortResults();
        })).then(function() {
            that.notify();
        });
    }),

    sortResourcesByName : function(direct) {
        return this.sortResources({
            sortBy : 'name',
            direct : direct
        });
    },

    sortResourcesByDate : function(direct) {
        return this.sortResources({
            sortBy : 'date',
            direct : direct
        });
    },

    getSortByName : function() {
        return this._sortByName;
    },

    getSortByDate : function() {
        return this._sortByDate;
    },
    // ------------------------------------------------------------------

    /** Returns the number of currently found results. */
    getResourceNumber : function() {
        return this._resources.length;
    },

    getResourceType : function(resource) {
        var props = resource.properties || {};
        var category = props.category || 'default';
        return category.toLowerCase();
    },

    /** Returns the total resource number. */
    getTotalResourceNumber : function() {
        var keys = _.keys(this._allResources);
        return keys.length;
    },

    /** Returns a list of all resources. */
    getResources : function() {
        return this._resources;
    },

    /** Returns the currently selected resource */
    getSelectedResource : function() {
        return this._selectedResource;
    },

    /**
     * Returns <code>true</code> if a resource with the specified identifier
     * is selected.
     */
    isSelectedResource : function(id) {
        return id == this.getSelectedResourceId();
    },

    /**
     * Returns the identifier of the selected resource or <code>null</code> if
     * not resources were selected.
     */
    getSelectedResourceId : function() {
        return this.getResourceId(this._selectedResource);
    },

    /**
     * Returns position of the selected resource in the list.
     */
    getSelectedResourcePos : function() {
        var result = -1;
        var selectedId = this.getSelectedResourceId();
        if (selectedId !== null) {
            _.find(this._resources, function(resource, i) {
                if (this.getResourceId(resource) === selectedId) {
                    result = i;
                    return true;
                }
                return false;
            }, this);
        }
        return result;
    },

    // ------------------------------------------------------------------

    /** Adds selection change listener */
    addSelectListener : function(listener, context) {
        this.on('select', listener, context);
    },

    /** Removes selection change listener */
    removeSelectListener : function(listener, context) {
        this.off('select', listener, context);
    },

    /** Notifies about selection changes. */
    notifySelection : function() {
        this.emit('select');
    },

    // ------------------------------------------------------------------

    /**
     * Loads all required data files from the server and initializes this store.
     */
    _loadAllInfo : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._loadDataMapping();
        }).then(function() {
            return that._loadResources();
        }).then(function() {
            return that._buildIndex();
        });
    },

    /**
     * Loads datamapping used to initialize field weights used to index data in
     * Lunr index
     */
    _loadDataMapping : function() {
        var that = this;
        return that._getJson(_.extend({}, {
            path : that.app.options.dataFieldsUrl
        })).then(function(fields) {
            that._fields = fields;
        });
    },

    /** Loads all resources and returns a promise for results */
    _loadResources : function(options) {
        var that = this;
        return that._getGeoJsonArray(_.extend({}, options, {
            path : that.app.options.dataUrl
        })).then(function(resources) {
            that._allResources = {};
            _.map(resources, function(d) {
                var id = that.getResourceId(d);
                that._allResources[id] = d;
            });
            that._selectedResource = null;
            that._resetResources();
        });
    },

    /** Builds and returns a full-text search index. */
    _buildIndex : function() {
        var that = this;
        var index = that._index = Lunr(function() {
            _.each(that._fields.fields, function(info, field) {
                info = info || {};
                var boost = info.boost || 1;
                var type = info.type || 'field';
                this[type](field, {
                    boost : boost
                });
            }, this);
        });
        setTimeout(function() {
            _.each(that._allResources, function(d, id) {
                var props = d.properties;
                var entry = {
                    id : id
                };
                _.each(that._fields.fields, function(info, field) {
                    var value = props[field];
                    if (_.isArray(value)) {
                        value = value.join(' ');
                    }
                    entry[field] = value;
                });
                index.add(entry);
            });
        }, 10);
    },

    /** Returns a resource corresponding to the specified identifier. */
    _findResourceById : function(resourceId) {
        var that = this;
        return Mosaic.P.then(function() {
            if (!resourceId)
                return null;
            var resources = that.getResources();
            return _.find(resources, function(resource) {
                return resource.properties.id === resourceId;
            });
        });
    },

    /** Resets search results and sets all existing resources in this store. */
    _resetResources : function() {
        var that = this;
        that._resources = _.values(that._allResources);
    },

    /**
     * Searches resources corresponding to the specified search criteria and
     * returns a promise with search results.
     */
    _searchResources : function() {
        var that = this;
        return Mosaic.P.then(function() {
            var app = that.getApp();
            var criteria = app.nav.getSearchCriteria();
            var q = criteria.q || '';
            var result;
            if (!q || q == '') {
                result = _.values(that._allResources);
            } else {
                result = [];
                var list = that._index.search(q);
                _.each(list, function(r) {
                    var id = r.ref;
                    var resource = that._allResources[id]
                    if (resource) {
                        result.push(resource);
                    }
                });
            }
            that._resources = that._filterResources(result, criteria);
            that._sortResults();
            return that._resources;
        }).then(function() {
            var selectedResourceId = that.getSelectedResourceId();
            that.notify();
            if (selectedResourceId !== undefined) {
                // return that.selectResource({
                // resourceId : selectedResourceId
                // });
            }
        });
    },

    /** Sorts search results by the currently defined fields. */
    _sortResults : function() {
        var inverted = false;
        var getField;
        if (this._sortByName !== 0) {
            getField = function(r) {
                return (r.properties.name + '').toLowerCase();
            }
            inverted = this._sortByName < 0;
        } else if (this._sortByDate !== 0) {
            getField = function(r) {
                var sys = r.sys;
                var changes = sys.updated || sys.created || {
                    timestamp : new Date().getTime()
                };
                return changes.timestamp;
            }
            inverted = this._sortByDate < 0;
        }
        if (getField) {
            this._resources = _.sortBy(this._resources, getField, this);
            if (inverted) {
                this._resources.reverse();
            }
        }
    },

    /** Removes all resources not matching to the specified search criteria. */
    _filterResources : function(resources, criteria) {
        var filter = this._getFilterFunction(criteria);
        if (!filter)
            return resources;
        return _.filter(resources, function(resource) {
            return filter(resource);
        });
    },

    /**
     * Transforms the specified search criteria into a filtering function
     * accepting or not a given resource.
     */
    _getFilterFunction : function(criteria) {
        var that = this;
        var filters = [];
        var app = that.getApp();
        _.each(that._fields.fields, function(info, field) {
            info = info || {};
            if (!info.filter)
                return;
            var filter = criteria[field];
            if (!filter)
                return;
            filter = app.nav.prepareFilterValues(filter);
            filters.push(function(resource) {
                var properties = resource.properties;
                var value = properties[field];
                var result = app.nav.filterValues(value, filter);
                return result;
            });
        });
        if (!filters.length) {
            return null;
        }
        return filters.length == 1 ? filters[0] : function(resource) {
            var result = true;
            for (var i = 0; result && i < filters.length; i++) {
                result &= filters[i](resource);
            }
            return result;
        };
    },

});
