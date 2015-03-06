module.exports = function(options) {
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
                            format : "Le texte saisie ne semble pas être un URL valide.",
                        }
                    },
                    creationyear : {
                        label : 'L\'année de création',
                        description : 'Quand votre organisation est-elle née ?',
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
