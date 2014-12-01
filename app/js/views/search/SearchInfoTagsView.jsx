/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');

module.exports = React.createClass({
    displayName : 'SearchInfoTagsView',
    mixins : [AppViewMixin],
    _newState : function(options){
        var nav = this._getStore();
        var tags = app.nav.getFilterTags();
        return { tags : tags };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    _renderTagsList : function(tags) {
        return _.map(tags, function(tag){
            return <span>{tag}</span>;
        });
    },
    render : function() {
        var app = this.props.app;
        return (
            <span className={this.props.className}>
                {this._renderTagsList(this.state.tags)}
            </span>
        );
    }
});
