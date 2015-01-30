/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var TopZoneView = require('./TopZoneView.jsx');
var MiddleZoneView =  require('./MiddleZoneView.jsx');
var BottomZoneView = require('./BottomZoneView.jsx');
var TopSocialBar = require('./TopSocialBar.jsx');
 
module.exports = React.createClass({
    displayName : 'MainView',
    getInitialState : function(){
        return this._newState();
    },
    componentWillMount : function(){
        var app = this.props.app;
        app.ui.addChangeListener(this._updateVisualizationMode);
    },
    componentWillUnmount : function(){
        var app = this.props.app;
        app.ui.removeChangeListener(this._updateVisualizationMode);
    },
    _updateVisualizationMode : function(){
        this.setState(this._newState());
    },
    _newState : function(options){
        return _.extend({
        }, this.state, options);
    },
    render : function() {
        var app = this.props.app;
        var className = 'main-zone';
        var mobileMode = app.ui.isMobileMode();
        if (mobileMode) {
            className += ' mobile-mode';
        } else {
            className += ' fullscreen-mode';
        }
        return (
            <div className={className}>
                <TopSocialBar app={app} className="social" />
                <TopZoneView app={app} className="top-zone"/>
                <MiddleZoneView app={app} className="middle-zone"/>
                <BottomZoneView app={app} className="bottom-zone"/>
            </div>
        );
    }
});
