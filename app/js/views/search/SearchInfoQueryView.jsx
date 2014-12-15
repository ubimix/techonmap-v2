/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var AppViewMixin = require('../AppViewMixin');
var I18NMixin = require('../utils/I18NMixin');

module.exports = React.createClass({
    displayName : 'SearchInfoQueryView',
    mixins : [AppViewMixin, I18NMixin],
    _newState : function(options){
        var nav = this._getStore();
        var q = nav.getSearchQuery();
        return { q : q };
    },
    _getStore : function(){
        return this.props.app.nav;
    },
    _onClick : function(ev){
        var nav = this._getStore();
        nav.setSearchQuery('');
    },
    render : function() {
        var app = this.props.app;
        var query = this.state.q;
        return (
            <span onClick={this._onClick} className="query selected">
                <span className='query-label'>{query + ' '}</span>
            </span>
        );        
    }
});
