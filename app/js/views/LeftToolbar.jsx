/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('./AppViewMixin');
var SearchTagsView = require('./search/SearchTagsView.jsx');
var SearchInfoQueryView = require('./search/SearchInfoQueryView.jsx');
var SearchInfoCategoriesView = require('./search/SearchInfoCategoriesView.jsx');
var SearchInfoZoneView = require('./search/SearchInfoZoneView.jsx');
var DomUtils= require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');

module.exports = React.createClass({

    displayName : 'LeftToolbar',

    mixins : [ I18NMixin, AppViewMixin ],

    _getStore : function(){
        return this.props.app.nav;
    },
    
    _newState : function(){
        return { };
    },
    
    _incZoomLevel : function(ev){
        var app = this.props.app;
        app.map.changeMapZoom({ zoomDelta : +1 });
        ev.stopPropagation();
        ev.preventDefault();
    },

    _decZoomLevel : function(ev){
        var app = this.props.app;
        app.map.changeMapZoom({ zoomDelta : -1 });
        ev.stopPropagation();
        ev.preventDefault();
    },

    _renderSearchQueryInfo : function(){
        var app = this.props.app;
        if (!app.nav.hasSearchQuery())
            return '';
        return (
            <ul className="list-group search-query">
                <li className="list-group-item">
                    <span className="criteria-reminder-title">{this._getLabel('toolbar.left.label.query')}</span>
                    <SearchInfoQueryView app={app} />
                    <span className="bar"></span>
                    <span className="remove"></span>
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
                    <SearchTagsView app={app}/>
                    <span className="bar"></span>
                    <span className="remove"></span>
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
                    <SearchInfoCategoriesView app={app}/>
                    <span className="bar"></span>
                    <span className="remove"></span>
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
                    <SearchInfoZoneView app={app}/>
                    <span className="bar"></span>
                    <span className="remove"></span>
                </li>
            </ul>
        );
    },

    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>
                <div className="btn-group-vertical map-control" role="group">
                    <button type="button" className="btn btn-default" onClick={this._incZoomLevel}><i className="icon-zoom-in"></i></button>
                    <button type="button" className="btn btn-default" onClick={this._decZoomLevel}><i className="icon-zoom-out"></i></button>
                </div>
                <div className="info-blocks">
                    {this._renderSearchQueryInfo()}
                    {this._renderZonesInfo()}
                    {this._renderCategoriesInfo()}
                    {this._renderTagsInfo()}
                </div>
            </div>
        );
    }
});
