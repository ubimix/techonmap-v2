var _ = require('underscore');
var Lunr = require('lunr');
var Mosaic = require('mosaic-commons');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');
var NavigationRouter = require('./NavigationRouter');
var URL = require('url');
var App = require('mosaic-core').App;
var Api = App.Api;
var AppStateMixin = require('../AppStateMixin');

/** Navigation module. Manages search criteria applied to resources. */
module.exports = Api.extend({}, ResourceUtils, AppStateMixin, {

    /** Initializes fields */
    _initFields : function() {
        this._router = new NavigationRouter();
        // Disable initial search criteria update
        // this._disableUrlUpdate = true;
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        this._router.addChangePathListener(this._onUrlChange, this);
        var appState = this.getAppState();
        appState.addChangeListener(this._onStateChange, this);
        this._router.start();
    },

    stop : function() {
        this._router.removeChangePathListener(this._onUrlChange, this);
        var appState = this.getAppState();
        appState.removeChangeListener(this._onStateChange, this);
        this._router.stop();
    },

    // ------------------------------------------------------------------
    // URL management methods

    getExportUrl : function(options) {
        options = options || {};
        var additionalParams = {};
        var appState = this.getAppState();
        var clone = appState.clone();
        _.extend(clone.options, options);
        var url = clone.toUrlObj({
            query : {
                language : '{language}',
                category : '{search.category}',
                tags : '{search.tags}',
                postcode : '{search.postcode}',
                q : '{search.q}',
                mode : '{mode}',
                header : '{header}'
            },
            hash : '{selectedId}'
        });
        if (url.query) {
            if (url.query.mode == 'full') {
                delete url.query.mode;
            }
        }
        return URL.format(url);
    },

    _onStateChange : function() {
        var url = this.getExportUrl();
        this._disableUrlUpdate = true;
        var that = this;
        setTimeout(function() {
            that._router.setPath(url);
            that._disableUrlUpdate = false;
        }, 1);
    },

    _onUrlChange : function(ev) {
        var path = this._router.getPath();
        if (this._disableUrlUpdate)
            return;
        var appState = this.getAppState();
        var path = this._router.getPath();
        appState.fromUrl(ev.path, {
            'query.category' : '{category}',
            'query.language' : '{language}',
            'query.q' : '{search.q}',
            'query.tags' : '{search.tags}',
            'query.mode' : '{mode}',
            'query.header' : '{header}',
            'hash' : '{selectedId}',
        });
    },

// _onSearchCriteriaChanged : function() {
// var path = this._serializeSearchCriteria();
// this._disableUrlUpdate = true;
// this._router.setPath(path);
// this._disableUrlUpdate = false;
// },

// _prepareUrlQuery : function(criteria) {
// criteria = criteria || {};
// var query = {};
// _.each([ 'tags', 'category', 'postcode', 'q', 'mode' ], function(key) {
// var val = this.prepareFilterValues(criteria[key]);
// if (!val.length)
// return;
// query[key] = val;
// }, this);
// return query;
// },

// _serializeSearchCriteria : function(options) {
// var uri = new URI();
// uri.path = '';
// var criteria = this.getSearchCriteria();
// uri.query = this._prepareUrlQuery(criteria);
// _.extend(uri.query, options);
// var str = uri + '';
// return str;
// },

// _parseSearchCriteria : function(str) {
// var uri = new URI(str);
// var query = this._prepareUrlQuery(uri.query);
// if (query.q) {
// query.q = query.q[0];
// }
// return query;
// },

// ------------------------------------------------------------------
// Private methods

});
