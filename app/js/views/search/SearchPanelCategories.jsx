/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var CategoryMixin = require('../widgets/CategoryMixin);
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchPanelCategories',
    mixins : [ AppViewMixin, CategoryMixin, I18NMixin ],
    _updateStats : function() {
        this.setState(this._newState());
    },
    _getStore : function() {
        return this.props.app.nav;
    },
    render : function() {
        var list = [];
        var currentTags = this.state.stats.tags;
        _.each(currentTags, function(count, tag) {
            list.push({
                tag : tag,
                count : count
            });
        });
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
            <div className="row tags tags-block">
                <div className="col-xs-6">{left}</div>
                <div className="col-xs-6">{right}</div>
            </div>
       );
    }
});
