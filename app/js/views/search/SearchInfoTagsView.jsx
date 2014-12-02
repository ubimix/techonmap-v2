/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var TagsMixin = require('../utils/TagsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchInfoTagsView',
    mixins : [AppViewMixin, TagsMixin, I18NMixin],
    _newState : function(options){
        var nav = this._getStore();
        var tags = nav.getFilterTags();
        return { tags : tags };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    render : function() {
        return this._renderTagList(this.state.tags);
    }
});
