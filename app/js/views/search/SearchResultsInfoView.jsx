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

    render : function() {
        var iconClassName = this.props.open
            ? "icon chevron-down"
            : "icon chevron-up";
        return (
            <div className={this.props.className} onClick={this.props.onToggleResults}>
                <span className="count">
                    <span className="current">{this.state.currentNumber}</span>
                    <span className="separator">/</span>
                    <span className="total">{this.state.totalNumber}</span>
                </span>
                <span className="label">{this._getLabel('search.label.results')}</span>
                <a href="#" className="switcher"><i className={iconClassName} /></a>
            </div>
        );
    },

});
