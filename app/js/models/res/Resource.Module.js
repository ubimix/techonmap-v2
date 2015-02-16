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
        // Search criteria
        this._criteria = {};
        this._categories = [];
        this._zones = [];

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
        this.addSearchCriteriaChangeListener(this._searchResources, this);
        this._allResourcesPromise = this._loadAllInfo();
        return this._searchResources();
    },

    stop : function() {
        this.removeSearchCriteriaChangeListener(this._searchResources, this);
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

    /** Updates an internal search criteria */
    updateSearchCriteria : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            _.extend(that._criteria, intent.params);
        })).then(function() {
            that.notifySearchCriteria();
        });
    }),

    // ------------------------------------------------------------------

    /** Returns the number of currently found results. */
    getResourceNumber : function() {
        return this._resources.length;
    },

    getResourceType : function(resource) {
        return ResourceUtils.getResourceType(resource);
    },

    /** Returns the total resource number. */
    getTotalResourceNumber : function() {
        var keys = _.keys(this._allResources);
        return keys.length;
    },

    /** Returns a list of all loaded resources. */
    getAllResources : function() {
        return _.values(this._allResources);
    },

    /** Returns a list of all resources. */
    getResources : function() {
        return this._resources;
    },

    /** Returns a list of all resources. */
    getResourcePosition : function(id) {
        var result = -1;
        _.find(this._resources, function(r, idx) {
            var resourceId = this.getResourceId(r);
            if (id == resourceId) {
                result = idx;
                return true;
            }
            return false;
        }, this);
        return result;
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

    /** Adds a new path change listener. */
    addSearchCriteriaChangeListener : function(listener, context) {
        this.on('search', listener, context);
    },

    /** Removes search criteria change listener. */
    removeSearchCriteriaChangeListener : function(listener, context) {
        this.off('search', listener, context);
    },

    /** Notifies about search criteria changes. */
    notifySearchCriteria : function() {
        this.emit('search');
    },

    // ------------------------------------------------------------------

    /** Returns all categories for this application. */
    getCategories : function() {
        return this._categories;
    },

    /**
     * Toggle tags in the search criteria. This methods sets all new tags and
     * removes already existing tags from the specified tag array.
     */
    toggleCategories : function(categories) {
        categories = _.map(categories, this.getCategoryKey, this);
        var options = this._toggleSearchCriteriaObject(this._criteria,
                'category', categories);
        options.tags = [];
        return this.updateSearchCriteria(options);
    },

    /** Returns an array of categories used as a search criteria. */
    getFilterCategories : function() {
        var keys = this.getFilterCategoryKeys();
        return _.map(keys, function(key) {
            return this.getCategoryByKey(key);
        }, this);
    },

    /** Returns a category used to filter object. */
    getFilterCategory : function() {
        var categories = this.getFilterCategories();
        return categories.length ? categories[0] : null;
    },

    /**
     * Returns <code>true</code> if there are filtering criteria.
     */
    hasFilterCategories : function() {
        var categories = this.getFilterCategories();
        return !!categories.length;
    },

    /** Returns a list of category keys used to filter objects. */
    getFilterCategoryKeys : function() {
        return this._criteria.category;
    },

    /** Returns a category object corresponding to the specified key. */
    getCategoryByKey : function(key) {
        if (!key)
            return null;
        var criteria = this.prepareFilterValues(key);
        var result = _.find(this._categories, function(category) {
            var key = this.getCategoryKey(category);
            var keys = this.prepareFilterValues(key);
            return this.filterValues(criteria, keys);
        }, this);
        return result;
    },

    /**
     * Returns <code>true</code> if the specified category is selected (it is
     * present in the search criteria).
     */
    isFilteredByCategory : function(category) {
        var criteria = this.prepareFilterValues(this.getFilterCategoryKeys());
        var key = this.getCategoryKey(category);
        var categories = this.prepareFilterValues(key);
        return this.filterValues(criteria, categories);
    },

    /**
     * Returns <code>true</code> if the current search criteria applies a
     * category filter.
     */
    hasCategoryFilteredApplied : function() {
        var keys = this.getFilterCategoryKeys();
        return keys && keys.length > 0;
    },

    /** Returns the key of the specified category. */
    getCategoryKey : function(category) {
        var key = _.isObject(category) ? category.key : category;
        return key;
    },

    /** Returns tags associated with the specified category. */
    getCategoryTags : function(category) {
        var key = this.getCategoryKey(category);
        var category = this.getCategoryByKey(key);
        var tags = (category && category.tags) || [];
        return this.prepareFilterValues(tags);
    },

    _toggleSearchCriteriaObject : function(criteria, key, values) {
        var existing = criteria[key];
        existing = this.prepareFilterValues(existing);
        values = this.prepareFilterValues(values);
        if (existing[0] === values[0]) {
            values = [];
        }
        var options = {};
        options[key] = values;
        options = _.extend({}, existing, options);
        return options;
    },

    _toggleSearchCriteria : function(key, values) {
        var options = this._toggleSearchCriteriaObject(this._criteria, key,
                values);
        return this.updateSearchCriteria(options);
    },
    // ------------------------------------------------------------------

    /** Returns all geographic zones for this application. */
    getZones : function() {
        return this._zones;
    },

    /** Returns true if there are geographical filters applied */
    hasZonesFilter : function() {
        var keys = this.getFilterZoneKeys();
        return !!keys.length;
    },

    /** Toggles geographic zones. */
    toggleZones : function(zones) {
        zones = _.map(zones, this.getZoneKey, this);
        return this._toggleSearchCriteria('postcode', zones);
    },

    /** Returns filtering zones */
    getFilterZones : function() {
        var keys = this.getFilterZoneKeys();
        return _.map(keys, function(key) {
            return this.getZoneByKey(key);
        }, this);
    },

    /** Returns a list of all zones used to fileter values. */
    getFilterZoneKeys : function() {
        return this._criteria.postcode || [];
    },

    /** Returns a zone description corresponding to the specified key. */
    getZoneByKey : function(key) {
        var criteria = this.prepareFilterValues(key);
        var result = _.find(this._zones, function(zone) {
            var key = this.getZoneKey(zone);
            var keys = this.prepareFilterValues(key);
            return this.filterValues(criteria, keys);
        }, this);
        return result;
    },

    /** Returns key of the specified zone. */
    getZoneKey : function(zone) {
        var key = _.isObject(zone) ? zone.key : zone;
        return key;
    },

    /**
     * Returns <code>true</code> if the specified zone is selected (it is
     * present in the search criteria).
     */
    isFilteredByZone : function(zone) {
        var zones = this.prepareFilterValues(this.getFilterZoneKeys());
        if (!zones.length)
            return false;
        var key = this.getZoneKey(zone);
        var value = this.prepareFilterValues(key);
        return this.filterValues(value, zones);
    },

    // ------------------------------------------------------------------

    /**
     * Toggle tags in the search criteria. This methods sets all new tags and
     * removes already existing tags from the specified tag array.
     */
    toggleTags : function(tags) {
        return this._toggleSearchCriteria('tags', tags);
    },

    /** Returns an array of tags used as a search criteria. */
    getFilterTags : function() {
        return this._criteria.tags || [];
    },

    /**
     * Returns <code>true</code> if the specified tag is selected (it is
     * present in the search criteria).
     */
    isFilteredByTag : function(tag) {
        var criteria = this.prepareFilterValues(this.getFilterTags());
        var tags = this.prepareFilterValues(tag);
        return this.filterValues(criteria, tags);
    },

    /** Returns <code>true</code> if there are tags used in the filters. */
    hasFilterTags : function() {
        var tags = this.getFilterTags();
        return !!tags.length;
    },

    /** Returns a "normalized" tag representation */
    getTagKey : function(tag) {
        var tags = this.prepareFilterValues(tag);
        return tags.length ? tags[0] : null;
    },

    // ------------------------------------------------------------------

    /** Returns all search criteria */
    getSearchCriteria : function() {
        return this._criteria;
    },

    /** Returns currently applyed search criteria. */
    getSearchQuery : function() {
        return this._criteria.q || '';
    },

    /** Returns <code>true</code> if there is a defined full-text search query. */
    hasSearchQuery : function() {
        var query = this.getSearchQuery();
        return query && query != '';
    },

    /** Sets a new search query */
    setSearchQuery : function(value) {
        return this.updateSearchCriteria({
            q : value
        });
    },

    // ------------------------------------------------------------------

    /** Returns <code>true</code> if there are search criteria applied. */
    hasSearchCriteria : function() {
        return this.hasSearchQuery() || this.hasZonesFilter() || //
        this.hasCategoryFilteredApplied() || this.hasFilterTags();
    },

    // ------------------------------------------------------------------

    /** Returns true if the values matches to the given filters criteria. */
    filterValues : function(value, filters) {
        if (!filters || !filters.length)
            return true;
        if (!value)
            return false;
        var values = this.prepareFilterValues(value);
        var result = false;
        for (var i = 0; !result && i < values.length; i++) {
            var value = values[i];
            for (var j = 0; !result && j < filters.length; j++) {
                var filter = filters[j];
                if (_.isFunction(filter)) {
                    result = filter(value);
                } else {
                    result = filter === value;
                }
            }
        }
        return result;
    },

    /**
     * "Normalizes" the specified value for filtering. This method returns an
     * array of lower case strings used to filter resource values.
     */
    prepareFilterValues : function(value) {
        if (!value) {
            value = [];
        } else {
            var newValues = [];
            value = _.isArray(value) ? _.toArray(value) : [ value ];
            _.each(value, function(f) {
                var str = ('' + f).toLowerCase();
                var array = str.split(/\s*[,;]+\s*/gim);
                newValues = newValues.concat(array);
            });
            value = newValues;
        }
        return value;
    },

    // ------------------------------------------------------------------
    // Private methods responsible for data loading.

    /**
     * Loads all required data files from the server and initializes this store.
     */
    _loadAllInfo : function() {
        var that = this;
        return Mosaic.P.then(
                function() {
                    return Mosaic.P.all([ that._loadCategories(),
                            that._loadGeographicZones() ]);
                })//
        .then(function() {
            // return that._copySearchCriteriaFromUrl();
        }).then(function() {
            return that._loadDataMapping();
        }).then(function() {
            return that._loadResources();
        }).then(function() {
            return that._buildIndex();
        });
    },

    /**
     * Loads definitions of geographic zones used by this application
     */
    _loadGeographicZones : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._getJson(_.extend({}, {
                path : that.options.app.options.zonesUrl
            })).then(function(zones) {
                that._zones = zones;
            });
        });
    },

    /**
     * Loads all categories used by this application
     */
    _loadCategories : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._getJson(_.extend({}, {
                path : that.options.app.options.categoriesUrl
            })).then(function(categories) {
                that._categories = categories;
            });
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
        return Mosaic.P.then(function() {
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
        })
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
        return that._allResourcesPromise.then(function() {
            var criteria = that.getSearchCriteria();
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
                var changes = r.properties.updated || new Date().getTime();
                return changes;
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
        _.each(that._fields.fields, function(info, field) {
            info = info || {};
            if (!info.filter)
                return;
            var filter = criteria[field];
            if (!filter)
                return;
            filter = that.prepareFilterValues(filter);
            if (info.filter === 'prefix') { // FIXME : generalize it!
                filter = _.map(filter, function(f) {
                    return function(value) {
                        var str = '' + value;
                        return str.indexOf(f) === 0;
                    };
                });
            }
            filters.push(function(resource) {
                var properties = resource.properties;
                var value = properties[field];
                var result = that.filterValues(value, filter);
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
