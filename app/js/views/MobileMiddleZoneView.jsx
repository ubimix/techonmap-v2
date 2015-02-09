/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var PanelSizeTracker = require('./utils/PanelSizeTracker');
var MapView = require('./map/MapView.jsx');
var LeftToolbar = require('./LeftToolbar.jsx');
var I18NMixin = require('./utils/I18NMixin');
var SearchResultsListView = require('./search/SearchResultsListView.jsx');
var SearchResultsInfoView = require('./search/SearchResultsInfoView.jsx');
var SearchResultsOrderView = require('./search/SearchResultsOrderView.jsx');
var SearchPanel = require('./search/SearchPanel.jsx');
var ViewActivationMixin = require('./utils/ViewActivationMixin');

module.exports = React.createClass({
    displayName : 'MobileMiddleZoneView',
    mixins : [ DomUtils, ViewActivationMixin, I18NMixin ],
    _onClick : function(ev){
        ev.preventDefault();
        ev.stopPropagation();
    },
    getApp : function() {
        return this.props.app;
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

    _checkActiveView : function(key) {
        var app = this.props.app;
        var activeKey = app.ui.getFocusedViewKey();
        return key === activeKey;
    },
    
    _renderSearchFormView : function(){
        if (!this._checkActiveView('search'))
            return ;
        var app = this.props.app;
        return (
            <SearchPanel app={app}>
                <hr />
                <SearchResultsInfoView app={app}/>
                <div className="row">
                    <div className="col-xs-6 col-md-offset-1 col-md-3">
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-lg btn-primary menu-list"
                                    onClick={this._activateView.bind(this, 'list')}>
                                    {this._getLabel("filter.label.btn.list") + ' '}
                                    <i className="icon icon-list"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-offset-3 col-md-3">
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-lg btn-primary menu-map"
                                    onClick={this._activateView.bind(this, 'map')}>
                                    {this._getLabel("filter.label.btn.map") + ' '}
                                    <i className="icon icon-map"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SearchPanel>
        );
    },

    _renderSearchResultsView : function(){
        if (!this._checkActiveView('list'))
            return ;
        var app = this.props.app;
        return (
            <div className="search-results">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4">
                            <SearchResultsInfoView app={app} className="stats" 
                                open={true} />
                        </div>
                        <div className="col-sm-8">
                            <SearchResultsOrderView app={app} />
                        </div>
                    </div>
                </div>
                <SearchResultsListView app={app} />
            </div>
        );
    },

    _renderMapView : function(){
        if (!this._checkActiveView('map'))
            return ;
        var app = this.props.app;
        return (<MapView app={app} className="map" ref="map" />);
    },
    _renderMapToolbarView : function(){
        if (!this._checkActiveView('map'))
            return ;
        var app = this.props.app;
        return (<LeftToolbar app={app} className="toolbar" />);
    },

    render : function() {
        var app = this.props.app;
        var viewKey = app.ui.getFocusedViewKey();
        return (
            <div className={this.props.className}>
                {this._renderSearchFormView()}
                {this._renderSearchResultsView()}
                {this._renderMapToolbarView()}
                {this._renderMapView()}
            </div>
        );
    },

    _updateMapViewport : function(){
        var mapPanel = this.refs.map;
        if (!mapPanel)
            return ;
        
        var mapPanelElm = mapPanel.getDOMNode();
        var mapPanelBox = mapPanelElm.getBoundingClientRect();
        
        var topLeft = [0, 0];
        var bottomRight = [mapPanelBox.right - mapPanelBox.left, 
                           mapPanelBox.bottom - mapPanelBox.top];
        var focusPos = [bottomRight[0] / 2, bottomRight[1] * 3 / 4];
        this.refs.map.setViewport(topLeft, bottomRight, focusPos);
    }
});
