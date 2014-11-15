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
        var that = this;
        that._fields = {
            fields : {}
        };
        that._resources = [];
        that._selectedResource = null;
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._loadAllInfo();
        });
    },

    stop : function() {
    },

    // ------------------------------------------------------------------
    // Actions

    /** Searches resources and updates the list of resources in the store. */
    searchResources : Api.intent(function(intent) {
        var that = this;
        intent.resolve(Mosaic.P.then(function() {
            return that._searchResources(intent.params);
        })).then(function() {
            var selectedResourceId = that.getSelectedResourceId();
            that.notify();
            if (selectedResourceId !== undefined) {
                return that.selectResource({
                    resourceId : selectedResourceId
                });
            }
        });
    }),

    /**
     * Selects a resource by an identifier and sets it in the store. Notifies
     * about the selected resource.
     */
    selectResource : Api.intent(function(intent) {
        var that = this;
        intent.resolve(that._findResourceById(intent.params.resourceId))//
        .then(function(resource) {
            that._selectedResource = resource;
            that.notifySelection();
        });
    }),

    // ------------------------------------------------------------------

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
            _.each(that._fields.fields, function(field, info) {
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
                index.add({
                    id : id,
                    name : props.name,
                    city : props.city,
                    address : props.address
                });
            });
        }, 10);
    },

    /** Returns a resource corresponding to the specified identifier. */
    _findResourceById : function(resourceId) {
        var that = this;
        return Mosaic.P.then(function() {
            if (!resourceId)
                throw new Error('Resource ID is not defined.');
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
    _searchResources : function(options) {
        var that = this;
        return Mosaic.P.then(function() {
            var q = options.q;
            if (!q || q == '') {
                that._resetResources();
                return;
            }
            var result = [];
            var list = that._index.search(q);
            _.each(list, function(r) {
                var id = r.ref;
                var resource = that._allResources[id]
                if (resource) {
                    result.push(resource);
                }
            });
            that._resources = result;
            return result;
        });
    },

});
