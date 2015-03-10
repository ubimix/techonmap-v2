Données
=======
- répertorier les tags qui sont à 0 et les mettre à jour (ex: 'telecentre')

Chargement
==========
+ Antony : envoyer le logo ballon de couleur
- intégrer le logo ToM multi-color sur la home
- si possible barre de progression le temps du chargement

Liste
=====
o masquer le partage sur les réseaux le temps qu'on décide

Carte
=====
+ nouvelle couleur et nouveau picto tiers-lieux / besoin d'un update des icônes sans marge par Antony 
+ vérifier la couleur icône tiers-lieux

Mobile / responsive
==================
- ajouter le nombre de résultats par catégorie et par zone
- détection automatique des écrans mobiles
- double détection : résolution / navigateur mobile. bloquer le passage au mode mobile
+ quand on réduit l'écran, la liste devient étroite et certains textes disparaissent (ex: description de La Fonderie) -> peut-être élargir la liste  pour les versions d'écran intermédiaires
- activer l'affichage du nombre de résultats sur le premier écran de recherche
- centrer le logo verticalement
- ajouter le logo de la fonderie à l'écran de chargement
- popup vide lors d'un clic sur marqueur proche d'un cluster (ex cluster rue d'Uzès)



Embarquement
============
- 2 modes desktop avec / sans menu on verra si le mode mobile est demandé / nécessaire 
- voir si le filtre par zone est désactivable en mode embarqué sur une zone donnée : ex l'élu du Val d'Oise embarque TechOnMap avec menu, il ne souhaite pas que l'utilisateur puisse aller sur un autre département
- ne pas centrer sur Paris s'il y a des critères de recherche appliqués
- soit il n'y a pas de paramètre dans l'URL, et alors choix mobile / non mobile en fonction de la résolution, soit il y a un paramètre explicite dans l'URL qui surcharge le comportement défini par la résolution.
- embarquement sans modifier la sélection : griser les filtres sur la carte / à préciser

Formulaire de contact
=====================
+ 'votre message a bien été envoyé' cf maquette qu'Antony va renvoyer
- message de confirmation dans le popup lui-même et non dans une boîte de dialogue externe

Design
======
- Antony : fourniture des icônes compatibles Icomoon (tiers-lieu et entreprise)
- Antony : fourniture de icône ToM multi-color SVG
+ ne pas mettre les stats en bold car pb sur bold
- vérifier l'origine tasssement des icônes cf reemarques Antony
- Antony : dans les avatars, celui de l’entreprise s’affiche mal encore une fois, problème du au changement de format ou au dessin en lui même ? / peut-être utiliser uniquement des entiers dans les coordonnées
- Antony : le chevron pour augmenter ou réduire la liste des points, est légèrement flou et non symétrique,
toujours la même question d’où vient le soucis ?
- Les symboles pour dézoomer ne sont pas centrés (ni sur la hauteur ni sur la largeur)
- bordure grise en plus du drop-shadow
- pagination : mettre un chevron simple et un chevron double <<  < 1 2 3 4 >  >>
+ sur grand écran les boutons du menu passent au centre au lieu d'être calés à droite. La liste doit avoir un min-width et un max-width


Formulaire d'édition
====================
+ une fois qu'on saisit un caractère, afficher la totalité des tags existants pour l'autocompletion
+ info de validation lorsque le point n'a pas été géolocalisé
+ si possible déclencher la géolocalisation automatiquement dés qu'un champ d'adresse est modifié / optionnellement désactiver le déplacement manuel de pin
+ vérifier validation réseaux sociaux
+ ajouter vérification des identifiants déjà pris
+ voir si génération automatique d'identifiant faisable
+ changer les libellés Compte Facebook etc. en 'Page Facebook'
+ Facebook: "Saisissez l'URL de la page Facebook" au lieu de "Saisisez le compte Facebook"
+ année de création : mettre une select box ?
+ besoin que l'authentification via les autres réseaux sociaux soit opérationnel
+ tags : si possible n'afficher qu'un seul champ tag et un bouton pour en afficher d'autres 
+ titre : Ajouter / Editer une organisation
+ peut-être élargir la largeur de la colonne des labels pour éviter trop de retours chariot dans les labels
+ 'Catégorie'
+ ajouter une étoile pour les champs obligatoires
+ identifiant : indiquer "http://techonmap.fr/" #ubimix / Twitter : https://twitter.com/ubimix


Authentification
================
+ Mettre l'écran d'authentification existant en modal

NB: 4 niveaux de droits d'accès
    - non logués
    - authentifié non admin
    - authentifié admin
    - il faut pouvoir distinguer le propriétaire d'une entreprise d'un autre
    Olivier : l'auteur des fiches ne sera pas nécessairement le propriétaire de ces pages
    il faudra peut-être automatiser certaines alertes sur les changements


Autres
======
o permalien et partage d'entités individuelles via fragments
- finalisation partage carte réseaux sociaux
- fil twitter
- afficher un message quand la liste de résultats est vide / liste de tags dans zone de recherche
- adresse e-mail à utiliser dans le formulaire de contact
- mettre à jour le texte de l'à propos utilisé par Facebook
- regarder comment poster une fiche individuelle dans Facebook
- s'assurer que lorsque des entreprises présentes sont situées hors IdF la carte est bien centrée sur l'IdF quand même

----

x Mettre à jour les données
- S'assurer que tous les messages de validation du formulaire sont bien traduits ('must contain', 'is required', ...)
- Vérifier qu'il y a bien une validation sur le champ e-mail
- Envlever le scroll dans les tags ?
- Trier en conservant les accents dans les tags
- Vérifier développeur  / développeurs, Art / art
- Mettre une vraie boîte de dialogue d'alerte lors de la soumission du formulaire
- Supprimer le champ 'Identifiant' lors de l'édition d'une fiche
x Supprimer les 'http://www.facebook.com' etc. des champs de réseaux sociaux
x Ajouter objet 'Suggestion', et le mettre par défaut
- Embarquement iframe: indiquer l'URL complète, pas seulement les paramètres à ajouter à l'URL
- Déplacer le 'Leaflet'
x http://www.twitter.com -> @
- Rétablir Google Analytics
- Pagination : précédent / suivant sous forme de chevrons
- Il faudra s'assurer au moment de la communication que le code est bien disponible sur GitHub
- Est-ce qu'on ne met pas "La carte du numérique en Île-de-France"
- il va falloir enlever le http de tous les sites web dans les données (ou bien on le modifie en live lors de l'édition) 
- Possible template de tweet pour inciter les utilisateurs à publier sur Twitter qu'ils sont présent sur ToM




Formulaire d'édition grand public
==========================

Dans A propos de votre organisation:

=> rajouter Identifiant Techonmap: www.techonmap .fr/.. puis champ à remplir

TAGs: 

=> auto complétion : prendre en compte l'ensemble des tags (à présent uniquement l'ensemble des tags mis en avant pour les 7 catégories)

ex: je tappe "art", je ne le retrouve pas dans les tags (alors qu'il existe...)
 
=> qq fois blocage:  impossible de sélectionner les tags proposés

SITE WEB: faciliter le renseignement du champs:

Site web:  http:// puis champ à remplir

GEOLOC: 

=> une fois l'adresse remplie, et le bouton géoloc sélectionné, pouvoir visualiser le résultat sur la carte (zoom)

=> vérifier que message d'alerte si on oublie de géolocaliser

RESEAUX SOCIAUX

=> rajouter les adresses 

ex Compte twitter: https://twitter.com/, puis champ à remplir

etc..

=>  Rajouter message de confirmation de l'inscription

 

    Partage de la carte

 ===============

=> Option du partage sans menu (fonctionne pas encore)

=> Option présélectionnée adapté à la situation.. je m'explique: je n'applique pas de filtres, dans le partage, l'option présélectionnée sera le partage de la carte; à l'inverse, j'applique des filtres, l'option présélectionnée sera le partage d'une sélection

IDEM pour l'export (dixit Olivier)
 
Je n'ai pas réussi à installer la version locale de git-based backoffice pour ToM. 
J'ai implémenté la sauvegarde pour les ressources sans le vérifier.
Ca serait super si tu peut faire l'installation et compléter la sauvegarde des ressources.
* "app/js/models/edit/Edit.Module.js #_saveResource" (line 370) - envoye les ressources. Éventuellement Il faut changer l'URL si il ne corresponds pas a l'URL de sauvegarde dans backoffice.
* "app/js/views/dialogs/EditEntityPopup.jsx #_showMessage" - Les messages d'erreurs pour l'éditions il faut recopier et les mettre dans un popup (à la place d'un alerte box) - comme dans  "app/js/views/dialogs/FeedbackPopup.jsx #_showMessage"

La connections avec le login n'est pas fait. Il faut l’implémenter à la base d’exemple qui est dans "/app/tmp/index.html". On peut mettre les buttons des login FB/TW/LIn dans un iframe dans popup.html et quand l'utilisateur est loggée - fermer le popup et passer à l'édition. 

ToM
    - Authentification
    - Sauvegarde
    - Backoffice extensions

PRM : 3500 EUR HT / an hébergement, maintenance corrective

VdeMarne
    demain
    
Renaud Eon
    Exposer les pistes
        Prestation de services
        Studio cartes interactives -> 6 HM 
        Studio cartes imprimables / pas de concurrence directe / construction d'index, de grilles, sélection de zones -> 6HM
        Studio cartes interactives + cartes imprimables
        Je suis ici / cartes embarquées dans des boîtiers
        peut-être recourir à un ou deux freelances

Bouygues / JC Decaux
        Clients pilotes
        Studio cartes imprimables et boîtiers           

Compta

Chèques

Lova 

