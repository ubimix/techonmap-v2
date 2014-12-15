/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');
var ContentPopupMixin = require('./utils/ContentPopupMixin');
var SearchPanel = require('./search/SearchPanel.jsx');
var SharePopup = require('./dialogs/SharePopup.jsx');
var ExportPopup = require('./dialogs/ExportPopup.jsx');

module.exports = React.createClass({
    displayName : 'TopZoneView',
    mixins : [ DomUtils, I18NMixin, ContentPopupMixin ],
    getApp : function(){
        return this.props.app;
    },
    componentDidMount : function(){
        document.addEventListener('click', this._closeOpenSearchBlock, true);  
    },
    componentWillUnmount : function(){
        document.removeEventListener('click', this._closeOpenSearchBlock, true);  
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
    _showAboutInfo : function(ev){
        this._showContentDialog('about.md');
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showHelp : function(ev){
        this._showContentDialog('help.md');
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showShareDialog : function(ev){
        var sharePopup = new SharePopup({
            app : this.props.app
        });
        sharePopup.open();
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showExportDialog : function(ev) {
        var exportPopup = new ExportPopup({
            app : this.props.app
        });
        exportPopup.open();
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showHeatmap : function(ev) {
        var app = this.props.app;
        app.map.toggleHeatmapLayer();
        ev.stopPropagation();
        ev.preventDefault();
    },
    _switchSearchBlock : function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        if (!this.isMounted())
            return;
        var elm = this.refs.search.getDOMNode();
        if (elm) {
            DomUtils._toggleClass(elm, 'open');
        }
    },
    _closeOpenSearchBlock : function(ev) {
        var elm = ev.target;
        var searchBlock = this.refs.search.getDOMNode();
        if (!DomUtils._hasParent(elm, searchBlock) &&
                DomUtils._hasClass(searchBlock, 'open')) {
            DomUtils._toggleClass(searchBlock, 'open');
        }
    },
    render : function() {       
        var app = this.props.app;
        var className = this.props.className + " navbar navbar-default";
        return (
            <nav className={className} role="navigation">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-xs-3">
                          <div className="navbar-header">
                              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" onClick={_.bind(this._toggleNavigation, this, 'navbar')}>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                              </button>
                              <a className="navbar-brand" href="#"><img src="images/banner.png" /></a>
                          </div>
                      </div>
                      <div className="col-xs-6">
                          <ul className="nav navbar-nav navbar-right">
                              <li>
                                  <a href="#" className="menu-info" onClick={this._showAboutInfo}>
                                      <i className="icon icon-info"></i>
                                      <span className="label">{this._getLabel('topmenu.label.about')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="menu-faq" onClick={this._showHelp}>
                                      <i className="icon icon-faq"></i>
                                      <span className="label">{this._getLabel('topmenu.label.help')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="menu-share" onClick={this._showShareDialog}>
                                      <i className="icon icon-share"></i>
                                      <span className="label">{this._getLabel('topmenu.label.share')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="menu-export" onClick={this._showExportDialog}>
                                      <i className="icon icon-export"></i>
                                      <span className="label">{this._getLabel('topmenu.label.export')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="menu-heatmap" onClick={this._showHeatmap}>
                                      <i className="icon icon-heatmap"></i>
                                      <span className="label">{this._getLabel('topmenu.label.heatmap')}</span>
                                  </a>
                              </li>
                              <li className="dropdown" ref="search">
                                  <a href="#" className="menu-search icon about dropdown-toggle" onClick={this._switchSearchBlock}>
                                      <i className="icon icon-search"></i>
                                      <span className="label">{this._getLabel('topmenu.label.search')}</span>
                                  </a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <SearchPanel app={app} />
                                    </li>
                                  </ul>
                              </li>
                          </ul>
                      </div>
                      <div className="col-xs-3">
                          <div className="navbar-form navbar-right">
                              <div className="btn-group">
                                  <button type="button" className="btn btn-primary">{this._getLabel('topmenu.btn.add')}</button>
                                  <button type="button" className="btn btn-primary btn-add"></button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
        );
    }
});
