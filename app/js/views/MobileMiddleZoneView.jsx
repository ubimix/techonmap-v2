/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var DomUtils = require('./utils/DomUtils');
var ContentPopupMixin = require('./utils/ContentPopupMixin');
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
    mixins : [ DomUtils, ViewActivationMixin, ContentPopupMixin, I18NMixin ],
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
    
    _renderAboutPanel : function(){
        if (!this._checkActiveView('about'))
            return ;
        var app = this.props.app;
        var that = this;
        that._loadContent({ 
            url: 'about.md',
        }).then(function(obj) {
            var div = that.refs.about.getDOMNode();
            
            var title = obj.getAsHtml('title');
            var titlePanel = div.querySelector('.text-title');
            if (title && titlePanel) {
                titlePanel.innerHTML = title;
            }

            var content = obj.getContentAsHtml();
            var contentPanel = div.querySelector('.text-content');
            if (content && contentPanel){
                contentPanel.innerHTML = content;
            }
        });
        return (
            <div ref="about" className="container-fluid about-panel">
                <h1 className="text-title"></h1>
                <div className="row">
                    <div className="col-md-12 text-content">
                        
                    </div>
                </div>
            </div>
        );
        
    },
    
    _renderSearchFormView : function(){
        if (!this._checkActiveView('search'))
            return ;
        var simple = false;
        if (simple) {
            return this._renderSearchFormViewA();
        } else {
            return this._renderSearchFormViewB();
        }
    },
    
    _renderSearchFormViewA : function(){
        var app = this.props.app;
        return (
            <SearchPanel app={app}>
                <hr />
                <div className="row">
                    <div className="col-xs-4">
                        <SearchResultsInfoView app={app}/>
                    </div>
                    <div className="col-xs-4">
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
                    <div className="col-xs-4">
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
    _renderSearchFormViewB : function(){
        var app = this.props.app;
        return (
            <SearchPanel app={app}>
                <hr />
                <div className="validate-msg text-center">
                    {this._getLabel("filter.label.showResults")}
                </div>
                <div className="row">
                    <div className="col-xs-6 col-md-offset-2 col-md-3">
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-lg btn-primary menu-list"
                                    onClick={this._activateView.bind(this, 'list')}>
                                    <i className="icon icon-list pull-right"></i>
                                    {this._getLabel("filter.label.btn.list") + ' '}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-offset-2 col-md-3">
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-lg btn-primary menu-map"
                                    onClick={this._activateView.bind(this, 'map')}>
                                    <i className="icon icon-map pull-right"></i>
                                    {this._getLabel("filter.label.btn.map") + ' '}
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
        var that = this;
        var app = this.props.app;
        return (
            <div className="search-results">
                <div className="container-fluid search-results-info">
                    <div className="row">
                        <div className="col-xs-6">
                            <SearchResultsInfoView app={app} className="stats" 
                                open={true} />
                        </div>
                        <div className="col-xs-6">
                            <SearchResultsOrderView app={app} />
                        </div>
                    </div>
                </div>
                <SearchResultsListView app={app}
                    onResourceClick={function(resource){
                    var id = app.res.getResourceId(resource);
                    if (app.res.isSelectedResource(id)) {
                        setTimeout(function(){
                            app.ui.focusView('map');
                        }, 1);
                    }
                }.bind(this)}/>
            </div>
        );
    },

    _renderMapView : function(){
        var visible = this._checkActiveView('map');
        var style = {
            visibility: visible ? 'visible' : 'hidden'
        };
        var app = this.props.app;
        return (<MapView app={app} className="map" ref="map" style={style}/>);
    },
    _renderMapToolbarView : function(){
        if (!this._checkActiveView('map'))
            return ;
        var app = this.props.app;
        return (<LeftToolbar app={app} hideZoom={true} className="toolbar" />);
    },

    render : function() {
        var app = this.props.app;
        var viewKey = app.ui.getFocusedViewKey();
        return (
            <div className={this.props.className}>
                {this._renderAboutPanel()}
                {this._renderSearchFormView()}
                {this._renderSearchResultsView()}
                {this._renderMapToolbarView()}
                {this._renderMapView()}
            </div>
        );
    },

    _updateMapViewport : function(){
        var mapPanel = this.refs.map;
        if (!mapPanel || !this.isMounted())
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
