var _ = require('underscore');
var DomUtils = {

    // ---------------------------------------------------------------------
    // Scroll position and positions on the screen

    /**
     * Shows the specified element in the container. If the element is already
     * visible then this method does nothing.
     */
    _scrollTo : function(container, element) {
        var pos = DomUtils._getPosition(container, element);
        var top = pos.top;
        // Scroll only if the element is not visible in the container
        if (top < container.scrollTop ||
                top > container.scrollTop + container.offsetHeight) {
            container.scrollTop = pos.top;
        }
    },

    /**
     * Returns position of an element in the specified container.
     */
    _getPosition : function(el, parent) {
        var _x = 0;
        var _y = 0;
        while (el && el !== parent && !isNaN(el.offsetLeft) &&
                !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {
            top : _y,
            left : _x
        };
    },

    // ---------------------------------------------------------------------
    // Sizes

    /**
     * Updates the size of the specified element in the container to be sure
     * that all previous siblings have sufficient place. If the resulting size
     * is less than specified minimal value then this minimal value is used
     * instead.
     */
    _updateSize : function(container, element, minSize) {
        minSize = minSize || 0;
        var height = container.offsetHeight;
        var pos = DomUtils._getPosition(container, element);
        var size = Math.max(minSize, Math.min(height - pos.left));
        element.style.height = size + 'px';
    },

    _getOuterHeight : function(el) {
        var style = DomUtils._getStyle(el);
        var height = el.offsetHeight;
        height += parseInt(style.paddingTop || 0) +
                parseInt(style.paddingBottom || 0);
        return height;
    },

    _getOuterWidth : function(el) {
        var style = DomUtils._getStyle(el);
        var width = el.offsetWidth;
        width += parseInt(style.paddingLeft || 0) +
                parseInt(style.paddingRight || 0);
        return width;
    },

    _calculateHeight : function(parent, prev, ignoreHeight) {
        var parentHeight = DomUtils._getOuterHeight(parent);
        var top = 0;
        if (prev) {
            var position = DomUtils._getPosition(prev, parent);
            top = position.top;
            if (!ignoreHeight) {
                top += DomUtils._getOuterHeight(prev);
            }
        }
        var height = parentHeight - top;
        height = Math.max(height, 0);
        return height;
    },

    // ---------------------------------------------------------------------
    // Window resize listener

    _addResizeListener : function(listener) {
        window.addEventListener('resize', listener);
    },
    _removeResizeListener : function(listener) {
        window.removeEventListener('resize', listener);
    },

    // ---------------------------------------------------------------------
    // Styles

    _getStyle : function(el) {
        var style = el.currentStyle || window.getComputedStyle(el) || {};
        return style;
    },

    // ---------------------------------------------------------------------
    // Element class name manipulations

    _toggleClass : function(el, name) {
        if (DomUtils._hasClass(el, name)) {
            DomUtils._removeClass(el, name);
        } else {
            DomUtils._addClass(el, name);
        }
    },

    // Copied (with modifications) from the Leaflet library (MIT license)
    // L.DomUtil utility class

    _hasClass : function(el, name) {
        if (el.classList !== undefined) {
            return el.classList.contains(name);
        }
        var className = DomUtils._getClass(el);
        return className.length > 0 &&
                new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    },

    _addClass : function(el, name) {
        if (el.classList !== undefined) {
            var classes = L.Util.splitWords(name);
            for (var i = 0, len = classes.length; i < len; i++) {
                el.classList.add(classes[i]);
            }
        } else if (!DomUtils._hasClass(el, name)) {
            var className = DomUtils._getClass(el);
            DomUtils._setClass(el, (className ? className + ' ' : '') + name);
        }
    },

    _removeClass : function(el, name) {
        if (el.classList !== undefined) {
            el.classList.remove(name);
        } else {
            DomUtils._setClass(el, L.Util
                    .trim((' ' + DomUtils._getClass(el) + ' ').replace(' ' +
                            name + ' ', ' ')));
        }
    },

    _setClass : function(el, name) {
        if (el.className.baseVal === undefined) {
            el.className = name;
        } else {
            // in case of SVG element
            el.className.baseVal = name;
        }
    },

    _getClass : function(el) {
        return el.className.baseVal === undefined ? el.className
                : el.className.baseVal;
    },

};

module.exports = DomUtils;
