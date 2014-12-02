/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var TagsMixin = require('../utils/TagsMixin.jsx');
var CategoryMixin = require('../utils/CategoryMixin.jsx');
var MenuMixin = require('../utils/MenuMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchCategoriesView',
    mixins : [ AppViewMixin, I18NMixin, TagsMixin, CategoryMixin, MenuMixin ],
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
            var body = active ? this._renderTagList(tags) : null;
            return this._renderMenuPanel(this._renderCategory(category), body);
        }, this);
        return this._renderMenuPanelGroup('main', array);
    }
});
