/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var CategoryMixin = {
    _selectCategory : function(category, ev) {
        var app = this.props.app;
        app.nav.toggleCategories([category]);
        ev.stopPropagation();
        ev.preventDefault();
    },
    _renderCategory : function(category){
        var app = this.props.app;
        var selected = app.nav.isCategorySelected(category);
        var categoryLabel = category + '';
        var className = selected ? 'category selected' : 'category';
        return (
            <span
                onClick={_.bind(this._selectCategory, this, category)}
                className={className}>
                {categoryLabel + ' '}
            </span>
        );
    },
    _renderCategoryList : function(categories) {
        var list = _.map(categories, this._renderCategory, this);
        if (!list.length) {
            list = [this._getLabel('filter.label.categories.all')];
        }
        return <span className="categories">{list}</span>
    },
};

module.exports = CategoryMixin;