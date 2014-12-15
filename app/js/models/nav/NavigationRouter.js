var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var URI = require('mosaic-core').Core.URI;
var Page = require('page');

/**
 * This class is responsible for synchronization of search criteria with the
 * navigation bar of the browser.
 */
var NavigationRouter = Mosaic.Class.extend(Mosaic.Events.prototype, {

    /**
     * Initializes internal fields of this object.
     * 
     * @param options.baseUrl
     *                path used as a base url; this path is resolved relatively
     *                to the current page
     */
    initialize : function(options) {
        this.setOptions(options);
        this._notifyPathChanges = _.bind(this._notifyPathChanges, this);
    },

    /** Initializes navigation */
    start : function() {
        var baseUrl = this._getBaseUrl();
        Page.base(baseUrl.path);
        Page('*', this._notifyPathChanges);
        Page.start();
        this._notifyPathChanges();
    },

    stop : function(){
    },
    
    /** Returns the current path. */
    getPath : function() {
        var baseUrl = this._getBaseUrl();
        var uri = this._getCurrentUrl();
        uri.reset(true);
        if (uri.path.indexOf(baseUrl.path) == 0) {
            uri.path = uri.path.substring(baseUrl.path.length);
        }
        return uri + '';
    },

    /** Adds a new path change listener. */
    addChangePathListener : function(listener, context) {
        this.on('path', listener, context);

    },

    /** Removes a path change listener. */
    removeChangePathListener : function(listener, context) {
        this.off('path', listener, context);
    },

    /** Sets a new path to put in the navigation bar. */
    setPath : function(path, force) {
        var currentPath = this.getPath();
        if (path !== currentPath || force) {
            this._explicitUpdate = true;
            this._force = force;
            var that = this;
            Page(path);
            that._explicitUpdate = false;
            that._force = false;
        }
    },

    /** Notifies all listeners about path changes. */
    _notifyPathChanges : function() {
        var path = this.getPath();
        this.fire('path', {
            path : path,
            update : this._explicitUpdate,
            force : this._force
        });
    },

    /** Returns the current URL. */
    _getCurrentUrl : function() {
        var href = window.location.href + '';
        var url = new URI(href);
        return url;
    },

    /** Returns the base URL. */
    _getBaseUrl : function() {
        if (!this._baseUrl) {
            var url = this._getCurrentUrl();
            var basePath = new URI(this.options.baseUrl || '');
            this._baseUrl = url.resolve(basePath);
        }
        return this._baseUrl;
    },

});

module.exports = NavigationRouter;
