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

var schema = require('./EntityEditFormSchema')();
var validator = new BootstrapFormValidator({ schema: schema });


// MVP
// changes in fields => changes in the model
// - update visibility fields
// - update validation messages for each field
// Internally the presenter should use validator to verify the state of the
// object
// 
var CategoryTags = Mosaic.Class.extend({
    initialize : function(options){
        this.setOptions(options);
        var fields = this.options.fields;
        var categories = this.options.categories;
        var categoryField = fields['category'];
        _.each(categories, function(category){
            var key = category.key;
            var tags = category.tags;
            var label = category.label;
            // var option = document.createElement('');
        });
    },
    
});

var AddressValidator = Mosaic.Class.extend({
    initialize : function(options){
        this.setOptions(options);
        var fields = this.options.fields; // Fields mapping
        // Get the 'address', 'postcode', 'city' fields
        // Get the 'coords.lat' and 'coords.lng' fields
        
        // -------------
        // Name - identifier
        // if identifier already exists: sets the ID as an immutable value
        // otherwise - attach a listener to the name input
        // changes in the name => changes in the ID
        // changes in the ID field => verification that this ID does not exist
        // => show error messages
        // => show a modified identifier
        
    },
    
    
});

var EditEntityPopup = Mosaic.Class.extend(DomUtils, I18NMixin,
        Mosaic.Events.prototype, ContentPopupMixin, {

    initialize : function(options){
        this.setOptions(options);
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
        var footer = (
            <div>
                <button type="submit" className="btn btn-primary"
                    onClick={function(ev){
                        var elm = dialog.getDOMNode();
                        var body = elm.querySelector('.modal-body');
                        var info = validator.validateForm(body);
                        
                        console.log('info ', info);
                        if (info.result.valid) {
                            // that._submitForm(info.data);
                        }
                        ev.preventDefault();
                        ev.stopPropagation();
                    }}>
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
        this._showContentDialog({
            url : 'entity-edit.md',
            footer : footer,
            onOpen : function(d) {
                dialog = d;
            },
            onClose : function(d){
                dialog = null;
            }
        });
    },
 
});

module.exports = EditEntityPopup;
