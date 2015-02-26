/**
 * @jsx React.DOM
 */
'use strict';
var _ = require('underscore');
var React = require('react');
var Mosaic = require('mosaic-commons');
var I18NMixin = require('../utils/I18NMixin');
var DomUtils = require('../utils/DomUtils');
var FormReactField = require('../utils/FormReactField');


module.exports = React.createClass({
    mixins: [I18NMixin],
    getApp: function(){
        return this.props.app;
    },
    componentDidMount  : function(){
        var fields = FormReactField.extractFields(this);
        this.props.validator.setFields(fields);
    },
    componentWillMount :function(){
        this._clear();  
    },
    componentWillReceiveProps : function(){
        this._clear();  
    },
    _clear : function(){
        this._fieldRefs = {};
    },
    _getFieldRef : function(fieldKey) {
        var counter = this._fieldRefs[fieldKey] || 0;
        this._fieldRefs[fieldKey] = counter + 1;
        return fieldKey + '-' + counter;
    },
    _renderFormGroup : function(labelKey, input){
        var id = input.props.id;
        return (
            <div className="form-group">
                <label htmlFor={id} className="col-sm-3 control-label">
                    {this._getLabel(labelKey)}
                </label>
                <div className="col-sm-9">
                    {input}
                </div>
            </div>
        );
    },
    
    _isNewEntity : function(){
        return true;
    },
    _newId : function(){
        return _.uniqueId('field-');
    },

    _onUpdate : function(fieldKey) {
        this.props.validator.onFieldUpdate(fieldKey);
    },
    _renderInput : function(fieldKey, labelKey, options){
        var fieldRef = this._getFieldRef(fieldKey);
        var that = this;
        options = _.extend({
            className: 'form-control',
            placeholder: labelKey ? this._getLabel(labelKey) : undefined,
            id: this._newId(),
            name: fieldKey,
            ref : fieldRef,
            key : fieldRef,
            type : 'text',
            onBlur : this._onUpdate.bind(this, fieldKey)
        }, options);
        return React.DOM.input(options);
    },
    _renderTextarea : function(fieldKey, labelKey, options){
        var fieldRef = this._getFieldRef(fieldKey);
        options = _.extend({
            className: 'form-control',
            placeholder: labelKey ? this._getLabel(labelKey) : undefined,
            id: this._newId(),
            name: fieldKey,
            ref : fieldRef,
            key : fieldRef,
            rows : 10,
            cols : 80,
            style : {width:'100%'},
            onBlur : this._onUpdate.bind(this, fieldKey)
        }, options);
        return React.DOM.textarea(options);
    },
    _renderSelect : function(fieldKey, params) {
        var options = params.options;
        var selected = params.selected;
        delete params.options;
        delete params.selected;
        var fieldRef = this._getFieldRef(fieldKey);
        params = _.extend({
            className: 'form-control',
            id: this._newId(),
            name : fieldKey,
            ref: fieldRef,
            key : fieldRef,
            defaultValue : selected,
            onBlur : this._onUpdate.bind(this, fieldKey)
        }, params);
        return React.DOM.select(params, _.map(options, function(label, value){
            return React.DOM.option({
                value : value
            }, label);
        }));
    },
    _renderNameAndId : function(){
        var keyInput;
        if (this._isNewEntity()) {
            keyInput = this._renderInput('id', 'dialog.edit.id.placeholder');
        } else {
            keyInput = (
                <span id={this._newId()}>
                    <span className="form-control">ID Goes here</span>
                    {this._renderInput('id', 'dialog.edit.id.placeholder', {
                        type: 'hidden'
                    })}
                </span>
            );
        }
        var nameInput = this._renderInput('name',
                'dialog.edit.name.placeholder', {
            autofocus : "autofocus",
        });
        return [
            this._renderFormGroup('dialog.edit.name.label', nameInput),
            this._renderFormGroup('dialog.edit.id.label', keyInput),
        ];
    },
    
    _renderMail : function(){
        return this._renderFormGroup('dialog.edit.email.label', 
           this._renderInput('email', 'dialog.edit.email.placeholder', {
                type : 'email'
           }));
    },
    _renderDescription : function(){
        return this._renderFormGroup('dialog.edit.description.label', 
                this._renderTextarea('description',
                'dialog.edit.description.placeholder', {
           }));
    },
    _renderCategoriesAndTags : function(){
        var select = this._renderSelect(
            'category', {
                selected : 'entreprise', 
                options : {
                    'Entreprise' : 'Entreprise',
                    'Tiers-lieu' : 'Tiers-lieu',
                    'Incubateur' : 'Incubateur',
                    'Investisseur' : 'Investisseur',
                    'Communauté' : 'Communauté',
                    'Ecole' : 'Ecole',
                    'Acteur public' : 'Acteur public',
                    // 'entreprise' : 'Entreprise',
                    // 'tiers-lieu' : 'Tiers-lieu',
                    // 'incubator' : 'Incubateur',
                    // 'investor' : 'Investisseur',
                    // 'community' : 'Communauté',
                    // 'school' : 'Ecole',
                    // 'public_actor' : 'Acteur public'
                }
            });
        var tags = [];
        for (var i=0; i < 5; i++) {
            tags.push(this._renderInput('tag', 'dialog.edit.tag.placeholder'));
        }
        var tagContainer = React.DOM.span({
            id: this._newId()
        }, tags);
        return [
            this._renderFormGroup('dialog.edit.category.label', select),
            this._renderFormGroup('dialog.edit.tag.label', tagContainer)
        ];
    },
    
    _renderAddressAndCoordinates : function(){
        var streetField = this._renderInput('address', 'dialog.edit.address.placeholder', {
        });
        var postcodeField = this._renderInput('postcode', 'dialog.edit.postcode.placeholder', {
        });
        var cityField = this._renderInput('city', 'dialog.edit.city.placeholder', {
        });
        var latField = this._renderInput('latitude', null, {
            type : 'hidden'
        });
        var lngField = this._renderInput('longitude', null, {
            type : 'hidden'
        });
        
        var coordsFields = (
            <div className="form-group">
              <label className="col-sm-3 control-label">Coordinates</label>
              <div className="col-sm-4">
                <label htmlFor={this._newId()}>Latitude</label>
                <input type="text" className="form-control" id={this._newId()} ref="latitude" name="coordinates.lat" placeholder="Latitude" />
              </div>
              <div className="col-sm-4">
                <label htmlFor={this._newId()}>Longitude</label>
                <input type="text" className="form-control" id={this._newId()} ref="longitude" name="coordinates.lng" placeholder="Longitude" />
              </div>
            </div>
        );
        return [
            this._renderFormGroup('dialog.edit.address.label', streetField),
            this._renderFormGroup('dialog.edit.postcode.label', postcodeField),
            this._renderFormGroup('dialog.edit.city.label', cityField),
            coordsFields
        ];
    },
    
    _renderCreationYear : function(){
        var input = this._renderInput('creationyear',
                'dialog.edit.year.placeholder', {
        });
        return this._renderFormGroup('dialog.edit.year.label', input);
    },
    
    _renderWebSiteUrl : function(){
        var input = this._renderInput('url', 'dialog.edit.url.placeholder', {
        });
        return this._renderFormGroup('dialog.edit.url.label', input);
    },
    
    _renderTwitterAccount : function(){
        var input = this._renderInput('twitter', 'dialog.edit.twitter.placeholder', {
        });
        return this._renderFormGroup('dialog.edit.twitter.label', input);
    }, 
    
    _renderFacebookAccount : function(){
        var input = this._renderInput('facebook', 'dialog.edit.facebook.placeholder', {
        });
        return this._renderFormGroup('dialog.edit.facebook.label', input);
    }, 
    
    _renderLinkedInAccount : function(){
        var input = this._renderInput('linkedin', 'dialog.edit.linkedin.placeholder', {
        });
        return this._renderFormGroup('dialog.edit.linkedin.label', input);
    },
    
    _renderGooglePlusAccount : function(){
        var input = this._renderInput('googleplus', 'dialog.edit.googleplus.placeholder', {
        });
        return this._renderFormGroup('dialog.edit.googleplus.label', input);
    },
    
    _renderViadeoAccount : function(){
        var input = this._renderInput('viadeo', 'dialog.edit.viadeo.placeholder', {
        });
        return this._renderFormGroup('dialog.edit.viadeo.label', input);
    },
    
    render : function(){
        return (
        <form className="form-horizontal">
            {this._renderNameAndId()}
            {this._renderMail()}
            {this._renderDescription()}
            {this._renderCategoriesAndTags()}
            {this._renderAddressAndCoordinates()}
            {this._renderCreationYear()}
            {this._renderWebSiteUrl()}
            {this._renderTwitterAccount()}
            {this._renderFacebookAccount()}
            {this._renderGooglePlusAccount()}
            {this._renderLinkedInAccount()}
            {this._renderViadeoAccount()}
        </form>
        );
    }
});