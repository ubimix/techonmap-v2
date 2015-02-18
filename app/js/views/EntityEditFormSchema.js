var _ = require('underscore');
var BootstrapFormValidator = require('./utils/BootstrapFormValidator');

var validator = new BootstrapFormValidator({
    schema : {
        properties : {
            name : {
                description : 'Nom de votre organisation',
                type : 'string',
                required : true,
                messages : {
                    required : "Un nom est requis",
                    allowEmpty : "Le nom saisi ne doit pas être vide",
                }
            },
            id : {
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
                required : true
            },
            category : {
                description : 'Sélectionner une catégorie / un type d\'organisation',
                type : 'string',
                enum : [ 'Entreprise', 'Incubateur', 'Investisseur' ],
                required : true
            },
            tag1 : {
                description : 'Saisissez un mot-clef',
                type : 'string',
                required : true,
                messages : {
                    required : "Au moins un tag est requis",
                    allowEmpty : "Le tag saisi ne doit pas être vide",
                }
            },
            tag2 : {
                description : 'Saisissez un mot-clef',
                type : 'string',
                required : true,
                messages : {
                    required : "Au moins un tag est requis",
                    allowEmpty : "Le tag saisi ne doit pas être vide",
                }
            },
            tag3 : {
                description : 'Saisissez un mot-clef',
                type : 'string',
                required : true,
                messages : {
                    required : "Au moins un tag est requis",
                    allowEmpty : "Le tag saisi ne doit pas être vide",
                }
            },
            tag4 : {
                description : 'Saisissez un mot-clef',
                type : 'string',
                required : true,
                messages : {
                    required : "Au moins un tag est requis",
                    allowEmpty : "Le tag saisi ne doit pas être vide",
                }
            },
            tag5 : {
                description : 'Saisissez un mot-clef',
                type : 'string',
                required : true,
                messages : {
                    required : "Au moins un tag est requis",
                    allowEmpty : "Le tag saisi ne doit pas être vide",
                }
            },
            address : {
                description : 'Adresse de votre organisation',
                type : 'string',
                required : true,
                messages : {
                    required : "Une adresse est requise.",
                    allowEmpty : "L'adresse saisie ne doit pas être vide.",
                }
            },
            url : {
                description : 'Site Web de votre organisation',
                type : 'string',
                required : true,
                messages : {
                    required : "Un site Web est requis",
                    allowEmpty : "Le site saisi ne doit pas être vide",
                }
            },
            twitter : {
                description : 'Compte Twitter de votre organisation',
                type : 'string'
            },
            facebook : {
                description : 'Page Facebook de votre organisation',
                type : 'string'
            },
            googleplus : {
                description : 'Saisissez un mot-clef',
                type : 'string',
                required : false
            },
            linkedin : {
                description : 'Page LinkedIn de votre organisation',
                type : 'string',
                required : false
            },
            viadeo : {
                description : 'Page Viadeo de votre organisation',
                type : 'string',
                required : false
            } 
        }
    }
});