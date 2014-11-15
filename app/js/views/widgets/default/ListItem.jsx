/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var ListItemMixin = require('../ListItemMixin.jsx');

module.exports = React.createClass({
    displayName : 'List.Default',
    mixins: [ListItemMixin],
     
    render: function() {
        var app = this.props.app;
        var resource = this.props.resource;
        var resourceId = app.res.getResourceId(resource);
        var selected = app.res.isSelectedResource(resourceId);
        var resourceType = app.res.getResourceType(resource);
        var pos = this.props.pos + 1;
        var className = 'list-item ' + resourceType;
        return (
            <div className={className}
                key={resourceId}
                onClick={this.props.onClick}>
                {this._renderName()}
                {this._renderUrl()}
                {this._renderTags()}
            </div>
        );            
    },
});
 