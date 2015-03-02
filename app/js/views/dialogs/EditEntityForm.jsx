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
var GeolocationWidget = require('./GeolocationWidget.jsx');

module.exports = React.createClass({
    displayName : 'EditEntityForm',
    
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
    _getResourceField : function(fieldKey) {
        var value = this.props.app.edit.getResourceValue(fieldKey);
        return value || '';
    },
    _renderInput : function(fieldKey, labelKey, options){
        var fieldRef = this._getFieldRef(fieldKey);
        options = options || {};
        var onChange = options.onChange;
        delete options.onChange;
        var that = this;
        options = _.extend({
            className: 'form-control',
            placeholder: labelKey ? this._getLabel(labelKey) : undefined,
            id: this._newId(),
            name: fieldKey,
            ref : fieldRef,
            key : fieldRef,
            type : 'text',
            value : this._getResourceField(fieldKey)
        }, options, {
            onChange : function(ev){ 
                that._onChange(fieldKey, ev);
                if (onChange) {
                    onChange.apply(that, ev);
                }
            }
        });
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
            value : this._getResourceField(fieldKey),
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
            idInput = this._renderInput('properties.id', 'dialog.edit.id.placeholder', {
            });
        } else {
            var id = this._getResourceField('properties.id');
            idInput = (
                <span id={this._newId()}>
                    <span className="form-control">{id}</span>
                    {this._renderInput('properties.id', 'dialog.edit.id.placeholder', {
                        type: 'hidden'
                    })}
                </span>
            );
        }
        var that = this;
        var nameInput = this._renderInput('properties.name',
                'dialog.edit.name.placeholder', {
        });
        return [
                this._renderFormGroup('properties.name', 'dialog.edit.name.label', nameInput),
                this._renderFormGroup('properties.id', 'dialog.edit.id.label', idInput),
            ];
    },
    
    _renderMail : function(){
        return this._renderFormGroup('properties.email', 'dialog.edit.email.label', 
           this._renderInput('properties.email', 'dialog.edit.email.placeholder', {
                type : 'email'
           }));
    },
    _renderDescription : function(){
        return this._renderFormGroup('properties.description', 'dialog.edit.description.label', 
                this._renderTextarea('properties.description',
                'dialog.edit.description.placeholder', {
           }));
    },
    _renderCategoriesAndTags : function(){
        var app = this.props.app;
        var categoryKey = app.edit.getResourceValue('properties.category', 0);
        var categoryTags = app.res.getCategoryTags(categoryKey);
        var allTags = app.res.getTags();
        var categoryOptions = {'' :''};
        var categories = app.res.getCategories();
        _.each(categories, function(category) {
            categoryOptions[category.key] = category.label;
        });
        var select = this._renderSelect(
            'properties.category', {
                selected : '', 
                options : categoryOptions
            });
        var tagsCardinality = app.edit.getCardinality('properties.tag');
        var tags = [];
        for (var i=0; i < tagsCardinality[1]; i++) {
            tags.push(this._renderInput('properties.tag.' + i, 'dialog.edit.tag.placeholder', {
                options : categoryTags 
            }));
        }
        var tagContainer = React.DOM.span({
            id: this._newId()
        }, tags);
        return [
            this._renderFormGroup('properties.category', 'dialog.edit.category.label', select),
            this._renderFormGroup('properties.tag', 'dialog.edit.tag.label', tagContainer)
        ];
    },
    
    _renderAddressAndCoordinates : function(){
        var app = this.props.app;
        var mapOptions = app.map.getMapOptions();
        var coords = mapOptions.center || [ 0, 0 ];
        var zoom = mapOptions.zoom || 15;
        var tilesUrl = mapOptions.tilesUrl;
        return [
            this._renderFormGroup('properties.address', 'dialog.edit.address.label', 
                <GeolocationWidget tilesUrl={tilesUrl} center={coords} zoom={zoom} 
                    onAddressChange={function(ev){
                        var value = ev.target.value;
                    }}/>),
        ];        
    },
    
    _renderCreationYear : function(){
        var input = this._renderInput('properties.creationyear',
                'dialog.edit.year.placeholder', {
        });
        return this._renderFormGroup('properties.year', 'dialog.edit.year.label', input);
    },
    
    _renderWebSiteUrl : function(){
        var input = this._renderInput('properties.url', 'dialog.edit.url.placeholder', {
        });
        return this._renderFormGroup('properties.url', 'dialog.edit.url.label', input);
    },
    
    _renderTwitterAccount : function(){
        var input = this._renderInput('properties.twitter', 'dialog.edit.twitter.placeholder', {
        });
        return this._renderFormGroup('properties.twitter', 'dialog.edit.twitter.label', input);
    }, 
    
    _renderFacebookAccount : function(){
        var input = this._renderInput('properties.facebook', 'dialog.edit.facebook.placeholder', {
        });
        return this._renderFormGroup('properties.facebook', 'dialog.edit.facebook.label', input);
    }, 
    
    _renderLinkedInAccount : function(){
        var input = this._renderInput('properties.linkedin', 'dialog.edit.linkedin.placeholder', {
        });
        return this._renderFormGroup('properties.linkedin', 'dialog.edit.linkedin.label', input);
    },
    
    _renderGooglePlusAccount : function(){
        var input = this._renderInput('properties.googleplus', 'dialog.edit.googleplus.placeholder', {
        });
        return this._renderFormGroup('properties.googleplus', 'dialog.edit.googleplus.label', input);
    },
    
    _renderViadeoAccount : function(){
        var input = this._renderInput('properties.viadeo', 'dialog.edit.viadeo.placeholder', {
        });
        return this._renderFormGroup('properties.viadeo', 'dialog.edit.viadeo.label', input);
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