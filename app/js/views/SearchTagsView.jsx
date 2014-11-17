/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('./AppViewMixin');
var TagsMixin = require('./widgets/TagsMixin.jsx');

module.exports = React.createClass({
    displayName : 'SearchTagsView',
    mixins : [AppViewMixin, TagsMixin],
    _newState : function(options){
        var app = this.getApp();
        var tags = app.nav.getFilterTags();
        return { tags : tags };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    render : function() {
        var app = this.props.app;
        return (
            <span className={this.props.className}>
                {this._renderTagList(this.state.tags)}
            </span>
        );
    }
});
