/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var I18NMixin = require('./utils/I18NMixin');
var AppViewMixin = require('./AppViewMixin');

module.exports = React.createClass({
    displayName : 'SearchResultsOrderView',
    
    mixins : [ AppViewMixin, I18NMixin ],

    _getStore : function(){
        return this.props.app.res;
    },
    
    _newState : function(){
        var app = this.getApp();
        var sortByName = app.res.getSortByName();
        var sortByDate = app.res.getSortByDate();
        return {
            sortByName : sortByName,
            sortByDate : sortByDate
        };
    },
    
    render : function() {
        return (
            <ul className="nav nav-tabs">
                <li><span>{this._getLabel('search.label.sort')}</span></li>
                <li className="active"><a href="#">{this._getLabel('search.label.sort.name')}</a></li>
                <li><a href="#">{this._getLabel('search.label.sort.date')}</a></li>
            </ul>
        );
    },

});
