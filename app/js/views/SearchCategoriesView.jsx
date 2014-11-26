/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('./AppViewMixin');
var TagsMixin = require('./widgets/TagsMixin.jsx');

module.exports = React.createClass({
    displayName : 'SearchCategoriesView',
    mixins : [AppViewMixin, TagsMixin],
    _newState : function(options){
        var app = this.getApp();
        var tags = app.nav.getFilterTags();
        return { tags : tags };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    _onSelectTag : function(){
        var elm = this.refs.categories.getDOMNode();
        DomUtils._removeClass(elm, 'open');
    },
    _toggleCategories : function(ev){
        var app = this.props.app;
        var elm = this.refs.categories.getDOMNode();
        DomUtils._toggleClass(elm, 'open');
        ev.stopPropagation();
        ev.preventDefault();
    },
    _onCategoryClick : function(category, ev) {
        var key = category.key;
        var app = this.props.app;
        app.nav.toggleCategories([key]);
        ev.preventDefault();
        ev.stopPropagation();
    },
    _renderCategory : function(category){
        var app = this.props.app;
        var active = app.nav.isFilteredByCategory(category.key);
        var className = active ? ' active ': '';
        var label = category.label;
        return (
          <a href="#"
            className={className}
            onClick={_.bind(this._onCategoryClick, this, category)}>
             {label}
         </a>
       );
    },
    render : function(){
        var app = this.props.app;
        var categories = app.nav.getCategories();
        var array = [];
        _.each(categories, function(category, i){
            var key = category.key;
            var tags = category.tags;
            array.push(
                <div key={key}>
                    <h4>{this._renderCategory(category)}</h4>
                    <div>{this._renderTagList(tags)}</div>
                </div>
            );
        }, this);
        if (array.length % 2){
            array.push('');
        }
        var selectedCategories = app.nav.getFilterCategories();
        return (
            <div className="">
                {
                    _.map(selectedCategories, function(category){
                        return this._renderCategory(category);
                    }, this)
                }
                <div className="row">
                    <div className="col-xs-6">{_.filter(array, function(v, i) { return i % 2 == 0; })}</div>
                    <div className="col-xs-6">{_.filter(array, function(v, i) { return i % 2 == 1; })}</div>
                </div>
            </div>
         );
    }
});
