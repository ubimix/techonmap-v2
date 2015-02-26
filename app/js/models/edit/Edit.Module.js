var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var revalidator = require('revalidator');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');
var App = require('mosaic-core').App;
var Api = App.Api;
var Schema = require('../../views/utils/EntityEditFormSchema')();

/** This module manages resource editing process. */
module.exports = Api.extend({

    /**
     * Initializes internal fields.
     */
    _initFields : function() {
        this._changedResourceFields = {};
    },

    /**
     * Loads information about selected/active entities.
     */
    start : function() {
    },

    /** Closes this module. */
    stop : function() {
    },

    isEditing : function() {
        return !!this._resource;
    },

    startEdit : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            if (that.isEditing()) {
                throw new Error('A resource is already editing');
            }
            that._original = intent.params.resource;
            that._doReset();
        })).then(function() {
            that.notify();
        });
    }),

    getResource : function() {
        return this._resource;
    },

    getResourceValue : function(name, pos) {
        name = name || '';
        var segments = name.split('.');
        var len = segments ? segments.length : 0;
        var obj = this._resource;
        var i;
        var segment;
        for (i = 0; obj && i < len; i++) {
            segment = segments[i];
            obj = obj[segment];
        }
        if (_.isArray(obj)) {
            return pos >= 0 && pos < obj.length ? obj[pos] : null;
        } else {
            return pos === 0 ? obj : null;
        }
    },

    reset : Api.intent(function(intent) {
        var that = this;
        var update = false;
        return intent.resolve(Mosaic.P.then(function() {
            if (that.isEditing() && that._isChanged()) {
                update = true;
                that._doReset();
            }
        })).then(function() {
            if (update) {
                that.notify();
            }
        });
    }),

    save : function() {
        return this.endEdit({
            save : true
        });
    },

    cancel : function() {
        return this.endEdit({
            save : false
        });
    },

    endEdit : Api.intent(function(intent) {
        var that = this;
        var notify = false;
        return intent.resolve(Mosaic.P.then(function() {
            notify = that.isEditing();
            if (!notify)
                return;
            var resource = that._resource;
            delete that._original;
            delete that._resource;
            delete that._changedResourceFields;
            delete that._validationResults;
            if (intent.params.save) {
                return that._saveResource(resource);
            }
        })).then(function() {
            if (notify) {
                that.notify();
            }
        });
    }),

    updateFields : Api.intent(function(intent) {
        var that = this;
        var notify = false;
        return intent.resolve(Mosaic.P.then(function() {
            if (!that.isEditing())
                return;
            var resource = that._resource;
            _.each(intent.params, function(values, name) {
                notify |= that._setResourceFieldValue(resource, name, values);
            });
            if (notify) {
                that._validateResource();
            }
        })).then(function() {
            if (notify) {
                that.notify();
            }
        });
    }),

    isValid : function() {
        if (!this._validationResults)
            return undefined;
        return this._validationResults.valid;
    },

    getFieldError : function(name) {
        if (!this._validationResults)
            return undefined;
        var error = this._validationResults.errorIndex[name];
        return error ? error.message : null;
    },

    _doReset : function() {
        this._resource = this._clone(this._original)
        this._changedResourceFields = {};
        this._validateResource();
    },

    _validateResource : function() {
        var schema = this.getSchema();
        this._validationResults = revalidator.validate(this._resource, schema,
                {
                    cast : true
                });
        this._validationResults.errorIndex = {};
        _.each(this._validationResults.errors, function(err) {
            var property = err.property;
            this._validationResults.errorIndex[property] = err;
        }, this);
        return this._validationResults;
    },

    _setResourceFieldValue : function(resource, name, values) {
        var segments = name.split('.');
        var len = segments ? segments.length : 0;
        var obj = resource;
        var i;
        var segment;
        for (i = 0; i < len - 1; i++) {
            segment = segments[i];
            obj = obj[segment] = obj[segment] || {};
        }
        segment = segments[i];
        var fieldSchema = this._getFieldSchema(segments);
        var type = fieldSchema ? fieldSchema.type : undefined;
        var val = (type == 'array' || values.length > 1) ? values
                : values[0];
        if (!val) {
            delete obj[segment];
        } else {
            obj[segment] = val;
        }
        return true;
    },

    _getFieldSchema : function(segments) {
        var schema = this.getSchema();
        var len = segments ? segments.length : 0;
        var i;
        for (i = 0; schema && i < len; i++) {
            var segment = segments[i];
            var props = schema.properties || {};
            schema = props[segment];
        }
        return schema;
    },

    getSchema : function() {
        return Schema;
    },

    _clone : function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    _isChanged : function() {
        var resource = this._resource;
        return JSON.stringify(resource) !== JSON.stringify(this._original);
    },

    _saveResource : function(resource) {
        console.log('SAVE RESOURCE: ', resource);
    },

});
