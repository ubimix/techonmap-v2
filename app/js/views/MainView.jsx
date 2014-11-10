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
            <div className='main container-fluid'>
                <TopZoneView app={app} />
                <MiddleZoneView app={app} />
                <BottomZoneView app={app} />
            </div>
        );
    }
});
