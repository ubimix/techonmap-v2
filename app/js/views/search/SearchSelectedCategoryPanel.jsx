/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var TagsMixin = require('../utils/TagsMixin.jsx');
var CategoryMixin = require('../utils/CategoryMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchSelectedCategoryPanel',
    mixins : [ AppViewMixin, TagsMixin, CategoryMixin, I18NMixin ],
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
        var stats = this.props.app.stats;
        var nav = this._getStore();
        var category = nav.getFilterCategory();
        var filterCategoryTags = nav.getCategoryTags(category);
        var fullStats = stats.getFullStats();
        
        // Statistics for tags associated with selected categories
        var filterStats = {};
        var stats = stats.getStats();
        var restStats = {};
        var tagStats = fullStats.tags;
        _.each(filterCategoryTags, function(tag) {
            filterStats[tag] = tagStats[tag] || 0;
        });
        _.each(stats.tags, function(count, tag) {
            if (!_.has(filterStats, tag)) {
                restStats[tag] = count;
            }
        });
        return _.extend({}, this.state, {
            category : category,
            fullStats : fullStats,
            stats : restStats,
            filterStats : filterStats
        });
    },
    _getStore : function() {
        return this.props.app.nav;
    },
    _renderTagsInfo : function(list){
        return _.map(list, function(info) {
            var stats = info.count;
            return (
                <div className="row" key={info.tag}>
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

    _renderTagStats : function(currentTags) {
        var list = [];
        _.each(currentTags, function(count, tag) {
            list.push({
                tag : tag,
                count : count
            });
        });
        if (!list.length)
            return null;
        list = _.sortBy(list, function(info) {
            return -info.count;
        });
        var max = 16;
        max = Math.min(max, list.length);
        list = list.slice(0, max);
        var left = this._renderTagsInfo(_.filter(list, function(info, i){
            return i < max && ((i % 2) === 0);
        }));
        var right = this._renderTagsInfo(_.filter(list, function(info, i){
            return i < max && ((i % 2) === 1);
        }));
        return (
            <div className="row tags">
                <div className="col-xs-6">{left}</div>
                <div className="col-xs-6">{right}</div>
            </div>
       );
    },
    _renderCategoryLabel : function(category){
        return category
    },
    _onExit : function(category, ev){
        if (this.props.onExit) {
            this.props.onExit(ev);
        }
    },
    render : function() {
        if (!this.state.category) {
            return <div />;
        }
        var list = [];
        var otherTags = this._renderTagStats(this.state.stats);
        if (otherTags) {
            list.push(<hr />);
            list.push(otherTags);
        }
        return (
            <div>
                <div>{this._renderCategory(this.state.category, { onClick : this._onExit })}</div>
                {this._renderTagStats(this.state.filterStats)}
                {list}
            </div>
        );
    }
});
