/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var FullscreenTopZoneView = require('./FullscreenTopZoneView.jsx');
var FullscreenMiddleZoneView =  require('./FullscreenMiddleZoneView.jsx');
var BottomZoneView = require('./BottomZoneView.jsx');
var PopupPanel = require('mosaic-core').React.PopupPanel;

module.exports = React.createClass({
    displayName : 'MainView',
    componentDidMount : function(){
        var elm = this.getDOMNode();
        PopupPanel.setPopupContainer(elm);
    },
    render : function() {
        var app = this.props.app;
        var showHeaders = app.ui.showHeader();
        var className = 'main-zone fullscreen-mode';
        var headers;
        if (showHeaders) {
            headers = [
                <FullscreenTopZoneView key="top" app={app} className="top-zone"/>
            ];
        } else {
            className += ' no-headers';
        }
        return (
            <div key={this.props.key} className={className}>
                {headers}
                <FullscreenMiddleZoneView key="middle" app={app} className="middle-zone"/>
                <BottomZoneView key="bottom" app={app} className="bottom-zone"/>
            </div>
        );
    }
});
