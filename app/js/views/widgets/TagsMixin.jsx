/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
module.exports =  {
    _selectTag : function(tag, ev) {
        var app = this.props.app;
        app.nav.toggleTags([tag]);
        if (this._onSelectTag){
            this._onSelectTag(ev);
        }
        ev.stopPropagation();
        ev.preventDefault();
    },
    _renderTags : function(){
        var props = this._getProperties();
        var tags = props.tags;
        return this._renderTagList(tags);
    },
    _renderTagList : function(tags) {
        var app = this.props.app;
        var tags = _.map(tags, function(tag) {
            var selected = app.nav.isTagSelected(tag);
            var className = selected ? 'tag selected' : 'tag';
            return (
                <span
                    onClick={_.bind(this._selectTag, this, tag)}
                    className={className}>
                    {tag + ' '}
                </span>
            );
        }, this);
        if (!tags.length) {
            tags = [this._getLabel('filter.label.tags.all')];
        }
        return <span className="tags">{tags}</span>
    },
};
