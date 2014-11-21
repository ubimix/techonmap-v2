/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var TopZoneView = require('./TopZoneView.jsx');
var MiddleZoneView =  require('./MiddleZoneView.jsx');
var BottomZoneView = require('./BottomZoneView.jsx');
var TopSocialBar = require('./TopSocialBar.jsx');
 
module.exports = React.createClass({
    displayName : 'MainView',
    render : function() {
        var app = this.props.app;
        return (
            <div className='main-zone'>
                <TopSocialBar app={app} className="social" />
                <TopZoneView app={app} className="top-zone"/>
                <MiddleZoneView app={app} className="middle-zone"/>
                <BottomZoneView app={app} className="bottom-zone"/>
            </div>
        );
    }
});
