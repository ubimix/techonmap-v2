var _ = require('underscore');
var Lunr = require('lunr');
var Mosaic = require('mosaic-commons');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');
var NavigationRouter = require('./NavigationRouter');
var URI = require('mosaic-core').Core.URI;
var App = require('mosaic-core').App;
var Api = App.Api;

/** Navigation module. Manages search criteria applied to resources. */
module.exports = Api.extend({}, ResourceUtils, {

    /** Initializes fields */
    _initFields : function() {
        this._router = new NavigationRouter();
        // Disable initial search criteria update
        this._disableUrlUpdate = true;
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        this._router.addChangePathListener(this._onUrlChange, this);
        this._router.start();
    },

    stop : function() {
        this._router.removeChangePathListener(this._onUrlChange, this);
        this._router.stop();
    },

    // ------------------------------------------------------------------
    // URL management methods

    getExportUrl : function(options) {
        options = options || {};
        var additionalParams = {};
        var app = this.options.app;
        var nav = app.state.clone();
        _.extend(nav.options, options);
        return nav.toUrl({
            query : {
                category : '{category}',
                language : '{language}',
                q : '{search.q}',
                tags : '{search.tags}',
                mode : '{mode}',
                header : '{header}'
            },
            hash : '{selectionId}'
        });
    },

    _onUrlChange : function(ev) {
        if (this._disableUrlUpdate)
            return;
        if (ev.update) {
            var path = this._router.getPath();
            var app = this.options.app;
            app.state.fromUrl(url, {
                'query.category' : 'category',
                'query.language' : 'language',
                'query.q' : 'search.q',
                'query.tags' : 'search.tags',
                'query.mode' : 'mode',
                'query.header' : 'header',
                'hash' : 'selectionId',
            });
        }
    },

    _onSearchCriteriaChanged : function() {
        var path = this._serializeSearchCriteria();
        this._disableUrlUpdate = true;
        this._router.setPath(path);
        this._disableUrlUpdate = false;
    },

    _prepareUrlQuery : function(criteria) {
        criteria = criteria || {};
        var query = {};
        _.each([ 'tags', 'category', 'postcode', 'q', 'mode' ], function(key) {
            var val = this.prepareFilterValues(criteria[key]);
            if (!val.length)
                return;
            query[key] = val;
        }, this);
        return query;
    },

    _serializeSearchCriteria : function(options) {
        var uri = new URI();
        uri.path = '';
        var criteria = this.getSearchCriteria();
        uri.query = this._prepareUrlQuery(criteria);
        _.extend(uri.query, options);
        var str = uri + '';
        return str;
    },

    _parseSearchCriteria : function(str) {
        var uri = new URI(str);
        var query = this._prepareUrlQuery(uri.query);
        if (query.q) {
            query.q = query.q[0];
        }
        return query;
    },

// ------------------------------------------------------------------
// Private methods

});
