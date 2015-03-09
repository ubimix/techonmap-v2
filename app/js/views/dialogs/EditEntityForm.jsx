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
var Autocomplete = React.createFactory(require('./Autocomplete.jsx'));

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
    _renderHorizontalFormGroup : function(name, labelKey, input, optional){
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
        var mandatoryMarker = '';
        if (!optional) {
            className += ' mandatory';
            mandatoryMarker = <i className="icon icon-star mandatory">*</i>;
        }
        return (
            <div className={className} key={labelKey}>
                <label htmlFor={id} className="col-sm-4 control-label" key="left">
                    {this._getLabel(labelKey)}
                </label>
                <div className="col-sm-8" key="right">
                    {mandatoryMarker}
                    {input}
                    {messageBlock}
                </div>
            </div>
        );
    },

    _isNewResource : function(){
        return this.props.app.edit.isNewResource();
    },

    _newId : function(){
        return _.uniqueId('field-');
    },

    _onFieldUpdate : function(fieldKey) {
        var values = [];
        _.each(this.refs, function(field) {
            var elm = field.getDOMNode();
            var name = elm.getAttribute('name');
            if (!name) {
                elm = elm.querySelector('[name]');
                if (!elm)
                    return ;
                name = elm.getAttribute('name');
            }
            if (name == fieldKey) {
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
    _getInputOptions : function(fieldKey, labelKey, options){
        var fieldRef = this._getFieldRef(fieldKey);
        options = options || {};
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
        }, options);
        return options;
    },
    _renderInput : function(fieldKey, labelKey, options){
        options = this._getInputOptions(fieldKey, labelKey, options);
        options.onChange = function(ev){ 
            this._onFieldUpdate(fieldKey, ev);
        }.bind(this);
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
            rows : 5,
            cols : 80,
            style : {width:'100%'},
            value : this._getResourceField(fieldKey),
            onChange : this._onFieldUpdate.bind(this, fieldKey)
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
            onChange : this._onFieldUpdate.bind(this, fieldKey)
        }, params);
        return React.DOM.select(params, _.map(options, function(label, value){
            return React.DOM.option({
                value : value
            }, label);
        }));
    },
    _renderNameAndId : function(){
        var idInput;
        var newEntity = this._isNewResource();
        if (newEntity) {
            idInput = this._renderInput('properties.id', 'dialog.edit.id.placeholder', {});
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
        var nameInput = this._renderInput('properties.name', 'dialog.edit.name.placeholder', {});
        return [
            this._renderHorizontalFormGroup('properties.name', 'dialog.edit.name.label', nameInput),
            this._renderHorizontalFormGroup('properties.id', 'dialog.edit.id.label', idInput),
        ];
    },
    
    _renderMail : function(){
        return this._renderHorizontalFormGroup('properties.email', 'dialog.edit.email.label', 
           this._renderInput('properties.email', 'dialog.edit.email.placeholder', {
                type : 'email'
           }));
    },
    _renderDescription : function(){
        return this._renderHorizontalFormGroup('properties.description',
                'dialog.edit.description.label', 
                this._renderTextarea('properties.description',
                'dialog.edit.description.placeholder', {
           }));
    },
    _renderCategories : function(){
        var app = this.props.app;
        var categoryKey = app.edit.getResourceValue('properties.category');
        var categoryOptions = {'' :''};
        var categories = app.res.getCategories();
        _.each(categories, function(category) {
            categoryOptions[category.key] = category.label;
        });
        var select = this._renderSelect(
            'properties.category', {
                selected : categoryKey, 
                options : categoryOptions
            });
        return this._renderHorizontalFormGroup('properties.category', 'dialog.edit.category.label', select);
    },
    
    _renderTags : function(){
        var app = this.props.app;
        var categoryKey = app.edit.getResourceValue('properties.category');
        if (!categoryKey)
            return undefined;

        var fieldKey = 'properties.tags';
        var resourceTags = app.edit.getResourceValue(fieldKey) || [];
        var tagsIndex = {};
        _.each(resourceTags, function(tag) {
            tagsIndex[tag] = true;
        });
        
        var tagInputs = [];
        var tagsCardinality = app.edit.getCardinality(fieldKey);
        var maxTagsNumber = tagsCardinality[1];
        for (var i=0; i < maxTagsNumber; i++) {
            (function (i){
                var value = i < resourceTags.length ? resourceTags[i] : null;
                var tagInputOptions = this._getInputOptions(
                        fieldKey, 
                        'dialog.edit.tag.placeholder', 
                        {
                            value : value, 
                            suggestions :  function(value){ 
                                var tagsList = app.res.getTagsSuggestion(categoryKey, value);
                                return _.filter(tagsList, function(tag) {
                                    return !_.has(tagsIndex, tag);
                                });
                            }
                        });
                tagInputOptions.onValueUpdate = function(){
                    this._onFieldUpdate(fieldKey);                
                }.bind(this);
                var input = Autocomplete(tagInputOptions);
                tagInputs.push(input);
            }.bind(this))(i);
        }
        var tagContainer = React.DOM.span({
            id: this._newId()
        }, tagInputs);
        return this._renderHorizontalFormGroup(fieldKey, 'dialog.edit.tag.label', tagContainer);
    },
    _renderCategoriesAndTags : function(){
        var components = [];
        var app = this.props.app;
        components.push(this._renderCategories());
        components.push(this._renderTags());
        return components;
    },
    
    _renderAddressAndCoordinates : function(){
        var app = this.props.app;
        var mapOptions = app.map.getMapOptions();
        var zoom = mapOptions.zoom || 17;
        var tilesUrl = mapOptions.tilesUrl;
        var type = this._getResourceField('properties.category') || 'Entreprise';
        var marker = app.viewManager.newView('mapMarker', type, {
            app : app,
            type : type,
            params : {
                draggable : true
            }
        });
        var coords = this._getResourceField('geometry.coordinates');
        if (!coords || !coords[0] || !coords[1])  {
            coords = mapOptions.center || [ 0, 0 ];
        } 
        this._addressInfo = this._addressInfo || {};
        _.extend(this._addressInfo, {
            address : {
                name : 'properties.address',
                placeholder  : this._getLabel('dialog.edit.address.placeholder'),
                value: this._getResourceField('properties.address'),
                error : this._getFieldError('properties.address')
            },
            postcode: {
                name : 'properties.postcode',
                placeholder  : this._getLabel('dialog.edit.postcode.placeholder'),
                value: this._getResourceField('properties.postcode'),
                error : this._getFieldError('properties.postcode')
            },
            city : {
                name : 'properties.city',
                placeholder  : this._getLabel('dialog.edit.city.placeholder'),
                value: this._getResourceField('properties.city'),
                error : this._getFieldError('properties.city')
            },
            longitude : {
                name: 'geometry.coordinates.0',
                type: 'hidden',
                value : coords[0],
                error : this._getFieldError('geometry.coordinates')
            },
            latitude : {
                name: 'geometry.coordinates.1',
                type: 'hidden',
                value : coords[1],
                error : this._getFieldError('geometry.coordinates')
            },
            localizeBtn : {
                label : this._getLabel('dialog.edit.localize.btn'),
            },
            map : {
                style : {width: '100%', height:'200px'},
            }
        });
        
        var errorMsg = this._getFieldError('geometry.coordinates');
        var edit = this.props.app.edit;
        return [
            this._renderHorizontalFormGroup('properties.address', 'dialog.edit.address-group.label', 
                <GeolocationWidget
                    info = {this._addressInfo}
                    tilesUrl={tilesUrl}
                    center={coords}
                    zoom={zoom}
                    marker={marker}
                    onAddressChange={function(info){
                        var fields = {};
                        _.each(info, function(field) {
                            var name = field.name;
                            var value = field.value;
                            if (name) {
                                fields[name] = value ? [value] : [];
                            }
                        }, this);
                        this.props.app.edit.updateFields(fields);
                    }.bind(this)}/>),
        ];        
    },
    
    _renderCreationYear : function(){
        var input = this._renderInput('properties.creationyear',
                'dialog.edit.year.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.creationyear',
               'dialog.edit.year.label',
               input);
    },
    
    _renderSiret : function(){
        var input = this._renderInput('properties.siret',
                'dialog.edit.siret.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.siret', 'dialog.edit.siret.label', input, true);
    },
    
    _renderWebSiteUrl : function(){
        var input = this._renderInput('properties.url', 'dialog.edit.url.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.url', 'dialog.edit.url.label', input);
    },
    
    _renderTwitterAccount : function(){
        var input = this._renderInput('properties.twitter', 'dialog.edit.twitter.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.twitter', 'dialog.edit.twitter.label', input, true);
    }, 
    
    _renderFacebookAccount : function(){
        var input = this._renderInput('properties.facebook', 'dialog.edit.facebook.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.facebook', 'dialog.edit.facebook.label', input, true);
    }, 
    
    _renderLinkedInAccount : function(){
        var input = this._renderInput('properties.linkedin', 'dialog.edit.linkedin.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.linkedin', 'dialog.edit.linkedin.label', input, true);
    },
    
    _renderGooglePlusAccount : function(){
        var input = this._renderInput('properties.googleplus', 'dialog.edit.googleplus.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.googleplus', 'dialog.edit.googleplus.label', input, true);
    },
    
    _renderViadeoAccount : function(){
        var input = this._renderInput('properties.viadeo', 'dialog.edit.viadeo.placeholder', {
        });
        return this._renderHorizontalFormGroup('properties.viadeo', 'dialog.edit.viadeo.label', input, true);
    },
     
    render : function(){
        console.log('>>>> RENDER');
        return (
        <form className="form-horizontal">
            <section>
                {this._renderNameAndId()}
                {this._renderSiret()}
                {this._renderCategoriesAndTags()}
                {this._renderDescription()}
                {this._renderCreationYear()}
            </section>
            
            <h2>{this._getLabel('dialog.edit.contacts.title')}</h2>
            <section>
                {this._renderMail()}
                {this._renderWebSiteUrl()}
                {this._renderAddressAndCoordinates()}
            </section>
            
            <h2>{this._getLabel('dialog.edit.sn.title')}</h2>
            <section>
                {this._renderTwitterAccount()}
                {this._renderFacebookAccount()}
                {this._renderGooglePlusAccount()}
                {this._renderLinkedInAccount()}
                {this._renderViadeoAccount()}
            </section>
        </form>
        );
    }
    
});