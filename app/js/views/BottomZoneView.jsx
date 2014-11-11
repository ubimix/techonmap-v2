/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
module.exports = React.createClass({
    displayName : 'BottomZoneView',
    render : function() {
        var app = this.props.app;
        return (
            <div className={this.props.className}>Bottom zone</div>
        );
    }
});
