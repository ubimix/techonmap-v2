var revalidator = require('revalidator');
var Mosaic = require('mosaic-commons');
var _ = require('underscore');
var FormValidator = require('./FormValidator');
var DomUtils = require('./DomUtils');

var BootstrapFormValidator = FormValidator.extend(DomUtils, {

    initialize : function(schema) {
        FormValidator.prototype.initialize.apply(this, arguments);
    },

    validateForm : function(form, options) {
        var fields = this.extractFields(form);
        return this._validateForm(form, fields, options);
    },

    validateReactForm : function(form, options) {
        var fields = this.extractReactFields(form);
        return this._validateForm(form, fields, options, function(field) {
            return field.getDOMNode();
        });
    },

    _validateForm : function(form, fields, options, getElement) {
        getElement = getElement || function(e) {
            return e;
        }
        options = options || {
            focus : false,
            checkHighlight : function(field) {
                return true;
            }
        };
        var formElm = getElement(form);
        var errClass = 'has-error';
        var formGroups = formElm.querySelectorAll('.form-group');
        _.each(formGroups, function(g) {
            this._removeClass(g, errClass);
        }, this);
        var alerts = formElm.querySelectorAll('.alert');
        _.each(alerts, function(a) {
            a.parentNode.removeChild(a);
        });
        var info = this._validateFields(fields, getElement);
        if (info.result.valid)
            return info;

        var focused = false;
        _.each(info.result.errors, function(err) {
            var property = err.property;
            var propertyFields = fields[property];
            _.each(propertyFields, function(field) {
                var elm = getElement(field);
                if (options.checkHighlight && !options.checkHighlight(field))
                    return;
                var formGroup = this.getFormGroup(elm);
                this._addClass(formGroup, errClass);
                if (!focused && options.focus) {
                    elm.focus();
                    elm.scrollIntoView(true);
                    focused = true;
                }
                var div = document.createElement('div');
                this._addClass(div, 'alert alert-warning');
                div.innerHTML = err.message;
                elm.parentNode.insertBefore(div, elm.nextSibling)
            }, this);
        }, this);

        return info;
    },

    /**
     * Returns a "form-group" parent element for the specified input.
     * 
     * @param f
     *            a DOM input/textarea/select element
     */
    getFormGroup : function(f) {
        var result;
        while (!result && f) {
            if (this._hasClass(f, 'form-group')) {
                result = f;
            }
            f = f.parentElement;
        }
        return result;
    }

});

module.exports = BootstrapFormValidator;
