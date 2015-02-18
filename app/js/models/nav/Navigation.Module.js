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
        function fromStateToUrl(from, to, mapping) {
            _.each(mapping, function(path, key) {
                var val = from.getValue(path);
                if (val && val.length) {
                    to[key] = val;
                }
            })
        }
        var url = {
            query : {},
        };
        fromStateToUrl(clone, url, {
            hash : 'selectedId'
        });
        fromStateToUrl(clone, url.query, {
            language : 'language',
            category : 'search.category',
            tags : 'search.tags',
            postcode : 'search.postcode',
            q : 'search.q',
            mode : 'mode',
            header : 'header'
        });
        if (url.query.mode == 'full') {
            delete url.query.mode;
        }
        return URL.format(url);
    },

    _onStateChange : function() {
        var url = this.getExportUrl();
        this._disableUrlUpdate = true;
        var that = this;
        that._router.setPath(url);
        setTimeout(function() {
            that._disableUrlUpdate = false;
        }, 1);
    },

    _onUrlChange : function(ev) {
        var path = this._router.getPath();
        if (this._disableUrlUpdate)
            return;
        var appState = this.getAppState();
        var path = this._router.getPath();
        function fromUrlToState(from, to, mapping) {
            _.each(mapping, function(path, key) {
                var val = from[key];
                if (key === 'hash' && val && val.length > 1) {
                    val = val.substring(1);
                }
                to.setValue(path, val);
            })
        }
        var url = URL.parse(path, true);
        fromUrlToState(url.query, appState, {
            language : 'language',
            category : 'search.category',
            tags : 'search.tags',
            postcode : 'search.postcode',
            q : 'search.q',
            mode : 'mode',
            header : 'header'
        });
        fromUrlToState(url, appState, {
            hash : 'selectedId'
        });
    },

});
