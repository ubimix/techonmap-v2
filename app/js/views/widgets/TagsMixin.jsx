/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
module.exports =  {
    _selectTag : function(tag, ev) {
        var app = this.props.app;
        app.organizations.searchByTags([tag]);
        ev.stopPropagation();
        ev.preventDefault();
    },        
    _renderTags : function(){
        var props = this._getProperties();
        var tags = _.map(props.tags, function(tag) {
            return (
                <a href="#" onClick={_.bind(this._selectTag, this, tag)}>
                    #{tag + ' '}
                </a>
            );
        }, this);
        if (!tags.length)
            return '';
        return <div className="tags">{tags}</div>
    },
};
