/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var ListItemMixin = require('../ListItemMixin.jsx');

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
        className += resourceType;
        return (
            <div className={className}
                key={resourceId}
                onClick={this.props.onClick}>
                <a className="media-left" href="#">
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2ODc1IiB5PSIzMiIgc3R5bGU9ImZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjY0eDY0PC90ZXh0PjwvZz48L3N2Zz4=" />
                </a>
                <div className="media-body">
                  <h4 className="media-heading">{selected ? ' * ' : ''}{this._renderName()}</h4>
                  {this._renderUrl()}
                  {this._renderTags()}
                </div>
            </div>
        );            
    },
});
 