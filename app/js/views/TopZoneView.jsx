/** @jsx React.DOM */

var _ = require('underscore');
var React = require('react');
var DomUtilsMixin = require('./DomUtilsMixin');

module.exports = React.createClass({
    displayName : 'TopZoneView',
    mixins : [ DomUtilsMixin ],
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
    
    render : function() {
        var app = this.props.app;
        return (
          <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" onClick={_.bind(this._toggleNavigation, this, 'navbar')}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Brand</a>
              </div>

              <div className="collapse navbar-collapse" ref="navbar">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" onClick={this._toggleMenu} data-toggle="dropdown">Dropdown <span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                      <li className="divider"></li>
                      <li><a href="#">One more separated link</a></li>
                    </ul>
                  </li>
                </ul>
                <form className="navbar-form navbar-left" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" />
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Link</a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"  onClick={this._toggleMenu} >Dropdown <span className="caret"></span></a>
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
            </div>
          </nav>
        );
    }
});
