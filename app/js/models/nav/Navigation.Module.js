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
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        return this.updateSearchCriteria({
            q : '',
        });
    },

    stop : function() {
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
    toggleTags : function(tags) {
        var existing = this.getFilterTags();
        var intersection = _.intersection(existing, tags);
        var newTags = _.difference(_.union(existing, tags), intersection);
        return this.updateSearchCriteria({
            tags : newTags
        });
    },

    /** Returns an array of tags used as a search criteria. */
    getFilterTags : function() {
        return this._criteria.tags || [];
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
        if (!value)
            return false;
        if (!filters || !filters.length)
            return true;
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
