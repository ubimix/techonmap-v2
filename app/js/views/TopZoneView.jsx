/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PopupPanel = require('./utils/PopupPanel.jsx');
var I18NMixin = require('./utils/I18NMixin');

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
    _showInfo : function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        var title = (<span>This is a title</span>);
        var body = (<div><p>This is a content</p><p>Second paragraph</p></div>);
        var footer = (<div>Just a message</div>);
        PopupPanel.openPopup({
            title : title,
            body : body,
            footer : footer
        });
    },
    _showAboutInfo : function(ev){
        console.log('About...');
        ev.stopPropagation();
        ev.preventDefault();
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
                              <li><a href="#" onClick={this._showInfo}><i className="glyphicon glyphicon-info"></i>&nbsp;Info</a></li>
                              <li>
                                  <a href="#" onClick={this._showAboutInfo}>
                                      <i className="icon icon-about"></i>
                                      <span className="label">{this._getLabel('topmenu.label.about')}</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="icon about" onClick={this._showAboutInfo}>
                                      <span className="label">{this._getLabel('topmenu.label.about')}</span>
                                  </a>
                              </li>
                              <li className="dropdown open">
                                  <a href="#" className="icon about dropdown-toggle" onClick={this._showAboutInfo}>
                                      <span className="label">{this._getLabel('topmenu.label.about')}</span>
                                  </a>
                                  <ul className="dropdown-menu" role="menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
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
