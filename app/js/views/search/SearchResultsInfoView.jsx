/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var I18NMixin = require('../utils/I18NMixin');
var AppViewMixin = require('../AppViewMixin');

module.exports = React.createClass({
    displayName : 'SearchResultsInfoView',
    
    mixins : [ AppViewMixin, I18NMixin ],

    _getStore : function(){
        return this.props.app.res;
    },
    
    _newState : function(){
        var app = this.getApp();
        return {
            currentNumber : app.res.getResourceNumber(),
            totalNumber : app.res.getTotalResourceNumber()
        };
    },

    _renderSwitcher : function(){
        var iconClassName = this.props.open
        ? "chevron chevron-down"
        : "chevron chevron-up";
        return (
            <a href="#" className="switcher"><i className={iconClassName} /></a>
        );
    },
    render : function() {
        return (
            <div className="search-result-stats" onClick={this.props.onToggleResults}>
                <span className="label">{this._getLabel('search.label.results')}</span>
                <span className="count">
                    <span className="current">{this.state.currentNumber}</span>
                    <span className="separator">/</span>
                    <span className="total">{this.state.totalNumber}</span>
                </span>
                {this._renderSwitcher()}
            </div>
        );
    },

});
