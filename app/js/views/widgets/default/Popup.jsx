/** @jsx React.DOM */
var _= require('underscore');
var React = require('react');
var TagsMixin = require('../TagsMixin.jsx');
module.exports = React.createClass({
    displayName : 'Popup.Default',
    mixins: [TagsMixin],
    _getProperties : function(){
        var resource = this.props.resource;
        return resource.properties || {};
    },
    _renderName : function(){
        var props = this._getProperties();
        return <h3 className="name">
            <a href="#">{props.name}</a>
        </h3>
    },
    render: function() {
        var resourceId = this.props.resourceId;
        var resourceType = this.props.resourceType;
        var resourceProperties = this._getProperties();
        var pos = this.props.pos + 1;
        var metadata = resourceType.split('/');
        var typeClass = resourceType;
        if (metadata && metadata.length > 1)
            typeClass = metadata[1];
        
        return (
            <div className="" key={resourceId}>
                {this._renderName()}
                {this._renderTags()}
            </div>
        );            
    },
});
 