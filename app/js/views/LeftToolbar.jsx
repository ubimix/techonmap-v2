/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var SearchBoxView = require('./SearchBoxView.jsx');

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
            
                <div className="btn-group-vertical open" role="group">
                    <SearchBoxView app={app}/>
                </div>
                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default" onClick={this._incZoomLevel}><i className="glyphicon glyphicon-plus"></i></button>
                    <button type="button" className="btn btn-default" onClick={this._decZoomLevel}><i className="glyphicon glyphicon-minus"></i></button>
                </div>
                
                
                <div className="btn-group-vertical open" role="group">
                    <div className="btn-group-vertical" role="group">
                        <button type="button" className="btn btn-default" >
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                    <ul className="dropdown-menu" role="menu" aria-labelledby="btnGroupVerticalDrop1">
                        <li><a href="#">Dropdown link</a></li>
                        <li><a href="#">Dropdown link</a></li>
                    </ul>
                </div>
                
                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-plus"></i></button>
                    <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-minus"></i></button>
                </div>
                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-plus"></i> First</button>
                    <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-minus"></i> Second</button>
                    <div className="btn-group popover-container">
                        <button type="button" className="btn btn-default">
                            Categories
                        </button>
                        <div className="popover fade right in top" role="tooltip">
                            <div className="arrow"></div>
                            <h3 className="popover-title">This is a title</h3>
                            <div className="popover-content">
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                            </div>
                        </div>                            
                    </div>
                </div>
            </div>
        );
    }
});
