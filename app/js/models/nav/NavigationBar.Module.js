var _ = require('underscore');
var Lunr = require('lunr');
var Mosaic = require('mosaic-commons');
var NavigationRouter = require('./NavigationRouter');
var URI = require('mosaic-core').Core.URI;
var App = require('mosaic-core').App;
var Api = App.Api;

/** Navigation module. Manages search criteria applied to resources. */
module.exports = Api.extend({}, {

    /** Initializes fields */
    _initFields : function() {
        this._router = new NavigationRouter();
        this._path = '';
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        var app = this.options.app;
        app.nav.addChangeListener(this._onSearchCriteriaChanged, this);
        this._router.addChangePathListener(this._onUrlChange, this);
        this._router.start();
    },

    stop : function() {
        var app = this.options.app;
        app.nav.removeChangeListener(this._onSearchCriteriaChanged, this);
        this._router.removeChangePathListener(this._onUrlChange, this);
        this._router.stop();
    },

    _onUrlChange : function(ev) {
        var path = this._router.getPath();
        if (ev.update) {
            var criteria = this._parseSearchCriteria(path);
            var app = this.options.app;
            app.nav.updateSearchCriteria(criteria);
        }
    },

    _onSearchCriteriaChanged : function() {
        var path = this._serializeSearchCriteria();
        this._router.setPath(path);
    },

    _serializeSearchCriteria : function() {
        var uri = new URI();
        uri.path = '';
        var app = this.options.app;
        var criteria = app.nav.getSearchCriteria();
        uri.query = {};
        _.each([ 'tags', 'category', 'postcode', 'q' ], function(key) {
            var val = criteria[key];
            if (!val)
                return;
            if (_.isArray(val) && !val.length)
                return;
            uri.query[key] = val;
        });
        var str = uri + '';
        return str;
    },

    _parseSearchCriteria : function(str) {
        var uri = new URI(str);
        return uri.query;
    }

});
