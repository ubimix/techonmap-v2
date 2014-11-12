var _ = require('underscore');
var Lunr = require('lunr');
var Mosaic = require('mosaic-commons');
require('mosaic-core');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');

var Api = Mosaic.App.Api;

/** This module is responsible for management of organizations (sites). */
module.exports = Api.extend({}, ResourceUtils, {

    /** Initializes fields */
    _initFields : function() {
        var that = this;
        that._fields = {
            fields : {}
        };
        that._sites = [];
        that._selectedSite = null;
    },

    // ------------------------------------------------------------------

    /** Pre-loads map-related information. */
    start : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._loadAllInfo();
        });
    },

    stop : function() {
    },

    // ------------------------------------------------------------------
    // Actions

    /** Searches sites and updates the list of sites in the store. */
    searchSites : Api.intent(function(intent) {
        var that = this;
        intent.resolve(Mosaic.P.then(function() {
            return that._searchSites(intent.params);
        })).then(function() {
            var selectedSiteId = that.getSelectedSiteId();
            that.notify();
            if (selectedSiteId !== undefined) {
                return that.selectSite({
                    siteId : selectedSiteId
                });
            }
        });
    }),

    /**
     * Selects a site by an identifier and sets it in the store. Notifies about
     * the selected site.
     */
    selectSite : Api.intent(function(intent) {
        var that = this;
        intent.resolve(that._findSiteById(intent.params.siteId))//
        .then(function(site) {
            that._selectedSite = site;
            that.notifySelection();
        });
    }),

    // ------------------------------------------------------------------

    /** Returns a list of all sites. */
    getSites : function() {
        return this._sites;
    },

    /** Returns the currently selected site */
    getSelectedSite : function() {
        return this._selectedSite;
    },

    /**
     * Returns the identifier of the selected site or <code>null</code> if not
     * sites were selected.
     */
    getSelectedSiteId : function() {
        return this.getResourceId(this._selectedSite);
    },

    /**
     * Returns position of the selected site in the list.
     */
    getSelectedSitePos : function() {
        var result = -1;
        var selectedId = this.getSelectedSiteId();
        if (selectedId !== null) {
            _.find(this._sites, function(site, i) {
                if (this.getResourceId(site) === selectedId) {
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

    /**
     * Loads all required data files from the server and initializes this store.
     */
    _loadAllInfo : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._loadDataMapping();
        }).then(function() {
            return that._loadSites();
        }).then(function() {
            return that._buildIndex();
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

    /** Loads all sites and returns a promise for results */
    _loadSites : function(options) {
        var that = this;
        return that._getGeoJsonArray(_.extend({}, options, {
            path : that.app.options.dataUrl
        })).then(function(sites) {
            that._allSites = {};
            _.map(sites, function(d) {
                var id = that.getResourceId(d);
                that._allSites[id] = d;
            });
            that._selectedSite = null;
            that._resetSites();
        });
    },

    /** Builds and returns a full-text search index. */
    _buildIndex : function() {
        var that = this;
        var index = that._index = Lunr(function() {
            _.each(that._fields.fields, function(field, info) {
                info = info || {};
                var boost = info.boost || 1;
                var type = info.type || 'field';
                this[type](field, {
                    boost : boost
                });
            }, this);
        });
        setTimeout(function() {
            _.each(that._allSites, function(d, id) {
                var props = d.properties;
                index.add({
                    id : id,
                    name : props.name,
                    city : props.city,
                    address : props.address
                });
            });
        }, 10);
    },

    /** Returns a site corresponding to the specified identifier. */
    _findSiteById : function(siteId) {
        var that = this;
        return Mosaic.P.then(function() {
            if (!siteId)
                throw new Error('Site ID is not defined.');
            var sites = that.getSites();
            return _.find(sites, function(site) {
                return site.properties.id === siteId;
            });
        });
    },

    /** Resets search results and sets all existing sites in this store. */
    _resetSites : function() {
        var that = this;
        that._sites = _.values(that._allSites);
    },

    /**
     * Searches sites corresponding to the specified search criteria and returns
     * a promise with search results.
     */
    _searchSites : function(options) {
        var that = this;
        return Mosaic.P.then(function() {
            var q = options.q;
            if (!q || q == '') {
                that._resetSites();
                return;
            }
            var result = [];
            var list = that._index.search(q);
            _.each(list, function(r) {
                var id = r.ref;
                var site = that._allSites[id]
                if (site) {
                    result.push(site);
                }
            });
            that._sites = result;
            return result;
        });
    },

});
