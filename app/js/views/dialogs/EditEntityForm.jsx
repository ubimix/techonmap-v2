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
    },
    componentWillMount : function(){
        this.props.app.edit.addChangeListener(this._redraw);
    },
    componentWillUnmount :function(){
        this.props.app.edit.removeChangeListener(this._redraw);
    },
    getInitialState : function(){
          return this._newState();
    },
    _redraw : function(){
        this.setState(this._newState());
    },
    _newState : function(){
        return {
            refs : {}
        };
    },
    componentWillReceiveProps : function(){
    },
    _getFieldRef : function(fieldKey) {
        var counter = this.state.refs[fieldKey] || 0;
        this.state.refs[fieldKey] = counter + 1;
        return fieldKey + '-' + counter;
    },
    _renderFormGroup : function(name, labelKey, input){
        var id = input.props.id;
        var errorMsg = this._getFieldError(name);
        var className = 'form-group';
        var messageBlock = null;
        if (!!errorMsg) {
            className = 'form-group has-error';
            messageBlock = (
                <div className="alert alert-warning" key="msg">{errorMsg}</div>
            );
        } 
        return (
            <div className={className} key={labelKey}>
                <label htmlFor={id} className="col-sm-3 control-label" key="left">
                    {this._getLabel(labelKey)}
                </label>
                <div className="col-sm-9" key="right">
                    {input}
                    {messageBlock}
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

    _onChange : function(fieldKey) {
        var values = [];
        _.each(this.refs, function(field) {
            var elm = field.getDOMNode();
            if (elm.getAttribute('name') == fieldKey) {
                var value = elm.value;
                if (value) {
                    values.push(value);
                }
            }
        });
        var fields = {};
        fields[fieldKey] = values;
        this.props.app.edit.updateFields(fields);
    },
    _getFieldError : function(fieldKey) {
        return this.props.app.edit.getFieldError(fieldKey);
    },
    _getResourceField : function(fieldKey, options) {
        options = options || {};
        var pos = options.pos || 0;
        var value = this.props.app.edit.getResourceValue(fieldKey, pos);
        return value || '';
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
            value : this._getResourceField(fieldKey, options),
            onChange : this._onChange.bind(this, fieldKey)
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
            value : this._getResourceField(fieldKey, options),
            onChange : this._onChange.bind(this, fieldKey)
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
            onChange : this._onChange.bind(this, fieldKey)
        }, params);
        return React.DOM.select(params, _.map(options, function(label, value){
            return React.DOM.option({
                value : value
            }, label);
        }));
    },
    _renderNameAndId : function(){
        var idInput;
        var newEntity = this._isNewEntity();
        if (newEntity) {
            idInput = this._renderInput('id', 'dialog.edit.id.placeholder', {
            });
        } else {
            idInput = (
                <span id={this._newId()}>
                    <span className="form-control">ID Goes here</span>
                    {this._renderInput('id', 'dialog.edit.id.placeholder', {
                        type: 'hidden'
                    })}
                </span>
            );
        }
        var that = this;
        var nameInput = this._renderInput('name',
                'dialog.edit.name.placeholder', {
            // autofocus : "autofocus",
        });
        return [
                this._renderFormGroup('name', 'dialog.edit.name.label', nameInput),
                this._renderFormGroup('id', 'dialog.edit.id.label', idInput),
            ];
    },
    
    _renderMail : function(){
        return this._renderFormGroup('email', 'dialog.edit.email.label', 
           this._renderInput('email', 'dialog.edit.email.placeholder', {
                type : 'email'
           }));
    },
    _renderDescription : function(){
        return this._renderFormGroup('description', 'dialog.edit.description.label', 
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
            tags.push(this._renderInput('tag', 'dialog.edit.tag.placeholder', {
                pos : i
            }));
        }
        var tagContainer = React.DOM.span({
            id: this._newId()
        }, tags);
        return [
            this._renderFormGroup('category', 'dialog.edit.category.label', select),
            this._renderFormGroup('tag', 'dialog.edit.tag.label', tagContainer)
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
            <div className="form-group" key="address">
              <label className="col-sm-3 control-label">Coordinates</label>
              <div className="col-sm-4" key="left">
                <label htmlFor={this._newId()}>Latitude</label>
                <input type="text" className="form-control" id={this._newId()} ref="latitude" name="coordinates.lat" placeholder="Latitude" />
              </div>
              <div className="col-sm-4" key="right">
                <label htmlFor={this._newId()}>Longitude</label>
                <input type="text" className="form-control" id={this._newId()} ref="longitude" name="coordinates.lng" placeholder="Longitude" />
              </div>
            </div>
        );
        return [
            this._renderFormGroup('address', 'dialog.edit.address.label', streetField),
            this._renderFormGroup('postcode', 'dialog.edit.postcode.label', postcodeField),
            this._renderFormGroup('city', 'dialog.edit.city.label', cityField),
            coordsFields
        ];
    },
    
    _renderCreationYear : function(){
        var input = this._renderInput('creationyear',
                'dialog.edit.year.placeholder', {
        });
        return this._renderFormGroup('year', 'dialog.edit.year.label', input);
    },
    
    _renderWebSiteUrl : function(){
        var input = this._renderInput('url', 'dialog.edit.url.placeholder', {
        });
        return this._renderFormGroup('url', 'dialog.edit.url.label', input);
    },
    
    _renderTwitterAccount : function(){
        var input = this._renderInput('twitter', 'dialog.edit.twitter.placeholder', {
        });
        return this._renderFormGroup('twitter', 'dialog.edit.twitter.label', input);
    }, 
    
    _renderFacebookAccount : function(){
        var input = this._renderInput('facebook', 'dialog.edit.facebook.placeholder', {
        });
        return this._renderFormGroup('facebook', 'dialog.edit.facebook.label', input);
    }, 
    
    _renderLinkedInAccount : function(){
        var input = this._renderInput('linkedin', 'dialog.edit.linkedin.placeholder', {
        });
        return this._renderFormGroup('linkedin', 'dialog.edit.linkedin.label', input);
    },
    
    _renderGooglePlusAccount : function(){
        var input = this._renderInput('googleplus', 'dialog.edit.googleplus.placeholder', {
        });
        return this._renderFormGroup('googleplus', 'dialog.edit.googleplus.label', input);
    },
    
    _renderViadeoAccount : function(){
        var input = this._renderInput('viadeo', 'dialog.edit.viadeo.placeholder', {
        });
        return this._renderFormGroup('viadeo', 'dialog.edit.viadeo.label', input);
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