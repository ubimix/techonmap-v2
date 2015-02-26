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
var EditEntityForm = require('./EditEntityForm.jsx');

var schema = require('../utils/EntityEditFormSchema')();

var EditEntityPopup = Mosaic.Class.extend(DomUtils, I18NMixin,
        Mosaic.Events.prototype, ContentPopupMixin, {

    initialize : function(options){
        this.setOptions(options);
        this.validator = new BootstrapFormValidator({ schema: schema });
    },
    getApp : function() {
        return this.options.app;
    },
    _showMessage : function(msg) {
        window.alert(msg);
    },
    _submitForm : function(data){
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
        var form = (
            <EditEntityForm app={that.getApp()} validator={this.validator} />
        );
        var footer = (
            <div>
                <button type="submit" className="btn btn-primary"
                    onClick={function(ev){
                        var info = this.validator.onViewUpdate();
                        console.log('>>', info);
                        if (info.result.valid) {
                            // that._submitForm(info.data);
                        }
                        ev.preventDefault();
                        ev.stopPropagation();
                    }.bind(this)}>
                    {this._getLabel('dialog.edit.btn.save')}
                </button>
                <button type="button" className="btn"
                    onClick={function(){
                        console.log('Cancel !', dialog);
                        PopupPanel.closePopup();
                    }}>
                    {this._getLabel('dialog.edit.btn.cancel')}
                </button>
            </div>
        );
        var title = 'Entity - Edit 123';
        
        PopupPanel.openPopup({
            title : title,
            body : form,
            footer : footer,
            onOpen : function(d) {
                dialog = d;
            },
            onClose : function(d){
                dialog = null;
            },
            verticalMargin : 40
        });
    },
 
});
 
module.exports = EditEntityPopup;
