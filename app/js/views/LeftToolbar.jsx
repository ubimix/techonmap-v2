/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var SearchInputBoxView = require('./SearchInputBoxView.jsx');
var SearchTagsView = require('./SearchTagsView.jsx');
var SearchCategoriesView = require('./SearchCategoriesView.jsx');
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
                    <button type="button" className="btn btn-default" onClick={this._incZoomLevel}><i className="glyphicon glyphicon-plus"></i></button>
                    <button type="button" className="btn btn-default" onClick={this._decZoomLevel}><i className="glyphicon glyphicon-minus"></i></button>
                </div>

                <ul className="list-group search-input-box">
                    <li className="list-group-item">
                        <SearchInputBoxView app={app} className="search-input-box"/>
                    </li>
                </ul>                

                <ul className="list-group search-tags">
                    <li className="list-group-item">
                        Tags : <SearchTagsView app={app}/>
                    </li>
                </ul>                

                <ul className="list-group search-categories">
                    <li className="list-group-item">
                        Categories: <SearchCategoriesView app={app}/>
                    </li>
                </ul>                

            </div>
        );
    }
});
