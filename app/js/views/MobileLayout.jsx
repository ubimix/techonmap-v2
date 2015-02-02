/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var MobileTopZoneView = require('./MobileTopZoneView.jsx');
var MobileMiddleZoneView =  require('./MobileMiddleZoneView.jsx');
var BottomZoneView = require('./BottomZoneView.jsx');
var TopSocialBar = require('./TopSocialBar.jsx');
 
module.exports = React.createClass({
    displayName : 'MobileLayout',
    render : function() {
        var app = this.props.app;
        var className = 'main-zone mobile-mode';
        return (
            <div className={className}>
                <TopSocialBar app={app} className="social" />
                <MobileTopZoneView app={app} className="top-zone"/>
                <MobileMiddleZoneView app={app} className="middle-zone"/>
            </div>
        );
    }
});
