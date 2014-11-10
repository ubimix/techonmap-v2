/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtilsMixin = require('./DomUtilsMixin');

module.exports = React.createClass({
    displayName : 'MiddleZoneView',
    mixins : [ DomUtilsMixin ],
    _onClick : function(ev){
        console.log('I AM CLICKED');
        ev.preventDefault();
        ev.stopPropagation();
    },
    render : function() {
        var app = this.props.app;
        return (
            <button className="btn" onClick={this._onClick}>Info</button>
        );
    }
});
