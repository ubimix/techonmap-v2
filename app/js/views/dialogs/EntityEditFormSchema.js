module.exports = function() {
    return {
        properties : {
            name : {
                label : 'Nom de votre organisation',
                description : 'Nom de votre organisation',
                type : 'string',
                required : true,
                messages : {
                    required : "Un nom est requis",
                    allowEmpty : "Le nom saisi ne doit pas être vide",
                }
            },
            id : {
                label : 'Identifiant de votre organisation',
                description : 'Identifiant de votre organisation',
                type : 'string',
                required : true,
                messages : {
                    required : "Un identifiant est requis",
                    allowEmpty : "L'identifiant saisi ne doit pas être vide",
                }
            },
            email : {
                description : 'Adresse e-mail de contact',
                type : 'string',
                format : 'email',
                required : true
            },
            description : {
                description : 'Description de votre organisation',
                type : 'string',
                maxLength : 250,
                required : true,
                messages : {
                    required : "La description est requise",
                    allowEmpty : "La description ne doit pas être vide",
                    minLength : "This description is too short (minimum is %{expected} characters)",
                    maxLength : "This description is too long (maximum is %{expected} characters)",
                }
            },
            category : {
                label : 'Catégorie',
                description : 'Sélectionner une catégorie / un type d\'organisation',
                type : 'string',
                enum : [ 'Entreprise', 'Tiers-lieu', 'Incubateur',
                        'Investisseur', 'Communauté', 'Ecole', 'Acteur public' ],
                required : true
            },
            tag : {
                label : 'Tags',
                description : 'Saisissez un ou plusieurs mot-clef',
                minItems : 3,
                maxItems : 5,
                uniqueItems : true,
                type : 'string',
                required : true,
                messages : {
                    required : "Au moins un tag est requis",
                    allowEmpty : "Le tag saisi ne doit pas être vide",
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
                type : 'string',
                required : true,
                messages : {
                    required : "Un code postal est requise.",
                    allowEmpty : "Le code postal saisi ne doit pas être vide.",
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
            coordinates : {
                label : 'Coordinates',
                description : 'Geographical coordinates',
                type : 'object',
                required : true,
                properties : {
                    lat : {
                        type : 'number',
                        required : true
                    },
                    lng : {
                        type : 'number',
                        required : true
                    }
                },
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
                messages : {
                    required : "Un site Web est requis",
                    allowEmpty : "Le site saisi ne doit pas être vide.",
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
                            && v.match(/^https?:\/\/www\.facebook\.com\/.*$/g);
                },
                messages : {
                    conform : 'La page saisie ne semble pas être une page Facebook.'
                }
            },
            googleplus : {
                label : 'Page Google+',
                description : 'Page Google+ un mot-clef',
                type : 'string',
                required : false,
                conform : function(v) {
                    return !!v
                            && v.match(/^https?:\/\/plus\.google\.\w+\/.*$/g);
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
                            && v.match(/^https?:\/\/www\.linkedin\.\w+\/.*$/g);
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
                    return !!v && v.match(/^https?:\/\/\w+\.viadeo\.\w+\/.*$/g);
                },
                messages : {
                    conform : 'La page saisie ne semble pas être une page Viadeo.'
                }
            }
        }
    };
}
