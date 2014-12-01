/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var TagsMixin = require('./TagsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');
var Formats = require('../utils/Formats');

module.exports = _.extend({

     getApp : function() {
         return this.props.app;
     },
    _getProperties : function(){
        var resource = this.props.resource;
        return resource.properties || {};
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
        var props = this._getProperties();
        return (
           <span className="name">{props.name}</span>
        );
    },
    
    _renderUrl : function(){
        var props = this._getProperties();
        var url = Formats._formatUrl(props.url);
        return <div className="url">
            <a href={url.url} className="website" target="_blank">{url.label}</a>
        </div>
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
