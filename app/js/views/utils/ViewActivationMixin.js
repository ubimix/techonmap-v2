/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

var ViewActivationMixin = {
    _activateView : function(key, ev) {
        var app = this.props.app;
        app.ui.focusView(key);
        ev.preventDefault();
        ev.stopPropagation();
    }
};

module.exports = ViewActivationMixin;
