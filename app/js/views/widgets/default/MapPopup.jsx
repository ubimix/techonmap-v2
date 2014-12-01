/** @jsx React.DOM */
var _= require('underscore');
var React = require('react');
var TagsMixin = require('../TagsMixin.jsx');
var I18NMixin = require('../../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'MapPopup.Default',
    mixins: [TagsMixin, I18NMixin],
    _getProperties : function(){
        var resource = this.props.resource;
        return resource.properties || {};
    },
    _getResourceType : function(){
        var app = this.props.app;
        return app.res.getResourceType(this.props.resource);
    },
    _getResourceId : function(){
        var app = this.props.app;
        return app.res.getResourceId(this.props.resource);
    },
    _renderName : function(){
        var props = this._getProperties();
        var selected = this.props.selected ? ' * ' : '';
        return <h3 className="name" onClick={this.props.onClick}>
            <a href="#">{selected}{props.name}</a>
        </h3>
    },
    render: function() {
        var resourceId = this._getResourceId();
        var resourceType = this._getResourceType();
        var resourceProperties = this._getProperties();
        return (
            <div key={resourceId}>
                {this._renderName()}
                {this._renderTags()}
            </div>
        );            
    },
});
 