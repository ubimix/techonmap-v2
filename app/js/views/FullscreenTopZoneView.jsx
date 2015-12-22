var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');
var ContentPopupMixin = require('./utils/ContentPopupMixin');
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
    componentWillMount : function() {
        this._checkUserState();
    },
    componentDidMount : function(){
        document.addEventListener('click', this._closeOpenSearchBlock, true);
    },
    componentWillUnmount : function(){
        document.removeEventListener('click', this._closeOpenSearchBlock, true);
        var app = this.getApp();
        app.user.removeChangeListener(this._onUserChange);
    },
    getInitialState : function(){
        return this._newState();
    },
    _newState : function(options){
        return _.extend({ showSearchMenu : false,  user : null }, this.state, options);
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
        var footer = (
            <div>
                {this._getLabel('dialog.help.msg.contact')}
                <button type="button" className="btn btn-primary"
                       onClick={this._showFeedbackPopup}>
                    {this._getLabel('dialog.help.btn.contact')}
                </button>
            </div>
        );
        var that = this;
        that._showContentDialog({ 
            url: 'about.md',
            footer : footer,
            onOpen : function(dialog) {
                var node = dialog.getDOMNode();
                DomUtils.select(node, '[data-action="inscription"]', function(ref) {
                    ref.addEventListener('click', function(ev){
                        PopupPanel.closePopup();
                        that._onClickAdd(ev);
                    });
                });
            },
            onClose : function(dialog){
            }
        });
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
    _closeOpenSearchBlock : function(ev) {
        if (!this.refs.search)
            return ;
        var elm = ev.target;
        var searchBlock = this.refs.search.getDOMNode();
        if (!DomUtils._hasParent(elm, searchBlock)) {
            this.setState(this._newState({
                showSearchMenu : false
            }));
        }
    },
    _onClickAdd : function(ev) {
        var editPopup = new EditEntityPopup({
           app : this.props.app
        });
        editPopup.open();
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
    _renderAboutMenuItem : function(){
        return (
        <li className="menu-btn" ref="about" onClick={this._showAboutInfo}>
            <a href="#" className="menu-info">
                <i className="icon icon-toolbar-info"></i>
                <span className="label">{this._getLabel('topmenu.label.about')}</span>
            </a>
        </li>
        );
    },
    _showHelp : function(ev){
      var footer = (
          <div>
              {this._getLabel('dialog.help.msg.contact')}
              <button type="button" className="btn btn-primary"
                      onClick={this._showFeedbackPopup}>
                  {this._getLabel('dialog.help.btn.contact')}
              </button>
          </div>
      );
      this._showContentDialog({
          url : 'help.md',
          footer : footer,
          onOpen : function(dialog) {
              var node = dialog.getDOMNode();
              var articles = [];
              DomUtils.select(node, 'article', function(article){
                  articles.push(article);
                  DomUtils.select(article, 'h2', function(header){
                      header.addEventListener('click', function(){
                          _.each(articles, function(a) {
                              if (a === article) {
                                  DomUtils._toggleClass(article, 'open');
                              } else {
                                  DomUtils._removeClass(a, 'open');
                              }
                          });
                      });
                  });
              });
          },
          onClose : function(dialog){
              console.log('CLOSE!', dialog);
          }
      });
      ev.stopPropagation();
      ev.preventDefault();
  },

  _showFeedbackPopup : function(ev){
      PopupPanel.closePopup();
      var feedbackPopup = new FeedbackPopup({
          app : this.props.app
      });
      feedbackPopup.open();
      ev.stopPropagation();
      ev.preventDefault();
  },
    _renderHelpMenuItem : function(){
        return (
            <li className="menu-btn" key="help" onClick={this._showHelp}>
                <a href="#" className="menu-faq">
                    <i className="icon icon-toolbar-faq"></i>
                    <span className="label">{this._getLabel('topmenu.label.help')}</span>
                </a>
            </li>
        );
    },
    _renderShareMenuItem : function(){
        return (
            <li className="menu-btn" key="share" onClick={this._showShareDialog}>
                <a href="#" className="menu-share">
                    <i className="icon icon-toolbar-share"></i>
                    <span className="label">{this._getLabel('topmenu.label.share')}</span>
                </a>
            </li>
        );
    },
    _renderExportMenuItem : function(){
        return (
            <li className="menu-btn" key="export" onClick={this._showExportDialog}>
                <a href="#" className="menu-export">
                    <i className="icon icon-toolbar-export"></i>
                    <span className="label">{this._getLabel('topmenu.label.export')}</span>
                </a>
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
            <li className="menu-btn" onClick={this._showHeatmap}>
                <a href="#" className={className}>
                    <i className="icon icon-toolbar-heatmap"></i>
                    <span className="label">{this._getLabel('topmenu.label.heatmap')}</span>
                </a>
            </li>
        );
    },

    _renderAddAction : function() {
      var mobileMode = this.props.app.ui.isMobileMode();
      if (mobileMode)
        return;
      return (
        <ul className="nav navbar-nav navbar-right top-navigation top-navigation-add">
          <li className="menu-btn menu-add" key="add" onClick={this._onClickAdd}>
              <a href="#" className="menu-add">
                  <i className="icon icon-toolbar-add"></i>
                  <span className="label">Ajouter</span>
              </a>
          </li>
        </ul>
        );

    },

    _renderConnectionAction : function() {
      var mobileMode = this.props.app.ui.isMobileMode();
      if (mobileMode)
        return;
      var app = this.props.app;
      var user =  app.user.getUserInfo();
      console.log('>> USER:', user);
      var label = 'Déconnexion';
      var liClasses = 'menu-btn menu-profile';
      var ulClasses = 'nav navbar-nav navbar-right top-navigation top-navigation-add';
      var onClick = this.logout;
      if (!user) {
        label = 'Connexion';
        ulClasses = 'nav navbar-nav navbar-right top-navigation';
        liClasses = 'menu-btn menu-profile off';
        onClick = this._onClickAdd;
      }
      return (
        <ul className={ulClasses}>
          <li className={liClasses} key="profile" onClick={onClick}>
              <a href="#" className="menu-profile">
                  <i className="icon icon-toolbar-profile"></i>
                  <span className="label">{label}</span>
              </a>
          </li>
        </ul>
        );

    },

    _checkUserState : function() {
        var app = this.props.app;
        var that = this;
        app.user.addChangeListener(this._onUserChange);
        app.user.loadUserInfo().then(function(user) {
          that.setState({user : user});
        });
    },

    logout : function() {
        var app = this.props.app;
        var that = this;
        app.user.logout().then(function(obj){
        	that.setState({user : null});
         });
    },

    _onUserChange : function() {
        this._checkUserState();
    },

    render : function(){
        var app = this.props.app;
        var className = (this.props.className || '') + ' navbar navbar-default';
        return (
             <nav className={className}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle"
                            onClick={_.bind(this._toggleNavigation, this, 'navbar')}>
                            <span className="sr-only"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">
                            <img src="images/afrique-numerique-logo-03.svg" />
                        </a>
                    </div>
                    <div className="navbar-collapse collapse" ref="navbar">
                      {this._renderConnectionAction()}
                      {this._renderAddAction()}
                      <ul className="nav navbar-nav navbar-right top-navigation">
                          {this._renderAboutMenuItem()}
                          {this._renderHelpMenuItem()}
                          {this._renderShareMenuItem()}
                          {this._renderExportMenuItem()}
                          {this._renderHeatmapMenuItem()}
                      </ul>
                    </div>
                  </div>
              </div>
          </nav>
        );
    },
});
