/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var ZonesMixin = require('../utils/ZonesMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');
var MenuMixin = require('../utils/MenuMixin.jsx');

module.exports = React.createClass({
    displayName : 'ZonesSearchFormPanel',
    mixins : [ AppViewMixin, ZonesMixin, I18NMixin, MenuMixin ],
    componentDidMount : function() {
        this.props.app.res.addChangeListener(this._onUpdate);
    },
    componentWillUnmount : function() {
        this.props.app.res.removeChangeListener(this._onUpdate);
    },
    _newState : function(options) {
        var app = this.getApp();
        var zones = app.res.getFilterZones();
        var stats = this.props.app.stats;
        return _.extend({}, this.state, {
            zones : zones,
            fullStats : stats.getFullStats().zones,
            stats : stats.getStats().zones
        });
    },
    _getStore : function() {
        return this.props.app.res;
    },
    render : function() {
        var app = this.props.app;
        var zones = app.res.getZones();
        var array = [];
        _.each(zones, function(zone, i) {
            var zoneView = this._renderZone(zone);
            if (!zoneView)
                return ;
            var key = app.res.getZoneKey(zone);
            var stats = this.state.stats[key] || 0;
            var className = 'label label-default pull-right';
            if (!stats) {
                className += ' label-empty';
            }
            array.push(
                <div className="row search-filter-choice" key={key}>
                    <div className="col-xs-10">
                        <a href="#">{zoneView}</a>
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
