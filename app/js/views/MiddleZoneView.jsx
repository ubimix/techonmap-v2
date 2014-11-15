/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PanelSizeTracker = require('./utils/PanelSizeTracker');
var MapView = require('./map/MapView.jsx');
var ListView = require('./list/ListView.jsx');

module.exports = React.createClass({
    displayName : 'MiddleZoneView',
    mixins : [ DomUtils ],
    _onClick : function(ev){
        ev.preventDefault();
        ev.stopPropagation();
    },
    // < MapView app={app} className="map"/ >
    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>
                <div className="map" style={{backgroundColor: '#eee'}}></div>
                <div className="search-results" style={{backgroundColor: 'green'}}>
                    <ListView app={app} />
                </div>
            </div>
        );
    }
});
