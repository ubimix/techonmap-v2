/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var LabelsMixin = require('../utils/LabelsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'LabelsSearchPanel',
    mixins : [ AppViewMixin, LabelsMixin, I18NMixin ],
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
        return this.props.app.res;
    },
    _renderLabelsInfo : function(list){
        return _.map(list, function(info) {
            var stats = info.count;
            return (
                <div className="row search-filter-choice">
                    <div className="col-xs-9">
                        {this._renderLabel(info.label)}
                    </div>
                    <div className="col-xs-3">
                        <span className="label label-default pull-right">
                            {stats}
                        </span>
                    </div>
                </div>
            );
        }, this);
    },

    render : function() {
        var list = [];
        var currentLabels = this.state.stats.labels;
        _.each(currentLabels, function(count, label) {
            list.push({
                label : label,
                count : count
            });
        });
        if (!list.length) {
             return (
                 <div className="row">
                     <div className="col-xs-12">
                         {this._getLabel('search.panel.label.labels.none')}
                     </div>
                 </div>
             );
        }

        list = _.sortBy(list, function(info) {
            return -info.count;
        });
        var max = 16;
        max = Math.min(max, list.length);
        list = list.slice(0, max);
        var left = this._renderLabelsInfo(_.filter(list, function(info, i){
            return i < max && ((i % 2) === 0);
        }));
        var right = this._renderLabelsInfo(_.filter(list, function(info, i){
            return i < max && ((i % 2) === 1);
        }));
        return (
            <div className="row">
                <div className="col-xs-6">{left}</div>
                <div className="col-xs-6">{right}</div>
            </div>
       );
    }
});
