/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');

module.exports = React.createClass({
    displayName : 'SearchInfoZoneView',
    mixins : [AppViewMixin],
    _newState : function(options){
        var nav = this._getStore();
        var zones = app.nav.getFilterZones();
        return { zones : zones };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    _renderZonesList : function(zones) {
        return _.map(zones, function(zone){
            return <span>{zone}</span>;
        });
    },
    render : function() {
        var app = this.props.app;
        return (
            <span className={this.props.className}>
                {this._renderZonesList(this.state.zones)}
            </span>
        );
    }
});
