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
        this._query = '';
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
    },

    stop : function() {
    },

    // ------------------------------------------------------------------
    // Actions

    /** Updates an internal search criteria */
    updateSearchCriteria : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            that._query = intent.params.query;
        })).then(function(){
            that.notify();
        });
    }),

    // ------------------------------------------------------------------

    /** Returns currently applyed search criteria. */
    getSearchQuery : function() {
        return this._query;
    },

    /** Sets a new search query */
    setSearchQuery : function(value) {
        return this.updateSearchCriteria({
            query : value
        });
    },

});
