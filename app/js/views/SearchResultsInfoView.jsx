/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var I18NMixin = require('./utils/I18NMixin');
var AppViewMixin = require('./AppViewMixin');
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
        return (
            <div className={this.props.className}>
                {this._getLabel('search.label.results')}
                <span className="count">
                    {this._getLabel('search.label.results.numbers', 
                            this.state.currentNumber, 
                            this.state.totalNumber)}
                </span>
            </div>
        );
    },

});
