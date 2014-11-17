/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var SearchBoxView = require('./SearchBoxView.jsx');
var PopupPanel = require('./utils/PopupPanel.jsx');

module.exports = React.createClass({
    displayName : 'TopZoneView',
    mixins : [ DomUtils ],
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
    _showInfo : function(){
        var title = (<span>This is a title</span>);
        var body = (<div><p>This is a content</p><p>Second paragraph</p></div>);
        var footer = (<div>Just a message</div>);
        
        PopupPanel.openPopup({
            title : title,
            body : body,
            footer : footer
        });
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
                              <a className="navbar-brand" href="#">Brand</a>
                          </div>
                      </div>
                      <div className="col-xs-6">

                          <ul className="nav navbar-nav navbar-right">
                              <li><a href="#" onClick={this._showInfo}><i className="glyphicon glyphicon-info"></i>&nbsp;Info</a></li>
                              <li className="dropdown">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown"  onClick={this._toggleMenu} >
                                      <i className="glyphicon glyphicon-search"></i>
                                      <span className="caret"></span>
                                  </a>
                                  <ul className="dropdown-menu" role="menu">
                                      <li>
                                          <SearchBoxView app={app} className="navbar-form navbar-left"/>
                                      </li>
                                  </ul>
                              </li>
                          </ul>

                      </div>
                      <div className="col-xs-3">
                          <ul className="nav">
                              <button type="button" className="btn btn-default navbar-btn">Sign in</button>
                          </ul>
                      </div>
                  </div>
              </div>
          </nav>
        );
    }
});