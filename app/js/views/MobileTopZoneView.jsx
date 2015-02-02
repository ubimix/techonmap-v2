/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');
var ContentPopupMixin = require('./utils/ContentPopupMixin');
var SearchPanel = require('./search/SearchPanel.jsx');
var SharePopup = require('./dialogs/SharePopup.jsx');
var ExportPopup = require('./dialogs/ExportPopup.jsx');
var PopupPanel = require('./utils/PopupPanel.jsx');

module.exports = React.createClass({
    displayName : 'MobileTopZoneView',
    mixins : [ DomUtils, I18NMixin, ContentPopupMixin ],
    getApp : function(){
        return this.props.app;
    },
    componentDidMount : function(){
    },
    componentWillUnmount : function(){
    },
    getInitialState : function(){
        return this._newState();
    },
    _newState : function(options){
        return _.extend({ showSearchMenu : false }, this.state, options);
    },
    _renderAboutMenuItem : function(){
        var className = this._getClassName('info');
        return (
            <li className={className}>
                <a href="#" className="menu-info" onClick={this._showAboutInfo}>
                    <i className="icon icon-info"></i>
                </a>
            </li>
        );
    },

    _getClassName : function(key) {
        var app = this.props.app;
        var activeKey = app.ui.getFocusedViewKey();
        return key === activeKey ? 'active' : '';
    },

    _activateSearchView : function(ev){
        var app = this.props.app;
        app.ui.focusView('search');
        ev.preventDefault();
        ev.stopPropagation();
    },
    _renderSearchMenuItem : function(){
        var className = this._getClassName('search');
        return (
            <li className={className}>
                <a href="#" className="menu-search icon" 
                    onClick={this._activateSearchView}>
                    <i className="icon icon-search"></i>
                </a>
            </li>
        );
    },

    _activateMapView : function(ev){
        var app = this.props.app;
        app.ui.focusView('map');
        ev.preventDefault();
        ev.stopPropagation();
    },
    _renderMapMenuItem: function(){
        var className = this._getClassName('map');
        return (
            <li className={className}>
                <a href="#" className="menu-map" onClick={this._activateMapView}>
                    <i className="icon icon-map">
                        <span className="glyphicon glyphicon-map-marker"></span>
                    </i>
                </a>
            </li>
        );
    },

    _activateListView : function(ev){
        var app = this.props.app;
        app.ui.focusView('list');
        ev.preventDefault();
        ev.stopPropagation();
    },
    _renderListMenuItem: function(){
        var className = this._getClassName('list');
        return (
            <li className={className}>
                <a href="#" className="menu-list" onClick={this._activateListView}>
                    <i className="icon icon-list">
                        <span className="glyphicon glyphicon-list"></span>
                    </i>
                </a>
            </li>
        );
    },    
    render : function() {       
        var app = this.props.app;
        var className = this.props.className + " navbar navbar-default";
        return (
            <nav className={className} role="navigation">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-xs-6">
                          <div className="navbar-header">
                              <a className="navbar-brand" href="#"><img src="images/banner.png" /></a>
                          </div>
                      </div>
                      <div className="col-xs-6">
                          <ul className="nav nav-tabs pull-right top-navigation">
                              {this._renderAboutMenuItem()}
                              {this._renderSearchMenuItem()}
                              {this._renderMapMenuItem()}
                              {this._renderListMenuItem()}
                          </ul>
                      </div>
                  </div>
              </div>
          </nav>
        );
    }
});
