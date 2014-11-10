define(
// Dependencies
[ 'require', 'underscore', 'mosaic-commons', 'mosaic-core' ],
// Module
function(require) {
    var _ = require('underscore');
    var Mosaic = require('mosaic-commons');

    /** An API allowing to manage I18N lines visibility. */
    var Api = Mosaic.App.Api;
    return Api.extend({

        /**
         * Initializes internal fields.
         */
        _initFields : function() {
            this._messages = {
                en : {}
            };
            this._defaultLanguageKey = 'en';
            this._languageKey = this._defaultLanguageKey;
        },

        /**
         * Loads information about selected/active entities.
         */
        start : function() {
            var that = this;
            return Mosaic.P.then(function() {
                return that._loadMessages().then(function(config) {
                    that._messages = config.messages;
                    that._defaultLanguageKey = config.defaultLanguage;
                    that._languageKey = that._defaultLanguageKey;
                    that.notify();
                });
            });
        },

        /** Closes this module. */
        stop : function() {
        },

        /** Returns a message/label corresponding to the specified key. */
        getMessage : function(key) {
            var msg = this._messages[this._languageKey][key];
            if (!msg) {
                msg = this._messages[this._defaultLanguageKey][key];
            }
            if (!msg) {
                msg = key;
            }
            if (msg.indexOf('{') > 0) {
                var args = _.toArray(arguments);
                args.splice(0, 1);
                msg = msg.replace(/\{(\d+)\}/gim, function() {
                    return args[arguments[1]];
                });
                var templ = _.template(msg);
                msg = templ.apply(this, args);
            }
            return msg;
        },

        /* Internal methods used by the I18N.Module class */

        /** Updates the currently used language. */
        _setLanguage : function(languageKey) {
            if (!_.has(this.messages, languageKey)) {
                console.log('ERROR! try to use an inavailable language: ',
                        languageKey);
                languageKey = this._defaultLanguageKey;
            }
            this._languageKey = languageKey;
        },

        _loadMessages : function() {
            return Mosaic.P.then(function() {
                // FIXME:
                return {
                    defaultLanguage : 'en',
                    "messages" : {
                        "fr" : {},
                        "en" : {}
                    }
                };
                return that._getJson({
                    path : that.app.options.messages
                })
            })
        },

    });

});