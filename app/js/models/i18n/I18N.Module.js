var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var App = require('mosaic-core').App;
var Api = App.Api;
var AppStateMixin = require('../AppStateMixin');

/** An API allowing to manage I18N lines visibility. */
module.exports = Api.extend({}, AppStateMixin, {

    /**
     * Initializes internal fields.
     */
    _initFields : function() {
        this._messages = {
            en : {}
        };
    },

    /**
     * Loads information about selected/active entities.
     */
    start : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._loadMessages().then(function(config) {
                that._messages = config.messages;
                that.notify();
            });
        });
    },

    /** Closes this module. */
    stop : function() {
    },

    /** Returns a message/label corresponding to the specified key. */
    getMessage : function(key) {
        var languageKey = this.getLanguage();
        var msg = this._messages[languageKey][key];
        if (!msg) {
            languageKey = this.getDefaultLanguage();
            msg = this._messages[languageKey][key];
        }
        if (!msg) {
            msg = key;
        }
        var args = _.toArray(arguments);
        args.shift();
        if (msg.indexOf('{') >= 0) {
            msg = msg.replace(/\{(\d+)\}/gim, function() {
                return args[arguments[1]];
            });
        }
        var templ = _.template(msg);
        msg = templ.apply(this, args);
        return msg;
    },

    getMessage1 : function(key) {
        var messages = this._getMessagesDictionary();
        var args = [ messages ].concat(_.toArray(arguments));
        return this._getMessage.apply(this, args);
    },

    getValidationMessage : function(key) {
        return this.getValues.apply(this, arguments);
    },
    getValues : function(key) {
        var messages = this._getMessagesDictionary();
        messages = messages['validationMessages'] || {};
        var args = [ messages ].concat(_.toArray(arguments));
        return this._getMessages.apply(this, args);
    },

    getFormValidationMessages : function() {
        var language = this.getLanguage();
        var obj = this._messages[language] || {};
        return obj['validationMessages'];
    },

    _getMessagesDictionary : function() {
        var languageKey = this.getLanguage();
        var messages = this._messages[languageKey];
        if (!messages) {
            languageKey = this.getDefaultLanguage();
            messages = this._messages[languageKey] || {};
        }
        return messages;
    },

    _getMessages : function(messages, key) {
        messages = messages || {};
        var msg = messages[key];
        if (!msg) {
            msg = key;
        }
        var args = _.toArray(arguments);
        args.shift();
        args.shift();
        if (msg.indexOf('{') >= 0) {
            msg = msg.replace(/\{(\d+)\}/gim, function() {
                return args[arguments[1]];
            });
        }
        var templ = _.template(msg);
        msg = templ.apply(this, args);
        return msg;
    },

    /* Internal methods used by the I18N.Module class */

    /** Updates the currently used language. */
    _setLanguage : function(languageKey) {
        if (!_.has(this.messages, languageKey)) {
            console.log('ERROR! try to use an inavailable language: ',
                    languageKey);
            languageKey = this.getDefaultLanguage();
        }
        this.setLanguage(languageKey);
    },

    _loadMessages : function() {
        var that = this;
        return Mosaic.P.then(function() {
            return that._getJson({
                path : that.app.options.messages
            })
        })
    },

});
