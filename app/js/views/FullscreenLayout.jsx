/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var FullscreenTopZoneView = require('./FullscreenTopZoneView.jsx');
var FullscreenMiddleZoneView =  require('./FullscreenMiddleZoneView.jsx');
var BottomZoneView = require('./BottomZoneView.jsx');
var TopSocialBar = require('./TopSocialBar.jsx');
 
module.exports = React.createClass({
    displayName : 'MainView',
    render : function() {
        var app = this.props.app;
        var className = 'main-zone fullscreen-mode';
        return (
            <div className={className}>
                <TopSocialBar app={app} className="social" />
                <FullscreenTopZoneView app={app} className="top-zone"/>
                <FullscreenMiddleZoneView app={app} className="middle-zone"/>
                <BottomZoneView app={app} className="bottom-zone"/>
            </div>
        );
    }
});