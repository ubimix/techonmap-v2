/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
module.exports = {
    _formatAddr : function(props) {
        var cityInfo = [props.postcode, props.city];
        cityInfo = _.filter(cityInfo, notEmpty);
        cityInfo = cityInfo.length ? cityInfo.join(' ') : undefined;
        var arr = [ props.address, cityInfo];
        arr = _.filter(arr, notEmpty);
        return arr.length ? arr.join(', ') : undefined;
    },
    _formatTel : function(str, prefix) {
        str = this._normalizeTel(str);
        if (isEmpty(str))
            return undefined;
        return [ prefix, str ];
    },
    _formatRef : function(href, options) {
        options = options || {};
        var label = options.label || href;
        if (!href)
            return undefined;
        return React.DOM.a(_.extend({}, options, {
            href : href
        }), label);
    },
    _formatUrl : function(href) {
        var url = href || '';
        if (url.indexOf('http') != 0)
            url = 'http://' + url;
        var urlLabel = url;
        if (urlLabel) {
            urlLabel = urlLabel.replace(/^https?:\/\//, '');
        }
        if (urlLabel.length > 40)
            urlLabel = 'En savoir plus';
        return {
            url : url,
            label : urlLabel
        };
    },        
    _wrap : function(val, prefix, suffix) {
        if (!val)
            return undefined;
        return _.filter([ prefix, val, suffix ], notEmpty);
    },
    _normalizeTel : function(str) {
        if (isEmpty(str))
            return undefined;
        str = str.replace(/^[\s\r\n ]+|[\s\r\n ]+$/gim, '');
        str = str.replace(/[\s\r\n ]+/gim, '.');
        return str;
    }
};

function isEmpty(s) {
    return !s || s.length === undefined || !s.length;
}
function notEmpty(s) {
    return s && (s.length === undefined || s.length);
}
