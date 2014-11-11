/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var TopZoneView = require('./TopZoneView.jsx');
var MiddleZoneView =  require('./MiddleZoneView.jsx');
var BottomZoneView = require('./BottomZoneView.jsx');
 
module.exports = React.createClass({
    displayName : 'MainView',
    render : function() {
        var app = this.props.app;
        return (
            <div className='main-zone container-fluid'>
                <TopZoneView app={app} className="top-zone"/>
                <MiddleZoneView app={app} className="middle-zone"/>
                <BottomZoneView app={app} className="bottom-zone"/>
            </div>
        );
    }
});
