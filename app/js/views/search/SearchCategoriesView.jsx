/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var TagsMixin = require('../widgets/TagsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchCategoriesView',
    mixins : [AppViewMixin, TagsMixin, I18NMixin],
    _newState : function(options){
        var app = this.getApp();
        var tags = app.nav.getFilterTags();
        return { tags : tags };
    },
    _getStore : function(){
        return this.props.app.nav;
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
    render1 : function(){
        var app = this.props.app;
        var categories = app.nav.getCategories();
        return (
            <ul className="list-group categories">
                {_.map(categories, function(category){
                    return (
                       <li className="list-group-item">
                           {this._renderCategory(category)}
                       </li>
                    );
                }, this)}
            </ul>
        );
    },
    render : function(){
        var app = this.props.app;
        var categories = app.nav.getCategories();
        var array = _.map(categories, function(category, i){
            var key = category.key;
            var tags = category.tags;
            var active = app.nav.isFilteredByCategory(category.key);
            var body = active
                ? (<div className="panel-body">{this._renderTagList(tags)}</div>)
                : '';
            return (
                <div className="panel category">
                    <div className="panel-heading">
                      <h3 className="panel-title">{this._renderCategory(category)}</h3>
                    </div>
                    {body}
                </div>
            );
        }, this);
        return (
            <div className="panel-group categories">{array}</div>
         );
    }
});
