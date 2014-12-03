/** @jsx React.DOM */
var _= require('underscore');
var React = require('react');
var ListItemMixin = require('../ListItemMixin.jsx');
var ResourceUtils = require('../../../tools/ResourceUtilsMixin');

module.exports = React.createClass({
    displayName : 'MapPopup.Default',
    mixins: [ListItemMixin],
    _getResourceType : function(){
        var app = this.getApp();
        return app.res.getResourceType(this.props.resource);
    },
    _getResourceId : function(){
        var app = this.getApp();
        return app.res.getResourceId(this.props.resource);
    },
    
    render: function() {
        var resourceId = this._getResourceId();
        var resourceType = this._getResourceType();
        return (
            <div key={resourceId}>
                {this._renderName()}
                {this._renderTags()}
                {this._renderAddress()}
                {this._renderSocialNetworks()}
            </div>
        );            
    },
});
 