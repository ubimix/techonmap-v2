/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PanelSizeTracker = require('./utils/PanelSizeTracker');
var MapView = require('./map/MapView.jsx');

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
            <div className={this.props.className}>
                <MapView app={app} className="map" ref="map"/>
            </div>
        );
    }
});
