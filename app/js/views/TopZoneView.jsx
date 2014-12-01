/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PopupPanel = require('./utils/PopupPanel.jsx');
var I18NMixin = require('./utils/I18NMixin');
var SearchCategoriesView = require('./search/SearchCategoriesView.jsx');
var SearchInputBoxView = require('./search/SearchInputBoxView.jsx');
var SearchInfoZoneView = require('./search/SearchInfoZoneView.jsx');
var SearchInfoTagsView = require('./search/SearchInfoTagsView.jsx');
var SearchInfoCategoriesView = require('./search/SearchInfoCategoriesView.jsx');
var PanelSwitcher = require('./PanelSwitcher');

var SearchPanel = React.createClass({
    displayName : 'SearchPanel',
    mixins : [ DomUtils, I18NMixin ],
    componentDidMount : function(){
        this._togglePanel('main');
    },
    activate : function(key) {
        this.setState(this._newState({
            active: key
        }));
    },
    getApp : function(){
        return this.props.app;
    },
    render : function(){
        return (
          <PanelSwitcher className="container search-menu" ref="panels">
              {this._renderMainPanel()}
              {this._renderZonesPanel()}
              {this._renderCategoriesPanel()}
              {this._renderTagsPanel()}
          </PanelSwitcher>
         );
    },
    _togglePanel : function(panelKey, ev) {
        this.refs.panels.activate(panelKey);
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    },
    _renderButtons : function(){
        return (        
                <ul className="list-group">
                {_.map(arguments, function(val) {
                    return <li className="list-group-item">{val}</li>
                })}
                </ul>
        );
    },
    _renderReturnButton : function(){
        return this._renderButtons(
            <a href="#" className="return" onClick={_.bind(this._togglePanel, this, 'main')}>
                <i className="glyphicon glyphicon-chevron-left pull-left"/>
                {this._getLabel('search.panel.button.return')}
            </a>
        );
    },

    _renderPanel : function(){
        var args = _.toArray(arguments);
        var title = args[0];
        args.splice(0, 1);
        var valBlock = args.length 
            ? <div className="panel-body">{args}</div> : null; 
        return (
             <div className="panel">
                 <div className="panel-heading">
                     <h3 className="panel-title">
                         {title}
                     </h3>
                 </div>
                 {valBlock}
             </div>
        );
    },
    _renderPanelGroup : function(){
        var args = _.toArray(arguments);
        var ref = args[0];
        args.splice(0, 1);
        return (<div className="panel-group" ref={ref}>{args}</div>);
    },
    _renderStats : function(labelKey, panelKey, view) {
        return (
           <a href="#" onClick={_.bind(this._togglePanel, this, panelKey)}>
               <i className="glyphicon glyphicon-chevron-right pull-right"/>
               {this._getLabel(labelKey)}
               {view}
           </a>
        );
    },
    _renderZonesPanel : function(){
        return this._renderPanelGroup('zones', this._renderReturnButton(), 'Zones panels');
    },
    _renderTagsPanel : function(){
        return this._renderPanelGroup('tags', this._renderReturnButton(), 'Tags panel');
    },
    _renderCategoriesPanel : function(){
        return this._renderPanelGroup('categories', this._renderReturnButton(), 'MLKJL');
    },
    _renderMainPanel : function(){
        var app = this.props.app;
        return this._renderPanelGroup(
           'main', 
           this._renderPanel(
               this._getLabel('search.panel.label.input'), 
               <SearchInputBoxView app={app}/>
           ), 
           this._renderPanel(
               this._getLabel('search.panel.label.filters'),
               this._renderButtons(
                   this._renderStats(
                           'search.panel.label.zones',
                           'zones',
                           <SearchInfoZoneView app={app} />),
                   this._renderStats(
                           'search.panel.label.categories',
                           'categories',
                           <SearchInfoCategoriesView app={app} />),
                   this._renderStats(
                           'search.panel.label.tags',
                           'tags',
                           <SearchInfoTagsView app={app} />)
               )
           )
        );
    },
    
});


module.exports = React.createClass({
    displayName : 'TopZoneView',
    mixins : [ DomUtils, I18NMixin ],
    getApp : function(){
        return this.props.app;
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
    _toggleMenu : function(ev) {
        var node = ev.target;
        while (node) {
            if (this._hasClass(node, 'dropdown'))
                break;
            node = node.parentNode;
        }
        if (node) {
            this._toggleClass(node, 'open');
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showContentDialog : function(href) {
        var app = this.getApp();
        app.content.loadContent(href).then(function(obj){
            var title = obj.getAsHtml('title');
            var content = obj.getContentAsHtml();
            var footer = obj.getAsHtml('footer');
            var titleElm = (<span dangerouslySetInnerHTML={{__html: title}} ></span>);
            var bodyElm = (<div dangerouslySetInnerHTML={{__html: content}} ></div>);
            var footerElm = (<div dangerouslySetInnerHTML={{__html: footer}} ></div>);
            PopupPanel.openPopup({
                title : titleElm,
                body : bodyElm,
                footer : footerElm
            });
        });
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
        this._showContentDialog('share.md');
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showExportDialog : function(ev) {
        this._showContentDialog('export.md');
        ev.stopPropagation();
        ev.preventDefault();
    },
    _showHeatmap : function(ev) {
        console.log('Show/hide heatmap...');
        ev.stopPropagation();
        ev.preventDefault();
    },
    _switchSearchBlock : function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        var elm = DomUtils._searchParent(ev.target, 'dropdown');
        if (elm) {
            DomUtils._toggleClass(elm, 'open');
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
                                <span className="sr-only">Toggle navigation</span>
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
                                  <a href="#" onClick={this._showAboutInfo}>
                                      <i className="icon icon-info"></i>
                                      <span className="label">{this._getLabel('topmenu.label.about')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" onClick={this._showHelp}>
                                      <i className="icon icon-about"></i>
                                      <span className="label">{this._getLabel('topmenu.label.help')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" onClick={this._showShareDialog}>
                                      <i className="icon icon-share"></i>
                                      <span className="label">{this._getLabel('topmenu.label.share')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" onClick={this._showExportDialog}>
                                      <i className="icon icon-export"></i>
                                      <span className="label">{this._getLabel('topmenu.label.export')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" onClick={this._showHeatmap}>
                                      <i className="icon icon-heatmap"></i>
                                      <span className="label">{this._getLabel('topmenu.label.heatmap')}</span>
                                  </a>
                              </li>
                              <li className="dropdown">
                                  <a href="#" className="icon about dropdown-toggle" onClick={this._switchSearchBlock}>
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
                                  <button type="button" className="btn btn-primary dropdown-toggle">
                                      <span className="caret"></span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
        );
    }
});
