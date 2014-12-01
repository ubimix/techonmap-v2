/** @jsx React.DOM */
var _= require('underscore');
var React = require('react');
var TagsMixin = require('../TagsMixin.jsx');
var I18NMixin = require('../../utils/I18NMixin');
var ResourceUtils = require('../../../tools/ResourceUtilsMixin');

module.exports = React.createClass({
    displayName : 'MapPopup.Default',
    mixins: [TagsMixin, I18NMixin],
    getApp : function(){
        return this.props.app;
    },
    _getResourceType : function(){
        var app = this.getApp();
        return app.res.getResourceType(this.props.resource);
    },
    _getResourceId : function(){
        var app = this.getApp();
        return app.res.getResourceId(this.props.resource);
    },
    _renderName : function(){
        var name = ResourceUtils.getResourceName(this.props.resource);
        var selected = this.props.selected ? ' * ' : '';
        return <h3 className="name" onClick={this.props.onClick}>
            <a href="#">{selected}{name}</a>
        </h3>
    },
    render: function() {
        var resourceId = this._getResourceId();
        var resourceType = this._getResourceType();
        return (
            <div key={resourceId}>
                {this._renderName()}
                {this._renderTags()}
            </div>
        );            
    },
});
 