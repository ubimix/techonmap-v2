/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');

module.exports = React.createClass({
    displayName : 'SearchInfoCategoriesView',
    mixins : [AppViewMixin],
    _newState : function(options){
        var nav = this._getStore();
        var categories = app.nav.getFilterCategories();
        return { categories : categories };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    _renderCategoryList : function(categories) {
        return _.map(categories, function(category){
            return <span>{category}</span>;
        });
    },
    render : function() {
        var app = this.props.app;
        return (
            <span className={this.props.className}>
                {this._renderCategoryList(this.state.categories)}
            </span>
        );
    }
});
