/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
module.exports =  {
    _selectTag : function(tag, ev) {
        var app = this.props.app;
        app.nav.toggleTags([tag]);
        ev.stopPropagation();
        ev.preventDefault();
    },        
    _renderTags : function(){
        var props = this._getProperties();
        var app = this.props.app;
        var tags = _.map(props.tags, function(tag) {
            var selected = app.nav.isTagSelected(tag);
            var className = selected ? 'tag selected' : 'tag';
            return (
                <a href="#"
                    onClick={_.bind(this._selectTag, this, tag)}
                    className={className}>
                    #{tag + ' '}
                </a>
            );
        }, this);
        if (!tags.length)
            return '';
        return <div className="tags">{tags}</div>
    },
};
