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
var InputWidget = require('./InputWidget.jsx');
var InputWidgetFactory = React.createFactory(InputWidget);


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
        if (!this.isMounted())
            return ;
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
            // id: this._newId(),
            name: fieldKey,
            ref : fieldRef,
            key : fieldRef,
            type : 'text',
            value : this._getResourceField(fieldKey)
        }, options);
        return options;
    },

    _renderInputGroup : function(options) {
        var label = options.labelKey ? this._getLabel(options.labelKey) : undefined;
        var placeholder = options.placeholderKey ? this._getLabel(options.placeholderKey) : undefined;
        var values = this._getResourceField(options.fieldKey);
        var error = this._getFieldError(options.fieldKey);
        return new InputWidgetFactory(_.extend({}, options, {
            label : label,
            values : values,
            placeholder : placeholder,
            error: error,
            onChange: function(values){
                var fields = {};
                fields[options.fieldKey] = values;
                this.props.app.edit.updateFields(fields);
            }.bind(this)            
        }));
    },

    _renderName : function(){
        return this._renderInputGroup({
            mandatory : true,
            fieldKey : 'properties.name',
            labelKey : 'dialog.edit.name.label',
            placeholderKey : 'dialog.edit.name.placeholder',
        });
    },

    _renderId : function(){
        var newEntity = this._isNewResource();
        return this._renderInputGroup({
            mandatory : true,
            type : newEntity ? "text" : "hidden", 
            addons : 'www.techonmap.fr/#',
            fieldKey : 'properties.id',
            labelKey : 'dialog.edit.id.label',
            placeholderKey : 'dialog.edit.id.placeholder'
        });
    },
    
    _renderMail : function(){
        if (!this._isNewResource())
            return '';
        return this._renderInputGroup({
            type : 'email',
            fieldKey : 'properties.email',
            labelKey : 'dialog.edit.email.label',
            placeholderKey :  'dialog.edit.email.placeholder',
        });
    },
    _renderDescription : function(){
        return this._renderInputGroup({
            mandatory : true,
            type : 'textarea',
            fieldKey : 'properties.description',
            labelKey : 'dialog.edit.description.label',
            placeholderKey :  'dialog.edit.description.placeholder',
        });
    },
    _renderCategories : function(){
        var app = this.props.app;
        var categoryKey = app.edit.getResourceValue('properties.category');
        var categoryOptions = {'' :''};
        var categories = app.res.getCategories();
        _.each(categories, function(category) {
            categoryOptions[category.key] = category.label;
        });
        return this._renderInputGroup({
            type : 'select',
            options : categoryOptions,
            selected : categoryKey, 
            mandatory : true,
            fieldKey : 'properties.category',
            labelKey : 'dialog.edit.category.label',
        });
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
// id: this._newId()
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
        } else {
            zoom = 16;
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
        return this._renderInputGroup({
            fieldKey : 'properties.creationyear',
            labelKey : 'dialog.edit.year.label',
            placeholderKey :  'dialog.edit.year.placeholder',
        });
    },
    
    _renderSiret : function(){
        return this._renderInputGroup({
            fieldKey : 'properties.taxID',
            labelKey : 'dialog.edit.siret.label',
            placeholderKey : 'dialog.edit.siret.placeholder',
        });
    },
    
    _renderWebSiteUrl : function(){
        return this._renderInputGroup({
            fieldKey : 'properties.url',
            labelKey : 'dialog.edit.url.label', 
            placeholderKey :  'dialog.edit.url.placeholder',
        });        
    },
    
    _renderTwitterAccount : function(){
        return this._renderInputGroup({
            addons : '@' ,
            fieldKey : 'properties.twitter',
            labelKey : 'dialog.edit.twitter.label', 
            placeholderKey :  'dialog.edit.twitter.placeholder',
        });        
    }, 
    
    _renderFacebookAccount : function(){
        return this._renderInputGroup({
            fieldKey : 'properties.facebook',
            labelKey : 'dialog.edit.facebook.label', 
            placeholderKey :  'dialog.edit.facebook.placeholder',
        });        
    }, 
    
    _renderLinkedInAccount : function(){
        return this._renderInputGroup({
            fieldKey : 'properties.linkedin',
            labelKey : 'dialog.edit.linkedin.label', 
            placeholderKey :  'dialog.edit.linkedin.placeholder',
        });
    },
    
    _renderGooglePlusAccount : function(){
        return this._renderInputGroup({
            fieldKey : 'properties.googleplus',
            labelKey : 'dialog.edit.googleplus.label', 
            placeholderKey :  'dialog.edit.googleplus.placeholder',
        });
    },
    
    _renderViadeoAccount : function(){
        return this._renderInputGroup({
            fieldKey : 'properties.viadeo',
            labelKey : 'dialog.edit.viadeo.label', 
            placeholderKey :  'dialog.edit.viadeo.placeholder',
        });
    },
 
    render : function(){
        return (
        <form className="form-horizontal edit">
            <section>
                {this._renderName()}
                {this._renderId()}
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