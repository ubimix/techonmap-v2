/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var CategoryMixin = {
    _selectCategory : function(category, ev) {
        var app = this.props.app;
        var promise = app.nav.toggleCategories([category]);
        if (this.props.onSelectCategory) {
            var that = this;
            promise.then(function(){
                that.props.onSelectCategory(category);
            });
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _renderCategory : function(category){
        var app = this.props.app;
        var selected = app.nav.isFilteredByCategory(category);
        var categoryKey = app.nav.getCategoryKey(category);
        var categoryLabel = category.label;
        var className = selected ? 'category selected' : 'category';
        return (
            <span
                onClick={_.bind(this._selectCategory, this, category)}
                className={className}
                key={categoryKey}>
                <i className={'icon icon-' + category.icon} />
                <span className='category-label'>{categoryLabel + ' '}</span>
            </span>
        );
    },
    _renderCategoryList : function(categories) {
        var list = _.map(categories, this._renderCategory, this);
        if (!list.length) {
            list = [
               <span className="category none">
                   <span className="category-label">
                       {this._getLabel('filter.label.categories.all')}
                   </span>
               </span>
            ];
        }
        return <span className="categories categories-inline">{list}</span>
    },
};

module.exports = CategoryMixin;