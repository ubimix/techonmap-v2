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
    open : function(resource) {
        resource = resource || {};
        var that = this;
        var app = that.options.app;
        var closeListener = function(){
            if (!app.edit.isEditing()) {
                app.edit.removeChangeListener(closeListener);
                PopupPanel.closePopup();
            }
        };
        app.edit.addChangeListener(closeListener);
        app.edit.startEdit({
            resource: resource
        }).then(function(){
            var dialog;
            var form = (
                <EditEntityForm app={that.getApp()} key="editform"/>
            );
            var footer = (
                <div key="footer">
                    <button type="submit" className="btn btn-primary"
                        onClick={function(ev){
                            if (app.edit.isValid()) {
                                app.edit.endEdit({
                                   save : true 
                                });
                            }
                            ev.preventDefault();
                            ev.stopPropagation();
                        }.bind(that)}>
                        {that._getLabel('dialog.edit.btn.save')}
                    </button>
                    <button type="button" className="btn"
                        onClick={function(){
                            console.log('Cancel !', dialog);
                            PopupPanel.closePopup();
                        }}>
                        {that._getLabel('dialog.edit.btn.cancel')}
                    </button>
                </div>
            );
            var title = '';
            return PopupPanel.openPopup({
                title : title,
                body : form,
                footer : footer,
                key: "edit-popup",
                disableEsc : true,
                onOpen : function(d) {
                    dialog = d;
                },
                onClose : function(d){
                    app.edit.removeChangeListener(closeListener);
                    dialog = null;
                },
                verticalMargin : 40
            });            
        });
    },
});
 
module.exports = EditEntityPopup;
