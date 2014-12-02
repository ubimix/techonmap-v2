/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var SearchInputBoxView = require('./search/SearchInputBoxView.jsx');
var SearchTagsView = require('./search/SearchTagsView.jsx');
var SearchInfoCategoriesView = require('./search/SearchInfoCategoriesView.jsx');
var DomUtils= require('./utils/DomUtils');

module.exports = React.createClass({
    displayName : 'LeftToolbar',
    
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

                <ul className="list-group search-input-box">
                    <li className="list-group-item">
                        <SearchInputBoxView app={app} className="search-input-box"/>
                    </li>
                </ul>                

                <ul className="list-group search-tags">
                    <li className="list-group-item">
                        Tag(s) : <SearchTagsView app={app}/>
                    </li>
                </ul>                

                <ul className="list-group search-categories">
                    <li className="list-group-item">
                        Catégorie(s) : <SearchInfoCategoriesView app={app}/>
                    </li>
                </ul>                

            </div>
        );
    }
});
