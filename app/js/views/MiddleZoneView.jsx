/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');
var InfiniteScroll = require('./InfiniteScroll.jsx');
module.exports = React.createClass({
    displayName : 'MiddleZoneView',
    _getItemHeight : function(){
        return 10;
    },
    _getItemNumber : function(){
        return 1000;
    },
    _loadItems : function(pos, length){
        var list = [];
        var len = Math.max(0, Math.min(length, len - this._getItemNumber()) - pos);
        for (var i=0; i<length; i++) {
            var item = (<div key={i}>{'item-' + i}</div>);
            list.push(item);
        }
        return list;
    },
    render : function() {
        var app = this.props.app;
        return (
           <InfiniteScroll
               height={this._getItemHeight}
               count={this._getItemNumber} 
               load={this._loadItems}
               />
        );
    }
});
