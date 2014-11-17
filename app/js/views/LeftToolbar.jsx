/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
module.exports = React.createClass({
    displayName : 'LeftToolbar',
    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>
                <div className="btn-group-vertical" role="group">
                    <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-plus"></i></button>
                    <button type="button" className="btn btn-default"><i className="glyphicon glyphicon-minus"></i></button>
                    <div className="btn-group open" role="group">
                        <button type="button" className="btn btn-default dropdown-toggle">
                        <i className="glyphicon glyphicon-search"></i>
                        </button>
                        <ul className="dropdown-menu" role="menu" aria-labelledby="btnGroupVerticalDrop1">
                            <li><a href="#">Dropdown link</a></li>
                            <li><a href="#">Dropdown link</a></li>
                        </ul>
                    </div>
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
