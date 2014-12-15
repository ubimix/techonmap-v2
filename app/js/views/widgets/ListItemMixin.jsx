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

    _renderSocialNetworks : function(isSelected) {
        if (isSelected) { 
            return <div className="social-networks">
                <ul>
                    {this._getIconLink('url', true)}
                    {this._getIconLink('twitter', true)}
                    {this._getIconLink('facebook', true)}
                    {this._getIconLink('viadeo', true)}
                    {this._getIconLink('linkedin', true)}
                    {this._getIconLink('googleplus', true)}
                </ul>
            </div>
        } else {
            return <div className="social-networks">
                {this._getIconLink('url')}
                {this._getIconLink('twitter')}
                {this._getIconLink('facebook')}
                {this._getIconLink('viadeo')}
                {this._getIconLink('linkedin')}
                {this._getIconLink('googleplus')}
            </div>
        }
    },
    
    _renderDescription : function(isSelected) {
        if (isSelected) {
            var desc = ResourceUtils._getFirstProperty(this.props.resource, 'description');
            return <div className="description">
                    {desc}
            </div>
        } else 
            return;
    },
    
    _renderShare : function(isSelected) {
        if (isSelected) {
            var id = ResourceUtils._getFirstProperty(this.props.resource, 'id');
            var url = 'http://techonmap.fr/#'+id;
            var twitter = 'https://twitter.com/intent/tweet?source=webclient&text='+url;
            var facebook = 'http://www.facebook.com/sharer/sharer.php?u='+url;
            var linkedin = 'http://www.linkedin.com/shareArticle?mini=true&url='+url;
            var viadeo = 'http://www.viadeo.com/shareit/share/?url='+url;
            var googlePlus = 'https://plus.google.com/share?url='+url;
            var share = 'Partager';
            return (<div className="share">
                <div className="left">Partager :</div>
                <input type="text" className="input-permalink" disabled="disabled" value={url} />
                <div className="right">
                    <a href={twitter} target="_blank">
                        <img src="images/share/twitter.png" alt="Partagez sur Twitter" />
                    </a> 
                    <a href={facebook} target="_blank">
                        <img src="images/share/facebook.png" alt="Partagez sur Facebook" />
                    </a> 
                    <a href={linkedin} target="_blank">
                        <img src="images/share/linkedin.png" alt="Partagez sur LinkedIn" />
                    </a> 
                    <a href={viadeo} target="_blank">
                        <img src="images/share/viadeo.png" alt="Partagez sur Viadeo" />
                    </a> 
                    <a href={googlePlus} target="_blank">
                        <img src="images/share/google-plus.png" alt="Partagez sur Google+" />
                    </a>
                </div>
                <div className="clear"></div>
            </div>);            
        } else 
            return;
    },    
    
    _getIconLink : function(propName, withLabel) {
        var propIcons = {'url':'web', 'googleplus': 'google-plus'};
        var propValue = ResourceUtils._getFirstProperty(this.props.resource, propName);
        if (propName == 'twitter')
            propValue = this._getTwitterUrl(propValue);
        var iconName = propIcons[propName] ? propIcons[propName] : propName;
        var iconClassName = "icon icon-"+iconName;
        if (propValue) {
            if (withLabel) {
                var urlAndLabel = Formats._formatUrl(propValue);
                var label = urlAndLabel.label;
                return <li><a href={propValue} target="_blank">
                <i className={iconClassName}></i> {label}
                </a></li>
            } else {
                return <a href={propValue} target="_blank">
                <i className={iconClassName}></i>
                </a>    
            }
        } else {
            iconClassName += " icon-off";
            if (!withLabel)
                return  <i className={iconClassName}></i>;
            return;
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
    
    _renderEditButton : function(isSelected) {
        if (isSelected) {
            var id = ResourceUtils._getFirstProperty(this.props.resource, 'id');
            var editLink = 'http://techonmap.fr/edition.html#'+id;
            return <a href={editLink} title="Éditer cette fiche" className="edit picto-edit" target="_blank">
                <i className="icon icon-edit"></i>
            </a>;
        } else 
            return 
    }
}, TagsMixin, I18NMixin);
