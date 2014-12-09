/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var CategoryMixin = require('../utils/CategoryMixin.jsx');
var MenuMixin = require('../utils/MenuMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchPanelCategories',
    mixins : [ AppViewMixin, I18NMixin, CategoryMixin, MenuMixin ],
    _newState : function(options) {
        var app = this.getApp();
        var tags = app.nav.getFilterTags();
        return {
            tags : tags
        };
    },
    _getStore : function() {
        return this.props.app.nav;
    },
    render : function() {
        var app = this.props.app;
        var categories = app.nav.getCategories();
        var array = _.map(categories, function(category, i) {
            var key = category.key;
            var tags = category.tags;
            var active = app.nav.isFilteredByCategory(category);
            return this._renderMenuPanel(this._renderCategory(category));
        }, this);
        return this._renderMenuPanelGroup('main', array);
    }
});
