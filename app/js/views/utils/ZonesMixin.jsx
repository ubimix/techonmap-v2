/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var ZoneMixin = {
    _selectZone : function(zone, ev) {
        var app = this.props.app;
        app.nav.toggleZones([zone]);
        ev.stopPropagation();
        ev.preventDefault();
    },
    _renderZone : function(zone){
        var app = this.props.app;
        var selected = app.nav.isZoneSelected(zone);
        var zoneLabel = zone.label;
        var className = selected ? 'zone selected' : 'zone';
        return (
            <span
                onClick={_.bind(this._selectZone, this, zone)}
                className={className}>
                <i className={'icon icon-' + zone.icon} />
                <span className='zone-label'>{zoneLabel + ' '}</span>
            </span>
        );
    },
    _renderZoneList : function(zones) {
        var list = _.map(zones, this._renderZone, this);
        if (!list.length) {
            list = [this._getLabel('filter.label.zones.all')];
        }
        return <span className="categories">{list}</span>
    },
};

module.exports = ZoneMixin;