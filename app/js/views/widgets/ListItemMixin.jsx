/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var TagsMixin = require('../utils/TagsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');
var Formats = require('../utils/Formats');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');

module.exports = _.extend({

     getApp : function() {
         return this.props.app;
     },
    _selectResource : function(ev){
        var app = this.getApp();
        var resourceId = this.props.resourceId;
        app.selection.toggleResource({
            resourceId : resourceId
        });
        ev.preventDefault();
        ev.stopPropagation();
    },
    
    _renderName : function(){
        var name = ResourceUtils.getResourceName(this.props.resource);
        return (
           <span className="name">{name}</span>
        );
    },
    
    _renderShortDescription : function(type) {
        type = ResourceUtils.getResourceTypeLabel(type);
        var creationYear = ResourceUtils.getResourceCreationYear(this.props.resource);
        var creationYearText = creationYear ? 'créé(e) en '+creationYear : ''; 
        return <div className="short-description">
            {type} {creationYearText}
        </div>
    },
    
    _renderUrl : function(){
        var urlStr = ResourceUtils._getFirstProperty(this.props.resource, 'url');
        var url = Formats._formatUrl(urlStr);
        return <div className="url">
            <a href={url.url} className="website" target="_blank">{url.label}</a>
        </div>
    },
    
    _renderAddress : function() {
        var resource = this.props.resource;
        var address = Formats._formatAddr(resource.properties);
        return <div className="address">
            {address}
        </div>
    },

    _renderSocialNetworks : function() {
        return <div className="social-networks">
            {this._getIconLink('url')}
            {this._getIconLink('twitter')}
            {this._getIconLink('facebook')}
            {this._getIconLink('viadeo')}
            {this._getIconLink('linkedin')}
            {this._getIconLink('googleplus')}
        </div>
    },
    
    _getIconLink : function(propName) {
        var propIcons = {'url':'web', 'googleplus': 'google-plus'};
        var propValue = ResourceUtils._getFirstProperty(this.props.resource, propName);
        if (propName == 'twitter')
            propValue = this._getTwitterUrl(propValue);
        var iconName = propIcons[propName] ? propIcons[propName] : propName;
        var iconClassName = "icon icon-"+iconName;
        if (propValue) {
            return <a href={propValue} target="_blank">
            <i className={iconClassName}></i>
            </a>    
        } else {
            iconClassName += " icon-off";
            return <i className={iconClassName}></i>;
        }
        
    },
    
    _getTwitterUrl : function(account) {
        if (!account)
            return null;
        if (account.indexOf('http') != 0)
            return 'https://twitter.com/'+account;
        return account;
        
    },
    
    /** Renders an icon element. */
    _renderIcon  : function(iconOptions) {
        var src = iconOptions.src;
        var img;
        if (src) {
            img = <img src={src}/>; 
        }
        var isStar = iconOptions.isStar;
        if (isStar) {
            isStar = <i className="star icon icon-star"></i>;
        }
        var className = 'search-result-icon';
        if (iconOptions.className) {
            className += ' ' + iconOptions.className;
        }
        return (
            <div className={className}>
                {img}
                {isStar}
            </div>
        );
    },
}, TagsMixin, I18NMixin);
