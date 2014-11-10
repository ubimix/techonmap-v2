var _ = require('underscore');
var DomUtilsMixin = {
    _calculateHeight : function(parent, prev, ignoreHeight) {
        var parentHeight = this._getOuterHeight(parent);
        var top = 0;
        if (prev) {
            var position = this._getPosition(prev, parent);
            top = position.top;
            if (!ignoreHeight) {
                top += this._getOuterHeight(prev);
            }
        }
        var height = parentHeight - top;
        height = Math.max(height, 0);
        return height;
    },
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
    _getOuterHeight : function(el) {
        var style = this._getStyle(el);
        var height = el.offsetHeight;
        height += parseInt(style.paddingTop || 0) +
                parseInt(style.paddingBottom || 0);
        return height;
    },
    _getOuterWidth : function(el) {
        var style = this._getStyle(el);
        var width = el.offsetWidth;
        width += parseInt(style.paddingLeft || 0) +
                parseInt(style.paddingRight || 0);
        return width;
    },
    _getStyle : function(el) {
        var style = el.currentStyle || window.getComputedStyle(el) || {};
        return style;
    },

    _addResizeListener : function(listener) {
        window.addEventListener('resize', listener);
    },
    _removeResizeListener : function(listener) {
        window.removeEventListener('resize', listener);
    },

    // ---------------------------------------------------------------------
    // Element class name manipulations

    _toggleClass : function(el, name) {
        if (this._hasClass(el, name)) {
            this._removeClass(el, name);
        } else {
            this._addClass(el, name);
        }
    },

    // Copied (with modifications) from the Leaflet library (MIT license)
    // L.DomUtil utility class

    _hasClass : function(el, name) {
        if (el.classList !== undefined) {
            return el.classList.contains(name);
        }
        var className = this._getClass(el);
        return className.length > 0 &&
                new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    },

    _addClass : function(el, name) {
        if (el.classList !== undefined) {
            var classes = L.Util.splitWords(name);
            for (var i = 0, len = classes.length; i < len; i++) {
                el.classList.add(classes[i]);
            }
        } else if (!this._hasClass(el, name)) {
            var className = this._getClass(el);
            this._setClass(el, (className ? className + ' ' : '') + name);
        }
    },

    _removeClass : function(el, name) {
        if (el.classList !== undefined) {
            el.classList.remove(name);
        } else {
            this._setClass(el, L.Util.trim((' ' + this._getClass(el) + ' ')
                    .replace(' ' + name + ' ', ' ')));
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

module.exports = DomUtilsMixin;
