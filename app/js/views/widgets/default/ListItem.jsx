/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var ListItemMixin = require('../ListItemMixin.jsx');

//FIXME: refactor types
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
    mixins: [ListItemMixin],
     
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
        
        var pictoClassName = 'picto ' + types[resourceType];
        
        className += resourceType;
        return (
            <div className={className}
                key={resourceId}
                onClick={this.props.onClick}>
                <div className={pictoClassName}>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{this._renderName()}</h4>
                  {this._renderShortDescription(resourceType)}
                  {this._renderTags()}
                  {this._renderAddress()}
                  {this._renderSocialNetworks()}
                </div>
            </div>
        );            
    },
});
 