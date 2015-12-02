/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('../utils/DomUtils');
var SearchPanel = require('./SearchPanel.jsx');
var SearchResultsListView = require('./SearchResultsListView.jsx');
var SearchResultsInfoView = require('./SearchResultsInfoView.jsx');
var SearchResultsOrderView = require('./SearchResultsOrderView.jsx');

module.exports = React.createClass({
    displayName : 'SearchResultsView',
    mixins : [ DomUtils ],
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
    _renderSwitcher : function(){
        var iconClassName = this.state.showList
        ? "chevron chevron-down"
        : "chevron chevron-up";
        return (
            <a href="#" className="switcher"><i className={iconClassName} /></a>
        );
    },
    componentWillMount: function(){
        this._addResizeListener(this._fixResultsListHeight, this);
    },
    componentWillUnmount: function(){
        this._removeResizeListener(this._fixResultsListHeight, this);
    },
    componentDidMount : function(){
        this._fixResultsListHeight();
    },
    componentDidUpdate : function(){
        this._fixResultsListHeight();
    },
    _fixResultsListHeight : function(){
        var containerElm = this.getDOMNode();
        var containerBox = containerElm.getBoundingClientRect();
        
        var topPanelElm = this.refs.topPanel.getDOMNode();
        var topPanelBox = topPanelElm.getBoundingClientRect();

        var bottomPanelElm = this.refs.bottomPanel.getDOMNode();
        var bottomPanelBox = bottomPanelElm.getBoundingClientRect();
        
        var height = (containerBox.bottom - topPanelBox.bottom);

        if (height <= 20) {
            this.listBoxHidden = true;
            bottomPanelElm.style.display = 'none';
            bottomPanelElm.style.height = '0px';
        } else {
            this.listBoxHidden = false;
            bottomPanelElm.style.display = 'block';
            bottomPanelElm.style.height = height + 'px';
        }
    },
    render : function() {
        var app = this.props.app;
        var className = 'search-results';
        if (!this.state.showList){
            className += ' reduced';
        }
        return (
            <div className={className}>
                <div ref="topPanel" className="top-panel">
                    <SearchResultsInfoView
                        app={app}
                        className="stats"
                        onToggleResults={this._toggleList}
                        open={this.state.showList}>
                        {this._renderSwitcher()}
                    </SearchResultsInfoView>
                </div>
                <div ref="bottomPanel" className="bottom-panel">
                    <SearchResultsOrderView app={app} />
                    <SearchPanel app={app} onPanelUpdate={this._fixResultsListHeight.bind(this)} />
                    <SearchResultsListView app={app} ref="searchResultsList"/>
                </div>
            </div>
        );
    },
    _toggleList : function(ev){
        this._updateState({showList : !this.state.showList});
        ev.preventDefault();
        ev.stopPropagation();
    }
    
});
