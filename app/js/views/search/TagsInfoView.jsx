/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var TagsMixin = require('../utils/TagsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'TagsInfoView',
    mixins : [AppViewMixin, TagsMixin, I18NMixin],
    
    componentWillMount : function() {
        var app = this.props.app;
        app.res.addChangeListener(this._update, this);
    },
    componentWillUnmount : function() {
        var app = this.props.app;
        app.res.removeChangeListener(this._update, this);
    },
    _update : function() {
        this.setState(this._newState());
    },
    _newState : function(options){
        var app = this.getApp();
        var tags = app.res.getFilterTags();
        return { tags : tags };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    render : function() {
        var app = this.props.app;
        return (
            <span className={this.props.className}>
                {this._renderTagList(this.state.tags, this.props.hideEmpty)}
            </span>
        );
    }
});
