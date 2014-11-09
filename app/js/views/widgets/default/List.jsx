/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var ListItemMixin = require('../ListItemMixin.jsx');

module.exports = React.createClass({
    displayName : 'List.Default',
    mixins: [ListItemMixin],
     
    render: function() {
        var resourceId = this.props.resourceId;
        var resourceType = this.props.resourceType;
        var resourceProperties = this._getProperties();
        var isStar = resourceProperties.star;
        var pos = this.props.pos + 1;
        var metadata = resourceType.split('/');
        var typeClass = resourceType;
        if (metadata && metadata.length > 1)
            typeClass = metadata[1];
        var iconClassName = "category-" + typeClass; 
        return (
            <div className='search-result-item'
                key={resourceId}
                onClick={this._selectResource}>
                {this._renderIcon({className : iconClassName, isStar: isStar})}
                <div className="search-result-content">
                    {this._renderName()}
                    {this._renderUrl()}
                    {this._renderTags()}
                </div>
            </div>
        );            
    },
});
 