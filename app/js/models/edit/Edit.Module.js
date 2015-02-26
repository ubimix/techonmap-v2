var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var ResourceUtils = require('../../tools/ResourceUtilsMixin');
var App = require('mosaic-core').App;
var Api = App.Api;

/** This module manages resource editing process. */
module.exports = Api.extend({

    /**
     * Initializes internal fields.
     */
    _initFields : function() {
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

    edit : Api.intent(function(intent) {
        var that = this;
        return intent.resolve(Mosaic.P.then(function() {
            if (that.isEditing()) {
                throw new Error('A resource is already editing');
            }
            that._original = intent.params.resource;
            that._resource = that._clone(that._original);
        })).then(function() {
            that.notify();
        });
    }),

    reset : Api.intent(function(intent) {
        var that = this;
        var update = false;
        return intent.resolve(Mosaic.P.then(function() {
            if (that.isEditing() && that._isChanged()) {
                update = true;
                that._resource = that._clone(that._original)
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
            if (intent.params.save) {
                return that._saveResource(resource);
            }
        })).then(function() {
            if (notify) {
                that.notify();
            }
        });
    }),

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
