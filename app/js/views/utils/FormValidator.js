var revalidator = require('revalidator');
var Mosaic = require('mosaic-commons');
var _ = require('underscore');

var FormValidator = Mosaic.Class.extend({

    initialize : function(options) {
        this.setOptions(options);
        this._schema = this._newSchema();
        // Overload the default messages
        var messages = this._getMessages();
        _.each(this._schema.properties, function(prop, key) {
            prop.messages = _.extend({}, messages, prop.messages);
        });
    },

    getFieldSchema : function(path) {
        var array = this._splitPath(path);
        var schema = this._schema;
        var i;
        for (i = 0; schema && schema.properties && i < array.length; i++) {
            segment = array[i];
            schema = schema.properties[segment];
        }
        return i == array.length ? schema : null;
    },

    extractFields : function(elm) {
        function visit(e, fields) {
            var name = e.nodeName;
            if (!name)
                return;
            name = name.toLowerCase();
            var path;
            var val;
            if ((name == 'input') || (name == 'textarea') || //
            (name == 'select')) {
                path = e.getAttribute('name');
            }
            if (path) {
                var array = fields[path] = fields[path] || [];
                array.push(e);
            }
            var child = e.firstChild;
            while (child) {
                if (child.nodeType == 1) {
                    visit(child, fields);
                }
                child = child.nextSibling;
            }
        }
        var result = {};
        visit(elm, result);
        return result;
    },

    validateFields : function(fields) {
        var data = this._getValuesFromFields(fields);
        var result = this.validate(data);
        return {
            result : result,
            data : data
        };
    },

    _getValuesFromFields : function(fields) {
        var data = {};
        _.each(fields, function(array, path) {
            var values = [];
            _.each(array, function(elm) {
                var val = this._getFieldValue(elm);
                if (val) {
                    values.push(val);
                }
            }, this);
            if (values.length) {
                var segments = this._splitPath(path);
                var len = segments ? segments.length : 0;
                var obj = data;
                var i;
                var segment;
                for (i = 0; i < len - 1; i++) {
                    segment = segments[i];
                    obj = obj[segment] = obj[segment] || {};
                }
                segment = segments[i];
                obj[segment] = values.length > 1 ? values : values[0];
            }
        }, this);
        return data;
    },

    _getFieldValue : function(elm) {
        var val = elm.value;
        if (!val)
            return;
        return val;
    },

    validate : function(obj) {
        return revalidator.validate(obj, this._schema, {
            cast : true
        });
    },

    _newSchema : function() {
        var schema = this.options.schema || {};
        return schema;
    },

    _splitPath : function(path) {
        if (!path)
            return [];
        return path.split('.');
    },

    _getMessages : function() {
        return {
            required : "Is required",
            allowEmpty : "Must not be empty",
            minLength : "Is too short (minimum is %{expected} characters)",
            maxLength : "Is too long (maximum is %{expected} characters)",
            pattern : "Invalid input",
            minimum : "Must be greater than or equal to %{expected}",
            maximum : "Must be less than or equal to %{expected}",
            exclusiveMinimum : "Must be greater than %{expected}",
            exclusiveMaximum : "Must be less than %{expected}",
            divisibleBy : "Must be divisible by %{expected}",
            minItems : "Must contain more than %{expected} items",
            maxItems : "Must contain less than %{expected} items",
            uniqueItems : "Must hold a unique set of values",
            format : "Is not a valid %{expected}",
            conform : "Must conform to given constraint",
            type : "Must be of %{expected} type",
            additionalProperties : "Must not exist",
            'enum' : "Must be present in given enumerator"
        };
    }

});

module.exports = FormValidator;
