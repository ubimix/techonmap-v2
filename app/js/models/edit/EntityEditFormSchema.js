var _ = require('underscore');
module.exports = function(options) {
    var schema = newSchema(options);
    options = options || {};
    if (!options.newResource) {
        delete schema.properties.properties.properties.id;
        delete schema.properties.properties.properties.email;
    }
    return schema;
}

function newSchema(options) {
    return {
        properties : {
            'geometry' : {
                label : options.getMessage('field.geometry.coordinates'),
                type : 'object',
                required : true,
                properties : {
                    coordinates : {
                        label : options
                                .getMessage('field.geometry.coordinates.label'),
                        description : options
                                .getMessage('field.geometry.coordinates'),
                        type : 'array',
                        minItems : 2,
                        maxItems : 2,
                        type : 'array',
                        required : true
                    },
                }
            },
            'properties' : {
                label : options.getMessage('field.properties'),
                type : 'object',
                required : true,
                messages : {
                    required : options.getMessage('field.properties.required'),
                },
                properties : {
                    name : {
                        label : options.getMessage('field.name'),
                        description : options
                                .getMessage('field.name.description'),
                        type : 'string',
                        required : true,
                        messages : {
                            required : options
                                    .getMessage('field.name.required'),
                            allowEmpty : options
                                    .getMessage('field.name.allowEmpty')
                        }
                    },
                    id : {
                        label : options.getMessage('field.id'),
                        description : options
                                .getMessage('field.id.description'),
                        type : 'string',
                        required : true,
                        messages : {
                            required : options.getMessage('field.id.required'),
                            allowEmpty : options
                                    .getMessage('field.id.allowEmpty'),
                            conform : options.getMessage('field.id.conform'),
                        },
                        conform : function(v) {
                            if (!v)
                                return false;
                            if (v.length < 3)
                                return false;
                            var ids = options.getAllIdentifiers() || {};
                            return !_.has(ids, v);
                        }
                    },
                    taxID : {
                        description : options.getMessage('field.taxID'),
                        type : 'string',
                        required : false,
                        messages : {
                            conform : options
                                    .getMessage('field.taxID.msg.conform'),
                        },
                        conform : function(v) {
                            if (!v || !v.length)
                                return true;
                            if (v.length != 14)
                                return false;
                            if (!v.match(/^\d+$/))
                                return false;
                            return true;

                            var result = checkLuhn(v);
                            return result;
                            function checkLuhn(imei) {
                                var digits = [ 0, 2, 4, 6, 8, 1, 3, 5, 7, 9 ];
                                var val = (imei.split('').reduce(function(sum,
                                        d, n) {
                                    return (n === (imei.length - 1) ? 0 : sum) + //
                                    parseInt((n % 2) ? d : digits[d]);
                                }, 0));
                                return (val % 10) == 0;
                            }
                        }
                    },
                    email : {
                        label : options.getMessage('field.email'),
                        description : options
                                .getMessage('field.email.descripton'),
                        type : 'string',
                        format : 'email',
                        required : true,
                        messages : {
                            required : options
                                    .getMessage('field.email.required'),
                            allowEmpty : options
                                    .getMessage('field.email.allowEmpty'),
                            format : options.getMessage('field.email.format'),
                        }
                    },
                    description : {
                        label : options.getMessage('field.description'),
                        description : options
                                .getMessage('field.description.descripton'),
                        type : 'string',
                        maxLength : 250,
                        required : true,
                        messages : {
                            required : options
                                    .getMessage('field.description.required'),
                            allowEmpty : options
                                    .getMessage('field.description.allowEmpty'),
                            minLength : options
                                    .getMessage('field.description.minLength'),
                            maxLength : options
                                    .getMessage('field.description.maxLength')
                        }
                    },
                    category : {
                        label : options.getMessage('field.category'),
                        description : options
                                .getMessage('field.category.description'),
                        type : 'string',
                        enum : options.getCategoryKeys(),
                        required : true
                    },
                    tags : {
                        label : options.getMessage('field.tags.label'),
                        description : options.getMessage('field.tags'),
                        minItems : 1,
                        maxItems : 5,
                        uniqueItems : true,
                        type : 'array',
                        required : true,
                        messages : {
                            minItems : options
                                    .getMessage('field.tags.minItems'),
                            required : options
                                    .getMessage('field.tags.required'),
                            allowEmpty : options
                                    .getMessage('field.tags.allowEmpty'),
                        }
                    },
                    address : {
                        label : options.getMessage('field.address'),
                        description : options
                                .getMessage('field.address.description'),
                        type : 'string',
                        required : true,
                        messages : {
                            required : options
                                    .getMessage('field.address.msg.required'),
                            allowEmpty : options
                                    .getMessage('field.address.msg.allowEmtpy'),
                        }
                    },
                    postcode : {
                        label : options.getMessage('field.postcode'),
                        description : options
                                .getMessage('field.postcode.description'),
                        type : 'integer',
                        allowEmpty : false,
                        required : true,
                        messages : {
                            required : options
                                    .getMessage('field.postcode.msg.required'),
                            allowEmpty : options
                                    .getMessage('field.postcode.msg.allowEmpty')
                        },
                        conform : function(v) {
                            try {
                                v = parseInt(v);
                                v += '';
                                return v.length === 5;
                            } catch (e) {
                                return false;
                            }
                        }
                    },
                    city : {
                        label : options.getMessage('field.city'),
                        description : options
                                .getMessage('field.city.description'),
                        type : 'string',
                        required : true,
                        messages : {
                            required : options
                                    .getMessage('field.city.msg.required'),
                            allowEmpty : options
                                    .getMessage('field.city.msg.allowEmpty')
                        }
                    },
                    url : {
                        label : options.getMessage('field.url'),
                        description : options
                                .getMessage('field.url.description'),
                        type : 'string',
                        required : true,
                        format : 'url',
                        messages : {
                            required : options
                                    .getMessage('field.url.msg.required'),
                            allowEmpty : options
                                    .getMessage('field.url.msg.allowEmpty'),
                            format : options.getMessage('field.url.msg.format'),
                        }
                    },
                    creationyear : {
                        label : options.getMessage('field.creationyear'),
                        description : options
                                .getMessage('field.creationyear.description'),
                        type : 'number',
                        required : true,
                        conform : function(v) {
                            try {
                                v = parseInt(v);
                                return v >= 1900
                                        && v <= new Date().getFullYear();
                            } catch (e) {
                                return false;
                            }
                        },
                        messages : {
                            conform : options.getMessage('field.messages'),
                            type : options
                                    .getMessage('field.messages.description'),
                        }
                    },
                    twitter : {
                        label : options.getMessage('field.twitter'),
                        description : options
                                .getMessage('field.twitter.description'),
                        type : 'string',
                    },
                    facebook : {
                        label : options.getMessage('field.facebook'),
                        description : options
                                .getMessage('field.facebook.description'),
                        type : 'string',
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/www\.facebook\.com\/.*$/g);
                        },
                        messages : {
                            conform : options
                                    .getMessage('field.facebook.msg.confirm')
                        }
                    },
                    googleplus : {
                        label : options.getMessage('field.googleplus'),
                        description : options
                                .getMessage('field.googleplus.description'),
                        type : 'string',
                        required : false,
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/plus\.google\.\w+\/.*$/g);
                        },
                        messages : {
                            conform : options
                                    .getMessage('field.googleplus.msg.conform'),
                        }
                    },
                    linkedin : {
                        label : options.getMessage('field.linkedin'),
                        description : options
                                .getMessage('field.linkedin.description'),
                        type : 'string',
                        required : false,
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/www\.linkedin\.\w+\/.*$/g);
                        },
                        messages : {
                            conform : options
                                    .getMessage('field.linkedin.msg.conform'),
                        }
                    },
                    viadeo : {
                        label : options.getMessage('field.viadeo'),
                        description : options
                                .getMessage('field.viadeo.description'),
                        type : 'string',
                        required : false,
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/\w+\.viadeo\.\w+\/.*$/g);
                        },
                        messages : {
                            conform : options
                                    .getMessage('field.viadeo.msg.conform')
                        }
                    }
                }
            },
        }
    };
}
