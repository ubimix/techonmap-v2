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

- il faut dire à Maria quand on n'a pas les éléments


http://www.syntec-numerique.fr/annuaire-des-adherents

+ référencement de TechOnMap





