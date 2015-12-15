/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var ZoneMixin = {
    _selectZone : function(zone, ev) {
        var app = this.props.app;
        if (app.ui.canChangeSearchQueries()) {
            app.res.toggleZones([zone]);
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _renderZone : function(zone){
        var zoneLabel = zone.properties.label;
        if (!zoneLabel) return ;
        var app = this.props.app;
        var selected = app.res.isFilteredByZone(zone);
        var className = selected ? 'zone selected' : 'zone';
        var zoneKey = app.res.getZoneKey(zone);
        return (
            <span
                onClick={_.bind(this._selectZone, this, zone)}
                className={className} key={zoneKey}>
                <i className={'icon ' + zone.properties.icon} />
                <span className='zone-label'>{zoneLabel + ' '}</span>
            </span>
        );
    },
    _renderZoneList : function(zones) {
        var list = [];
        _.each(zones, function(zone){
            var zoneView = this._renderZone(zone);
            if (zoneView) {
                list.push(zoneView);
            }
        }, this);
        if (!list.length) {
            list = [
                <span className="zone none">
                    <span className="zone-label">
                        {this._getLabel('filter.label.zones.all')}
                    </span>
                </span>
            ];
        }
        return <span className="zones zones-inline" key="zone-list">{list}</span>
    },
};

module.exports = ZoneMixin;