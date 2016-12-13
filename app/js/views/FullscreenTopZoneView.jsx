var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');
var ContentPopupMixin = require('./utils/ContentPopupMixin');
var SearchPanel = require('./search/SearchPanel.jsx');
var SharePopup = require('./dialogs/SharePopup.jsx');
var ExportPopup = require('./dialogs/ExportPopup.jsx');
var FeedbackPopup = require('./dialogs/FeedbackPopup.jsx');
var PopupPanel = require('mosaic-core').React.PopupPanel;
var EditEntityPopup = require('./dialogs/EditEntityPopup.jsx');

module.exports = React.createClass({
    displayName : 'FullscreenTopZoneView',
    mixins : [ DomUtils, I18NMixin, ContentPopupMixin ],
    getApp : function(){
        return this.props.app;
    },
    getInitialState : function(){
        return this._newState();
    },
    _newState : function(options){
        return _.extend({ showSearchMenu : false }, this.state, options);
    },
    _toggleNavigation : function(ref, ev) {
        var nav = this.refs[ref];
        if (nav) {
            var node = nav.getDOMNode();
            this._toggleClass(node, 'in');
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _switchSearchBlock : function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        if (!this.isMounted())
            return;
        this.setState(this._newState({
            showSearchMenu : !this.state.showSearchMenu
        }));
    },
    _renderSearchMenuItem : function(){
        var panel = null;
        var className = 'dropdown';
        if (this.state.showSearchMenu) {
            var app = this.getApp();
            panel = (
              <ul className="dropdown-menu dropdown" role="menu">
                  <li>
                      <SearchPanel app={app}></SearchPanel>
                  </li>
              </ul>
            );
            className += ' open';
        }
        return (
        <li className={className} key="search" ref="search">
            <a href="#" className="menu-search icon about dropdown-toggle"
                    onClick={this._switchSearchBlock}>
                <i className="icon icon-search"></i>
                <span className="label">{this._getLabel('topmenu.label.search')}</span>
            </a>
            {panel}
        </li>
        );
    },
  
    _showHeatmap : function(ev) {
        var that= this;
        var app = this.props.app;
        app.map.toggleHeatmapLayer().then(function(){
            that.setState(that._newState());
        });
        ev.stopPropagation();
        ev.preventDefault();
    },
    _renderHeatmapMenuItem : function(){
        var className = 'menu-heatmap';
        var app = this.props.app;
        if (app.map.isHeatmapLayerVisible()) {
            className += ' open';
        }
        return (
            <li>
                <a href="#" className={className} onClick={this._showHeatmap}>
                    <i className="icon icon-heatmap"></i>
                    <span className="label">{this._getLabel('topmenu.label.heatmap')}</span>
                </a>
            </li>
        );
    },
    
    render : function(){
        var app = this.props.app;
        var className = (this.props.className || '') + ' navbar navbar-default';
        return (
             <nav className={className}>
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle"
                          onClick={_.bind(this._toggleNavigation, this, 'navbar')}>
                          <span className="sr-only"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                  </div>
                  <div className="navbar-collapse collapse" ref="navbar">
                    <ul className="nav navbar-nav navbar-right top-navigation">
                        {this._renderHeatmapMenuItem()}
                        {this._renderSearchMenuItem()}
                    </ul>
                  </div>
             </nav>                
        );
    },
});
