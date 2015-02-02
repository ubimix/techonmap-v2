/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var TagsInfoView = require('./TagsInfoView.jsx');
var QueryInfoView = require('./QueryInfoView.jsx');
var CategoriesInfoView = require('./CategoriesInfoView.jsx');
var ZoneInfoView = require('./ZoneInfoView.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({

    displayName : 'SearchInfoBlock',

    mixins : [ I18NMixin, AppViewMixin ],

    _getStore : function(){
        return this.props.app.nav;
    },
    
    _newState : function(){
        return { };
    },
    
    _renderSearchQueryInfo : function(){
        var app = this.props.app;
        if (!app.nav.hasSearchQuery())
            return '';
        return (
            <ul className="list-group search-query">
                <li className="list-group-item">
                    <span className="criteria-reminder-title">{this._getLabel('toolbar.left.label.query')}</span>
                    <QueryInfoView app={app} />
                    <span className="bar"></span>
                    <a href="#" className="remove" onClick={function(ev){
                        app.nav.setSearchQuery('');
                        ev.stopPropagation();
                        ev.preventDefault();
                    }}></a>
                </li>
            </ul>
        );
    },

    _renderTagsInfo : function(){
        var app = this.props.app;
        if (!app.nav.hasFilterTags())
            return '';
        return (
            <ul className="list-group search-tags">
                <li className="list-group-item">
                    <span className="criteria-reminder-title">{this._getLabel('toolbar.left.label.tags')}</span>
                    <TagsInfoView app={app}/>
                    <span className="bar"></span>
                    <a href="#" className="remove" onClick={function(ev){
                        app.nav.toggleTags([]);
                        ev.stopPropagation();
                        ev.preventDefault();
                    }}></a>
                </li>
            </ul>
        );
    },

    _renderCategoriesInfo : function(){
        var app = this.props.app;
        if (!app.nav.hasFilterCategories())
            return '';
        return (
            <ul className="list-group search-categories">
                <li className="list-group-item">
                    <span className="criteria-reminder-title">{this._getLabel('toolbar.left.label.categories')}</span>
                    <CategoriesInfoView app={app}/>
                    <span className="bar"></span>
                    <a href="#" className="remove" onClick={function(ev){
                        app.nav.toggleCategories([]);
                        ev.stopPropagation();
                        ev.preventDefault();
                    }}></a>
                </li>
            </ul>
        );
    },

    _renderZonesInfo : function(){
        var app = this.props.app;
        if (!app.nav.hasZonesFilter())
            return '';
        return (
            <ul className="list-group search-zones">
                <li className="list-group-item">
                    <span className="criteria-reminder-title">{this._getLabel('toolbar.left.label.zone')}</span>
                    <ZoneInfoView app={app}/>
                    <span className="bar"></span>
                    <a href="#" className="remove" onClick={function(ev){
                        app.nav.toggleZones([]);
                        ev.stopPropagation();
                        ev.preventDefault();
                    }}></a>
                </li>
            </ul>
        );
    },

    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>
                {this._renderSearchQueryInfo()}
                {this._renderZonesInfo()}
                {this._renderCategoriesInfo()}
                {this._renderTagsInfo()}
            </div>
        );
    }
});
