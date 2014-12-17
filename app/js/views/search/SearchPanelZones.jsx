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
    componentDidMount : function() {
        this.props.app.res.addChangeListener(this._onUpdate);
    },
    componentWillUnmount : function() {
        this.props.app.res.removeChangeListener(this._onUpdate);
    },
    _newState : function(options) {
        var app = this.getApp();
        var zones = app.nav.getFilterZones();
        var stats = this.props.app.stats;
        return _.extend({}, this.state, {
            zones : zones,
            fullStats : stats.getFullStats().zones,
            stats : stats.getStats().zones
        });
    },
    _getStore : function() {
        return this.props.app.nav;
    },
    render : function() {
        var app = this.props.app;
        var zones = app.nav.getZones();
        var array = _.map(zones, function(zone, i) {
            var key = zone.key;
            var stats = this.state.stats[key] || 0;
            var className = 'label label-default pull-right';
            if (!stats) {
                className += ' label-empty';
            }
            return (
                <div className="row" key={key}>
                    <div className="col-xs-10">
                        {this._renderZone(zone)}
                    </div>
                    <div className="col-xs-2">
                        <span className={className}>{stats}</span>
                    </div>
                </div>
            );
        }, this);
        return this._renderMenuPanelGroup('zones', array);
    }
});
