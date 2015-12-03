/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var MapView = require('./map/MapView.jsx');
var LeftToolbar = require('./LeftToolbar.jsx');
var SearchPanel = require('./search/SearchPanel.jsx');

module.exports = React.createClass({
    displayName : 'FullscreenMiddleZoneView',
    mixins : [ DomUtils ],
    _onClick : function(ev){
        ev.preventDefault();
        ev.stopPropagation();
    },
    componentWillMount : function(){
        this._updateMapViewport = _.debounce(this._updateMapViewport, 100);  
        this._addResizeListener(this._updateMapViewport, this);
    },
    componentDidMount : function(){
        this._updateMapViewport();
    },
    componentDidUpdate : function(){
        this._updateMapViewport();
    },
    componentWillUnmount : function(){
        this._removeResizeListener(this._updateMapViewport, this);
    },
    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>
                <LeftToolbar app={app} className="toolbar" />
                <MapView app={app} className="map" ref="map" />
                <SearchPanel app={app} ref="searchPanel" />
            </div>
        );
    },

    _updateMapViewport : function(){
        var mapPanel = this.refs.map;
        if (!mapPanel || !this.isMounted())
            return ;
        
        var mapPanelElm = mapPanel.getDOMNode();
        var mapPanelBox = mapPanelElm.getBoundingClientRect();
        
        var searchPanel = this.refs.searchPanel;
        var searchPanelElm = searchPanel.getDOMNode();
        var searchPanelBox = searchPanelElm.getBoundingClientRect();
        
        var topLeft = [0, 0];
        var bottomRight = [searchPanelBox.left - mapPanelBox.left, 
                           mapPanelBox.bottom - mapPanelBox.top];
        var focusPos = [bottomRight[0] / 2, bottomRight[1] * 3 / 4];
        this.refs.map.setViewport(topLeft, bottomRight, focusPos);
    }
});
