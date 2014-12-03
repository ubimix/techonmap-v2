/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var InfiniteScrollFactory = React
        .createFactory(require('mosaic-core').Core.InfiniteScroll);
var AppViewMixin = require('../AppViewMixin');

var ListView = React.createClass({
    displayName : 'SearchResultsListView',

    mixins : [ AppViewMixin ],

    /** Renders this view */
    render : function() {
        var app = this.props.app;
        var scrollStyle = this._getScrollStyles();
        return InfiniteScrollFactory({
            className : 'list-group',
            style : scrollStyle,
            pageSize : 15,
            itemHeight : 75,
            length : this.state.resources.length,
            focusedIndex : this.state.focusedIndex,
            loadItems : this._renderItems
        });
    },

    // -----------------------------------------------------------------------
    // React livecycle event handlers

    componentWillMount : function() {
        var store = this._getStore();
        store.addSelectListener(this._updateState, this);
    },

    componentWillUnmount : function() {
        var store = this._getStore();
        store.removeSelectListener(this._updateState, this);
    },

    // -----------------------------------------------------------------------
    // Private methods

    /** Returns the underlying store (module). */
    _getStore : function() {
        return this.props.app.res;
    },

    /** Creates and returns a new internal state for this view. */
    _newState : function(options) {
        var app = this.props.app;
        var resources = app.res.getResources();
        var focusedIndex = app.res.getSelectedResourcePos();
        return {
            resources : resources,
            focusedIndex : focusedIndex
        }
    },

    /** Returns styles for the scroll. */
    _getScrollStyles : function() {
        return {};
    },

    /** Renders items starting from the specified position. */
    _renderItems : function(params) {
        var items = [];
        var resources = this.state.resources;
        var len = Math.min(params.index + params.length, resources.length);
        for (var i = params.index; i < len; i++) {
            items.push(this._renderItem(resources[i], i));
        }
        params.callback(items);
    },

    /** Renders an individual resources for the list */
    _renderItem : function(resource, pos) {
        var app = this.props.app;
        var type = app.res.getResourceType(resource);
        var view = app.viewManager.newView('listItem', type, {
            app : app,
            resource : resource,
            pos : pos,
            onClick : function() {
                var id = app.res.getResourceId(resource);
                app.res.selectResource({
                    resourceId : id
                });
            }
        });
        var result = view;
        return result;
    },

});

module.exports = ListView;