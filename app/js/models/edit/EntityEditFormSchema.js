var _ = require('underscore');
module.exports = function(options) {
    console.log('SCHEMA OPTIONS:', options);
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
                label : 'Geographical coordinates',
                type : 'object',
                required : true,
                properties : {
                    coordinates : {
                        label : 'Coordinates',
                        description : 'Geographical coordinates',
                        type : 'array',
                        minItems : 2,
                        maxItems : 2,
                        type : 'array',
                        required : true
                    },
                }
            },
            'properties' : {
                label : 'Resource properties',
                type : 'object',
                required : true,
                messages : {
                    required : "Proprietes sont requis.",
                },
                properties : {
                    name : {
                        label : 'Nom de votre organisation',
                        description : 'Nom de votre organisation',
                        type : 'string',
                        required : true,
                        messages : {
                            required : "Un nom est requis.",
                            allowEmpty : "Le nom saisi ne doit pas être vide.",
                        }
                    },
                    id : {
                        label : 'Identifiant de votre organisation.',
                        description : 'Identifiant de votre organisation.',
                        type : 'string',
                        required : true,
                        messages : {
                            required : "Un identifiant est requis.",
                            allowEmpty : "L'identifiant saisi ne doit pas être vide.",
                            conform : "Ce champ doit être unique et au minimum 3 lettres long."
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
                        description : 'SIRET',
                        type : 'string',
                        required : false,
                        messages : {
                            conform : "Le numéro SIRET semble incorrect : il doit contenir 14 chiffres sans espaces.",
                        },
                        conform : function(v) {
                            if (!v || !v.length)
                                return true;
                            if (v.length != 14)
                                return false;
                            if (!v.match(/^\d+$/))
                                return false;
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
                        description : 'Adresse e-mail de contact',
                        type : 'string',
                        format : 'email',
                        required : true,
                        messages : {
                            required : "Une adresse e-mail est requise.",
                            allowEmpty : "L'adresse e-mail ne doit pas être vide.",
                            format : "L'adresse e-mail semble incorrecte.",
                        }
                    },
                    description : {
                        description : 'Description de votre organisation',
                        type : 'string',
                        maxLength : 250,
                        required : true,
                        messages : {
                            required : "Une description est requise.",
                            allowEmpty : "La description saisie ne doit pas être vide.",
                            minLength : "This description is too short (minimum is %{expected} characters)",
                            maxLength : "La description saisie excède le nombre maximal de caractères (250).",
                        }
                    },
                    category : {
                        label : 'Catégorie',
                        description : 'Sélectionner une catégorie / un type d\'organisation',
                        type : 'string',
                        enum : [ "Entreprise", "Tiers-lieu", "École",
                                "Communauté", "Incubateur", "Investisseur",
                                "Acteur public" ],
                        required : true
                    },
                    tags : {
                        label : 'Tags',
                        description : 'Saisissez un ou plusieurs mot-clef(s)',
                        minItems : 1,
                        maxItems : 5,
                        uniqueItems : true,
                        type : 'array',
                        required : true,
                        messages : {
                            minItems : "Au moins un tag est requis.",
                            required : "Au moins un tag est requis.",
                            allowEmpty : "Le tag saisi ne doit pas être vide.",
                        }
                    },
                    address : {
                        label : 'Adresse',
                        description : 'Adresse de votre organisation',
                        type : 'string',
                        required : true,
                        messages : {
                            required : "Une adresse est requise.",
                            allowEmpty : "L'adresse saisie ne doit pas être vide.",
                        }
                    },
                    postcode : {
                        label : 'Code postal',
                        description : 'Code postal de votre organisation',
                        type : 'integer',
                        allowEmpty : false,
                        required : true,
                        messages : {
                            required : "Un code postal est requis.",
                            allowEmpty : "Le code postal saisi ne doit pas être vide.",
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
                        label : 'Ville',
                        description : 'Ville de votre organisation',
                        type : 'string',
                        required : true,
                        messages : {
                            required : "Une ville est requise.",
                            allowEmpty : "La ville saisie ne doit pas être vide.",
                        }
                    },
                    url : {
                        label : 'Site Web',
                        description : 'Site Web de votre organisation',
                        type : 'string',
                        required : true,
                        format : 'url',
                        messages : {
                            required : "Un site Web est requis.",
                            allowEmpty : "Le site saisi ne doit pas être vide.",
                            format : "Le texte saisi ne semble pas être une URL valide.",
                        }
                    },
                    creationyear : {
                        label : 'L\'année de création',
                        description : 'Année de création de votre organisation',
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
                            conform : "L'année saisie doit être au format YYYY.",
                            type : "Une année de 4 chiffres doit être saisie."
                        }
                    },
                    twitter : {
                        label : 'Compte Twitter',
                        description : 'Compte Twitter de votre organisation',
                        type : 'string',
                    },
                    facebook : {
                        label : 'Page Facebook',
                        description : 'Page Facebook de votre organisation',
                        type : 'string',
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/www\.facebook\.com\/.*$/g);
                        },
                        messages : {
                            conform : 'La page saisie ne semble pas être une page Facebook.'
                        }
                    },
                    googleplus : {
                        label : 'Page Google+',
                        description : 'Page Google+ de votre organisation',
                        type : 'string',
                        required : false,
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/plus\.google\.\w+\/.*$/g);
                        },
                        messages : {
                            conform : 'La page saisie ne semble pas être une page Google+.'
                        }
                    },
                    linkedin : {
                        label : 'Page LinkedIn',
                        description : 'Page LinkedIn de votre organisation',
                        type : 'string',
                        required : false,
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/www\.linkedin\.\w+\/.*$/g);
                        },
                        messages : {
                            conform : 'La page saisie ne semble pas être une page LinkedIn.'
                        }
                    },
                    viadeo : {
                        label : 'Page Viadeo',
                        description : 'Page Viadeo de votre organisation',
                        type : 'string',
                        required : false,
                        conform : function(v) {
                            return !!v
                                    && v
                                            .match(/^https?:\/\/\w+\.viadeo\.\w+\/.*$/g);
                        },
                        messages : {
                            conform : 'La page saisie ne semble pas être une page Viadeo.'
                        }
                    }
                }
            },
        }
    };
}
