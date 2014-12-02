/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var CategoryMixin = require('../utils/CategoryMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchInfoCategoriesView',
    mixins : [AppViewMixin, I18NMixin, CategoryMixin],
    _newState : function(options){
        var nav = this._getStore();
        var categories = nav.getFilterCategories();
        return { categories : categories };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    render : function() {
        return this._renderCategoryList(this.state.categories);
    }
});
