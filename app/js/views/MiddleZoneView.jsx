/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
module.exports = React.createClass({
    displayName : 'MiddleZoneView',
    render : function() {
        var app = this.props.app;
        return (
            <div>Middle zone</div>
        );
    }
});
