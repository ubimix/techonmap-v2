/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var LabelsMixin = require('../utils/LabelsMixin.jsx');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'LabelsInfoView',
    mixins : [AppViewMixin, LabelsMixin, I18NMixin],

    _newState : function(options){
        var app = this.getApp();
        var labels = app.res.getFilterLabels();
        return { labels : labels };
    },
    _getStore : function(){
        return this.props.app.res;
    },
    render : function() {
        var app = this.props.app;
        return (
            <span className={this.props.className}>
                {this._renderLabelList(this.state.labels, this.props.hideEmpty)}
            </span>
        );
    }
});
