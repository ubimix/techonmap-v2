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
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._loadCategories().then(function() {
                return that.updateSearchCriteria({
                    q : '',
                });
            });
        });
    },

    stop : function() {
    },

    // ------------------------------------------------------------------
    // Data loading

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

    /** Adds the specified tags to the list of filters. */
    filterByTags : function(tags) {
        if (!tags)
            tags = [];
        else
            tags = _.isArray(tags) ? tags : [ tags ];
        return this.updateSearchCriteria({
            tags : tags
        });
    },

    /**
     * Toggle tags in the search criteria. This methods sets all new tags and
     * removes already existing tags from the specified tag array.
     */
    toggleCategories : function(categories) {
        var existing = this.getFilterCategoryKeys();
        existing = this.prepareFilterValues(existing);
        categories = this.prepareFilterValues(categories);
        var intersection = _.intersection(existing, categories);
        var newCategories = _.difference(_.union(existing, categories),
                intersection);
        return this.updateSearchCriteria({
            category : newCategories
        });
    },
    /**
     * Toggle tags in the search criteria. This methods sets all new tags and
     * removes already existing tags from the specified tag array.
     */
    toggleTags : function(tags) {
        var existing = this.getFilterTags();
        existing = this.prepareFilterValues(existing);
        tags = this.prepareFilterValues(tags);
        var intersection = _.intersection(existing, tags);
        var newTags = _.difference(_.union(existing, tags), intersection);
        return this.updateSearchCriteria({
            tags : newTags
        });
    },

    /** Returns true if a category key is used to filter values. */
    isFilteredByCategory : function(key) {
        var categories = this.getFilterCategoryKeys();
        return !!_.find(categories, function(k) {
            return k === key;
        });
    },

    /** Returns an array of tags used as a search criteria. */
    getFilterTags : function() {
        return this._criteria.tags || [];
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
        var result = _.find(this._categories, function(category) {
            return category.key === key;
        });
        return result;
    },

    /**
     * Returns <code>true</code> if the specified tag is selected (it is
     * present in the search criteria).
     */
    isTagSelected : function(tag) {
        var criteria = this.prepareFilterValues(this.getFilterTags());
        var tags = this.prepareFilterValues(tag);
        return this.filterValues(criteria, tags);
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
                result = filter === value;
            }
        }
        return result;
    },

    /**
     * "Normalizes" the specified value for filtering. This method returns an
     * array of lower case strings used to filter resource values.
     */
    prepareFilterValues : function(value) {
        value = _.isArray(value) ? _.toArray(value) : [ value ];
        value = _.map(value, function(f) {
            return ('' + f).toLowerCase();
        });
        return value;
    }

});
