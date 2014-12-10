/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var SearchTagsView = require('./search/SearchTagsView.jsx');
var SearchInfoCategoriesView = require('./search/SearchInfoCategoriesView.jsx');
var SearchInfoZoneView = require('./search/SearchInfoZoneView.jsx');
var DomUtils= require('./utils/DomUtils');
var I18NMixin = require('./utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'LeftToolbar',
    mixins : [ I18NMixin ],
    getApp : function(){
        return this.props.app;
    },
    _incZoomLevel : function(ev){
        var app = this.props.app;
        app.map.changeMapZoom({ zoomDelta : +1 });
        ev.stopPropagation();
        ev.preventDefault();
    },
    _decZoomLevel : function(ev){
        var app = this.props.app;
        app.map.changeMapZoom({ zoomDelta : -1 });
        ev.stopPropagation();
        ev.preventDefault();
    },

    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>
            
                <div className="btn-group-vertical map-control" role="group">
                    <button type="button" className="btn btn-default" onClick={this._incZoomLevel}><i className="icon-zoom-in"></i></button>
                    <button type="button" className="btn btn-default" onClick={this._decZoomLevel}><i className="icon-zoom-out"></i></button>
                </div>

                <ul className="list-group search-tags">
                    <li className="list-group-item">
                        {this._getLabel('toolbar.left.label.tags')}
                        <SearchTagsView app={app}/>
                    </li>
                </ul>                

                <ul className="list-group search-categories">
                    <li className="list-group-item">
                        {this._getLabel('toolbar.left.label.categories')}
                        <SearchInfoCategoriesView app={app}/>

                   </li>
                </ul>                

                <ul className="list-group search-zones">
                    <li className="list-group-item">
                        {this._getLabel('toolbar.left.label.zone')}
                        <SearchInfoZoneView app={app}/>
                    </li>
                </ul>                
                
            </div>
        );
    }
});
