/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var ListItemMixin = require('../ListItemMixin.jsx');
var ResourceUtils = require('../../../tools/ResourceUtilsMixin');
var ViewActivationMixin = require('../../utils/ViewActivationMixin');

// FIXME: refactor types
var types = {
        'entreprise' : 'company',
        'tiers-lieu' : 'coworking',
        'communauté' : 'community',
        'école' : 'education',
        'investisseur' : 'investor',
        'incubateur' : 'incubator',
        'acteur public': 'org'
    };


module.exports = React.createClass({
    displayName : 'List.Default',
    mixins: [ListItemMixin, ViewActivationMixin],
 
    _renderViewFocusButtons : function(){
        return(
            <div className="toolbar">
                <a href='#' onClick={this._activateView.bind(this, 'map')}>
                    <i className="icon icon-map">
                    </i>
                </a>
            </div>
        )
    },
    
    _renderEditButton : function() {
        var id = ResourceUtils._getFirstProperty(this.props.resource, 'id');
        var editLink = this._getLabel("list.item.edit.link", { id: id });
        var editTitle = this._getLabel("list.item.edit.title", { id: id });
        return(
            <div className="toolbar">
                <a href={editLink} title={editTitle}
                    className="edit picto-edit" target="_blank">
                    <i className="icon icon-edit"></i>
                </a>
            </div>
        )
    },
    
    render: function() {
        var app = this.props.app;
        var resource = this.props.resource;
        var resourceId = app.res.getResourceId(resource);
        var selected = app.res.isSelectedResource(resourceId);
        var resourceType = app.res.getResourceType(resource);
        var pos = this.props.pos + 1;
        var className = 'media list-group-item ';
        if (selected){
            className += ' selected '
        }
        var toolbar = [];
        if (selected){
            if (app.ui.isMobileMode()) {
                toolbar.push(this._renderViewFocusButtons());
            } else {
                toolbar.push(this._renderEditButton());
            }
        }
        
        var pictoClassName = 'picto ' + types[resourceType];
        var iconClassName = 'icon icon-'+types[resourceType];
        className += resourceType;
        return (
            <div className={className}
                key={resourceId}
                onClick={this.props.onClick}>
                <div className={pictoClassName}>
                    <i className={iconClassName}></i>
                </div>
                <div className="media-body">
                  {toolbar}
                  <h4 className="media-heading">{this._renderName()}</h4>
                  {this._renderShortDescription(resourceType)}
                  {this._renderTags()}
                  {this._renderDescription(selected)}
                  {this._renderAddress()}
                  {this._renderSocialNetworks(selected)}
                  {this._renderShare(selected)}
                </div>
            </div>
        );            
    },
});
 