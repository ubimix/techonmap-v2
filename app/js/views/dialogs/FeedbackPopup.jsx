/**
 * @jsx React.DOM
 */
'use strict';
var _ = require('underscore');
var React = require('react');
var Mosaic = require('mosaic-commons');
var I18NMixin = require('../utils/I18NMixin');
var DomUtils = require('../utils/DomUtils');
var PopupPanel = require('mosaic-core').React.PopupPanel;
var ContentPopupMixin = require('../utils/ContentPopupMixin');
var BootstrapFormValidator = require('../utils/BootstrapFormValidator');
var FormField = require('../utils/FormField');

var schema = {
    properties : {
        name : {
            description : 'Votre nom',
            type : 'string',
            required : true,
            messages : {
                required : "Un nom est requis.",
                allowEmpty : "Le nom ne doit pas être vide.",
            }
        },
        email : {
            description : 'Votre adresse e-mail',
            type : 'string',
            format : 'email',
            required : true,
            messages : {
                required : "Une adresse e-mail est requise.",
                allowEmpty : "L'adresse e-mail ne doit pas être vide.",
                format : "L'adresse e-mail semble incorrecte.",
            }                
        },
        reason : {
            description : 'Choisissez une raison',
            type : 'string',
            enum : [ 'technical', 'data', 'other' ],
            required : true,
            messages : {
                required : "Merci d'indiquer la raison de votre envoi."
            }                  
        },
        content : {
            description : 'Votre message',
            type : 'string',
            required : true,
            messages : {
                required : "Un contenu est requis.",
                allowEmpty : "Le contenu ne doit pas être vide."
            }                 
        }
    }
};

var FeedbackPopup = Mosaic.Class.extend(DomUtils, I18NMixin,
        Mosaic.Events.prototype, ContentPopupMixin, {

    initialize : function(options){
        this.setOptions(options);
        this.validator = new BootstrapFormValidator({
            schema : schema
        });
    },
    getApp : function() {
        return this.options.app;
    },
    _showMessage : function(msg) {
        window.alert(msg);
    },
    _submitContactForm : function(data){
        var that = this;
        var app = that.getApp();
        app.contact.validateMessage(data)//
        .then(function(data){
            return app.contact.sendMessage(data)//
                .then(function(result){
                    var msg = that._getLabel('dialog.contact.result.ok');
                    that._showMessage(msg);
                    PopupPanel.closePopup();
                }, function(err) {
                    var msg = that._getLabel(
                        'dialog.contact.result.errors',
                         { error : err });
                    that._showMessage(msg);
                });
        }, function(err) {
            var msg = that._getLabel('dialog.contact.invalide', {
                error : err
            });
            that._showMessage(msg);
        });
    },
    open : function() {
        var that = this;
        var dialog;
        var footer = (
            <div>
                <button type="submit" className="btn btn-primary"
                    onClick={function(ev){
                        var info = that.validator.onViewUpdate();
                        if (info.result.valid) {
                            that._submitContactForm(info.data);
                        }
                        ev.preventDefault();
                        ev.stopPropagation();
                    }}>
                    {this._getLabel('dialog.contact.btn.send')}
                </button>
                <button type="button" className="btn btn-primary"
                    onClick={function(){
                        console.log('Cancel !', dialog);
                        PopupPanel.closePopup();
                    }}>
                    {this._getLabel('dialog.contact.btn.cancel')}
                </button>
            </div>
        );
        this._showContentDialog({
            url : 'contact.md',
            footer : footer,
            onOpen : function(d) {
                dialog = d;
                var elm = dialog.getDOMNode();
                var body = elm.querySelector('.modal-body');
                var fields = FormField.extractFields(body);
                that.validator.setFields(fields);
                function onBlur(input) {
                    var name = input.getAttribute('name');
                    that.validator.onFieldUpdate(name);
                }
                _.each(body.querySelectorAll('input'), function(input){
                    input.addEventListener('blur', onBlur.bind(that, input));
                });
                _.each(body.querySelectorAll('textarea'), function(input){
                    input.addEventListener('blur', onBlur.bind(that, input));
                });
                _.each(body.querySelectorAll('select'), function(input){
                    input.addEventListener('blur', onBlur.bind(that, input));
                });
            },
            onClose : function(d){
                dialog = null;
            }
        });
    },
 
});

module.exports = FeedbackPopup;
