/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var TagsMixin = require('../widgets/TagsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchPanelTags',
    mixins : [ AppViewMixin, TagsMixin, I18NMixin ],
    componentWillMount : function() {
        var app = this.props.app;
        app.stats.addChangeListener(this._updateStats, this);
    },
    componentWillUnmount : function() {
        var app = this.props.app;
        app.stats.removeChangeListener(this._updateStats, this);
    },
    _updateStats : function() {
        this.setState(this._newState());
    },
    _newState : function(options) {
        var nav = this._getStore();
        var stats = this.props.app.stats;
        return _.extend({}, this.state, {
            fullStats : stats.getFullStats(),
            stats : stats.getStats()
        });
    },
    _getStore : function() {
        return this.props.app.nav;
    },
    _renderTagsInfo : function(list){
        return _.map(list, function(info) {
            var stats = info.current + ' / ' + info.full;
            return (
                <div className="row">
                    <div className="col-xs-10">
                        {this._renderTag(info.tag)}
                    </div>
                    <div className="col-xs-2">
                        <span className="label label-default pull-right">{stats}</span>
                    </div>
                </div>
            );
        }, this);
    },

    render : function() {
        var list = [];
        var allTags = this.state.fullStats.tags;
        var currentTags = this.state.stats.tags;
        _.each(allTags, function(count, tag) {
            var current = currentTags[tag];
            if (!current)
                return ;
            list.push({
                tag : tag,
                full : count,
                current : current
            });
        });
        list = _.sortBy(list, function(info) {
            return -info.full;
        });
        var max = 15;
            max = Math.min(max, list.length);
        list = list.slice(0, max);
        var left = this._renderTagsInfo(_.filter(list, function(info, i){
            return i < max && ((i % 2) === 0);
        }));
        var right = this._renderTagsInfo(_.filter(list, function(info, i){
            return i < max && ((i % 2) === 1);
        }));
        return (
            <div className="row tags tags-block">
                <div className="col-xs-6">{left}</div>
                <div className="col-xs-6">{right}</div>
            </div>
       );
    }
});
