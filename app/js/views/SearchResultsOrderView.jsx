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
                <li>{this._getLabel('search.label.sort')}</li>
                <li className="active"><a href="#">{this._getLabel('search.label.sort.byName')}</a></li>
                <li><a href="#">{this._getLabel('search.label.sort.byDate')}</a></li>
            </ul>
        );
    },

});
