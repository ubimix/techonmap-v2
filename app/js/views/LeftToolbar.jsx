/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var SearchInputBoxView = require('./SearchInputBoxView.jsx');
var SearchTagsView = require('./SearchTagsView.jsx');

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
            
                <div className="btn-group-vertical" role="group">
                    <SearchInputBoxView app={app}/>
                </div>
                    
                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default">
                        Tags : <SearchTagsView app={app}/>
                    </button>
                </div>
                    
                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default" onClick={this._incZoomLevel}><i className="glyphicon glyphicon-plus"></i></button>
                    <button type="button" className="btn btn-default" onClick={this._decZoomLevel}><i className="glyphicon glyphicon-minus"></i></button>
                </div>
                
            </div>
        );
    }
});
