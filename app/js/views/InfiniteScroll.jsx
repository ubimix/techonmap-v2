/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react');

module.exports = React.createClass({
    displayName : 'InfiniteScroll',

    render : function() {
        var before = React.DOM.div({
            ref : 'before',
            style : {
                height : fullHeight + 'px',
                position : 'relative',
            }
        });
        return React.DOM.div({
            id : this.props.id,
            className : this.props.className,
            style : this.props.style,
            onScroll : this._onScroll
        }, before, block, after);
    }
});
