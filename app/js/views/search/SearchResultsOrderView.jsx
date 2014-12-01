/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var I18NMixin = require('../utils/I18NMixin');
var AppViewMixin = require('../AppViewMixin');

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

    _sortByName : function(ev) {
        var app = this.getApp();
        app.res.sortResourcesByName(!(this.state.sortByName > 0));
        ev.preventDefault();
        ev.stopPropagation();
    },
    _sortByDate : function(ev) {
        var app = this.getApp();
        app.res.sortResourcesByDate(!(this.state.sortByDate > 0));
        ev.preventDefault();
        ev.stopPropagation();
    },
    
    _getArrow : function(val){
        if (val === 0)
            return '';
        var className = val > 0 
            ? 'glyphicon glyphicon-arrow-down'
            : 'glyphicon glyphicon-arrow-up';   
        return (<i className={className} />);
    },
    render : function() {
        var nameActive = this.state.sortByName != 0 ? 'active' : '';
        var dateActive = this.state.sortByDate != 0 ? 'active' : '';
        return (
            <ul className="nav nav-tabs">
                <li><span>{this._getLabel('search.label.sort')}</span></li>
                <li className={nameActive}>
                    <a href="#" onClick={this._sortByName}>
                        {this._getLabel('search.label.sort.name')}
                        {this._getArrow(this.state.sortByName)}
                    </a>
                </li>
                <li className={dateActive}>
                    <a href="#" onClick={this._sortByDate}>
                        {this._getLabel('search.label.sort.date')}
                        {this._getArrow(this.state.sortByDate)}
                    </a>
                </li>
            </ul>
        );
    },

});