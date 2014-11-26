/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('../utils/DomUtils');
var SearchResultsListView = require('./SearchResultsListView.jsx');
var SearchResultsInfoView = require('./SearchResultsInfoView.jsx');
var SearchResultsOrderView = require('./SearchResultsOrderView.jsx');

module.exports = React.createClass({
    displayName : 'SearchResultsView',
    getInitialState : function(){
        return this._newState();
    },
    _newState : function(options){
        return _.extend({
            showList : true
        }, this.state, options);
    },
    _updateState : function(options){
        this.setState(this._newState(options));
    },
    render : function() {
        var app = this.props.app;
        var className = 'search-results dropdown-menu';
        if (!this.state.showList){
            className += ' reduced';
        }
        return (
            <div className={className}>
                <SearchResultsInfoView
                    app={app}
                    className="stats"
                    onToggleResults={this._toggleList}
                    open={this.state.showList} />
                <SearchResultsOrderView app={app} />
                <SearchResultsListView app={app} />
            </div>
        );
    },
    _toggleList : function(ev){
        this._updateState({showList : !this.state.showList});
        ev.preventDefault();
        ev.stopPropagation();
    }
    
});
