var _ = require('underscore');
var React = require('react');
var DomUtils = require('./DomUtils');

/**
 * This class is responsible for automatic tracking and updating of vertical
 * panel sizes.
 */
var PanelSizeTracker = React.createClass({
    displayName : 'PanelSizeTracker',

    /** Updates the size of this zone */
    _resizeContent : function() {
        if (!this.isMounted())
            return;
        var container = this.props.container;
        var containerNode = container.getDOMNode();
        var node = this.getDOMNode();
        var minSize = this.props.minSize || 10;
        DomUtils._updateSize(containerNode, node, minSize);
    },

    componentWillMount : function() {
        this._resizeContent = _.debounce(this._resizeContent, 10);
        window.addEventListener('resize', this._resizeContent);
    },

    /** Add resize listener for the window */
    componentDidMount : function() {
        this._resizeContent();
    },

    /** Removes resize listener for the window */
    componentWillUnmount : function() {
        window.removeEventListener('resize', this._resizeContent);
    },

    /**
     * Renders children and track the size of a child with the specified key.
     */
    render : function() {
        return React.Children.only(this.props.children);
    }

});

module.exports = PanelSizeTracker;
