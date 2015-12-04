/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var MobileTopZoneView = require('./MobileTopZoneView.jsx');
var MobileMiddleZoneView =  require('./MobileMiddleZoneView.jsx');
var BottomZoneView = require('./BottomZoneView.jsx');
var PopupPanel = require('mosaic-core').React.PopupPanel;

module.exports = React.createClass({
    displayName : 'MobileLayout',
    componentDidMount : function(){
        var elm = this.getDOMNode();
        PopupPanel.setPopupContainer(elm);
    },
    render : function() {
        var app = this.props.app;
        var showHeaders = app.ui.showHeader();
        var className = 'main-zone mobile-mode';
        var topHeaders;
        if (showHeaders) {
            topHeaders = [
            ];
        } else {
            className += ' no-headers';
        }
        return (
            <div className={className} key={this.props.key}>
                {topHeaders}
                <MobileTopZoneView key="top" app={app} className="top-zone"/>
                <MobileMiddleZoneView key="middle" app={app} className="middle-zone"/>
            </div>
        );
    }
});
