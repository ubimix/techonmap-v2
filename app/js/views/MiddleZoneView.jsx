/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PanelSizeTracker = require('./utils/PanelSizeTracker');

module.exports = React.createClass({
    displayName : 'MiddleZoneView',
    mixins : [ DomUtils ],
    _onClick : function(ev){
        ev.preventDefault();
        ev.stopPropagation();
    },
    render : function() {
        var app = this.props.app;
        return (
            <PanelSizeTracker container={this}>
                <div>
                    <button className="btn" onClick={this._onClick}>Info</button>
                </div>
            </PanelSizeTracker>
        );
    }
});
