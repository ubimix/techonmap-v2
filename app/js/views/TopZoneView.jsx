/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PopupPanel = require('./utils/PopupPanel.jsx');
var I18NMixin = require('./utils/I18NMixin');
var MenuMixin = require('./utils/MenuMixin.jsx');
var SearchCategoriesView = require('./search/SearchCategoriesView.jsx');
var SearchInputBoxView = require('./search/SearchInputBoxView.jsx');
var SearchInfoZoneView = require('./search/SearchInfoZoneView.jsx');
var SearchInfoTagsView = require('./search/SearchInfoTagsView.jsx');
var SearchPanelTags = require('./search/SearchPanelTags.jsx');
var SearchInfoCategoriesView = require('./search/SearchInfoCategoriesView.jsx');

var SearchPanel = React.createClass({
    displayName : 'SearchPanel',
    mixins : [ DomUtils, I18NMixin, MenuMixin ],
    componentDidMount : function(){
        this._toggleMenuPanel('main');
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
        return this._renderMenuPanels(
            this._renderMainPanel(),
            this._renderZonesPanel(),
            this._renderCategoriesPanel(),
            this._renderTagsPanel());
    },
    _renderZonesPanel : function(){
        return this._renderMenuPanelGroup('zones',
                this._renderMenuReturnRef(),
                'Zones panels');
    },
    _renderTagsPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('tags',
                this._renderMenuReturnRef(),
                <SearchPanelTags app={app} />);
    },
    _renderCategoriesPanel : function(){
        var app = this.getApp();
        return this._renderMenuPanelGroup('categories',
                this._renderMenuReturnRef(),
                <SearchCategoriesView app={app}/>);
    },
    _renderMainPanel : function(){
        var app = this.props.app;
        return this._renderMenuPanelGroup(
           'main', 
           this._renderMenuPanel(
               <h3 className="panel-title">
                   {this._getLabel('search.panel.label.input')}
               </h3>, 
               <SearchInputBoxView app={app}/>
           ), 
           this._renderMenuPanel(
               <h3 className="panel-title">
                   {this._getLabel('search.panel.label.filters')}
               </h3>,
               this._renderMenuItems(
                   this._renderMenuRef(
                           'search.panel.label.zones',
                           'zones',
                           <SearchInfoZoneView app={app} />),
                   this._renderMenuRef(
                           'search.panel.label.categories',
                           'categories',
                           <SearchInfoCategoriesView app={app} />),
                   this._renderMenuRef(
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
                              <li className="dropdown">
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
