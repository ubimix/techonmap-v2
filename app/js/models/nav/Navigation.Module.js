var _ = require('underscore');
var Lunr = require('lunr');
var Mosaic = require('mosaic-commons');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');
var App = require('mosaic-core').App;
var Api = App.Api;

/** Navigation module. Manages search criteria applied to resources. */
module.exports = Api.extend({}, ResourceUtils, {

    /** Initializes fields */
    _initFields : function() {
        this._criteria = {};
        this._categories = [];
        this._zones = [];
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return Mosaic.P.all(
                    [ that._loadCategories(), that._loadGeographicZones() ])
                    .then(function() {
                        return that.updateSearchCriteria({
                            q : ''
                        });
                    });
        });
    },

    stop : function() {
    },

    // ------------------------------------------------------------------
    // Private methods responsible for data loading.

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

    // ------------------------------------------------------------------
    // Actions

    /** Updates an internal search criteria */
    updateSearchCriteria : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            _.extend(that._criteria, intent.params);
        })).then(function() {
            that.notify();
        });
    }),

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

    /** Returns a list of category keys used to filter objects. */
    getFilterCategoryKeys : function() {
        return this._criteria.category;
    },

    /** Returns a category object corresponding to the specified key. */
    getCategoryByKey : function(key) {
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

    // ------------------------------------------------------------------

    /** Returns all geographic zones for this application. */
    getZones : function() {
        return this._zones;
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

    /** Sets a new search query */
    setSearchQuery : function(value) {
        return this.updateSearchCriteria({
            q : value
        });
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
            value = _.isArray(value) ? _.toArray(value) : [ value ];
            value = _.map(value, function(f) {
                return ('' + f).toLowerCase();
            });
        }
        return value;
    },

    // ------------------------------------------------------------------
    // Private methods

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

});
