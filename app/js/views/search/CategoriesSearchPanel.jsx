/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var CategoryMixin = require('../utils/CategoryMixin.jsx');
var MenuMixin = require('../utils/MenuMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'CategoriesSearchPanel',
    mixins : [ AppViewMixin, I18NMixin, CategoryMixin, MenuMixin ],
    componentDidMount : function() {
        this.props.app.res.addChangeListener(this._onUpdate);
    },
    componentWillUnmount : function() {
        this.props.app.res.removeChangeListener(this._onUpdate);
    },
    _newState : function(options) {
        var app = this.getApp();
        var stats = this.props.app.stats;
        return _.extend({}, this.state, {
            fullStats : stats.getFullStats().categories,
            stats : stats.getStats().categories
        });
    },
    _getStore : function() {
        return this.props.app.nav;
    },
    render : function() {
        var app = this.props.app;
        var categories = app.nav.getCategories();
        var array = _.map(categories, function(category, i) {
            var key = category.key;
            key = key.toLowerCase();
            var stats = this.state.stats[key] || 0;
            var className = 'label label-default pull-right';
            if (!stats) {
                className += ' label-empty';
            }
            return (
                <div className="row" key={key}>
                    <div className="col-xs-10">
                        {this._renderCategory(category)}
                    </div>
                    <div className="col-xs-2">
                        <span className={className}>{stats}</span>
                    </div>
                </div>
            );
        }, this);
        return this._renderMenuPanelGroup('main', array);
    }
});