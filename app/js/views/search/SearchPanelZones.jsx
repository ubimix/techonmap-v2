/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var ZonesMixin = require('../utils/ZonesMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');
var MenuMixin = require('../utils/MenuMixin.jsx');

module.exports = React.createClass({
    displayName : 'SearchPanelZones',
    mixins : [ AppViewMixin, ZonesMixin, I18NMixin, MenuMixin ],
    _newState : function(options) {
        var app = this.getApp();
        var zones = app.nav.getFilterZones();
        return {
            zones : zones
        };
    },
    _getStore : function() {
        return this.props.app.nav;
    },    
    render : function() {
        var app = this.props.app;
        var zones = app.nav.getZones();
        var array = _.map(zones, function(zone, i) {
            var key = zone.key;
            return this._renderMenuPanel(this._renderZone(zone));
        }, this);
        return this._renderMenuPanelGroup('zones', array);
    }
});
