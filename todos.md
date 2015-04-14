== P1 Auth

* Maintenir la session active + Bouton "Se déconnecter" à ajouter dans la barre Twitter quand on est connecté. 
* Pb dans le process d'identification. Lorsqu'on ne suit pas les étapes mais qu'on refuse l'autorisation des applications (exemple: je choisi facebook puis j'annule pour choisir un autre réseau) c'est l'ancienne fenêtre d'authentification (twitter et G+) qui s'affiche. J'ai choisi facebook puis cliqué sur annulé, j'ai vu une fenêtre tom qui disait que j'étais déjà connecté et que je pouvais soit me déconnecter soit aller au dashboard.. J'ai choisi déconnecter mais me suis retrouvé sur le formulaire tout de même. Bref c'est le bazar !


== P2 Formulaire

* [SL] Le contrôle de saisie du SIRET ne fonctionne pas (impossible de valider le formulaire avec les 14 chiffres)
* SIRET: check sur le SIRET bien formatté un chiffre sert à valider / formule de Luhn
* Le contrôle de saisie du champ site web ne fonctionne pas comme convenu.
* [MK] De plus il est impossible de le corriger (le curseur de saisie saute automatiquement à la fin du champ)
* Site Web: champ libre avec ou sans http avec ou sans http
* écrire http://www.siteweb.com
- revoir le tri
- suggestion de tags avec accents
- problème de curseur dans les champs (début / fin de champ)
- info de validation lorsque le point n'a pas été géolocalisé
- si possible déclencher la géolocalisation automatiquement dés qu'un champ d'adresse est modifié / optionnellement désactiver le déplacement manuel de pin
- génération automatique d'identifiant
- tags : si possible n'afficher qu'un seul champ tag et un bouton pour en afficher d'autres
- mail obligatoire lors de l'edition mais pas lors dela
* création de fiche -> l'afficher sur la carte ensuite
* champ mail
* Problème de sélection de tags
* pas de géolocalisation -> warning
* vérification que le xy est bien en idf
- Déplacer le 'Leaflet'

== Autres

* Twitter à rétablir
* voir comment centrer verticalement les images de chargement
* modif de l'écran de chargement suite à commentaire MK zeroisthree.se position:relative, top:50%, transform: translateY(-50%);
* probleme avec la heatmap sur certains navigateurs / OS : pas de rouge (cf ordi Charlotte)


Données
=======
x Mise à jour des données
- répertorier les tags qui sont à 0 et les mettre à jour (ex: 'telecentre')

Recherche
=========
- prioriser les champs: titre, tag, description. Aujourd'hui "Villes Internet" : la fiche de la structure n'est proposée qu'à la fin de la liste..

Liste
=====
o masquer le partage sur les réseaux le temps qu'on décide
- Pagination : précédent / suivant sous forme de chevrons

Carte
======
- sur mobile : popup vide lors d'un clic sur marqueur proche d'un cluster (ex cluster rue d'Uzès)

Embarquement
============
- 3 modes d'agencement : sans menu, avec menu, version réduite
- ne pas centrer sur Paris s'il y a des critères de recherche appliqués
- Embarquement iframe: indiquer l'URL complète, pas seulement les paramètres à ajouter à l'URL

Design
======
- ne pas mettre les stats en bold car pb sur bold
- Les symboles pour dézoomer ne sont pas centrés (ni sur la hauteur ni sur la largeur)
- bordure grise en plus du drop-shadow
- pagination : mettre un chevron simple et un chevron double << < 1 2 3 4 > >>
- sur grand écran les boutons du menu passent au centre au lieu d'être calés à droite. La liste doit avoir un min-width et un max-width

Autres
======
o permalien et partage d'entités individuelles via fragments
- fil twitter
- s'assurer que lorsque des entreprises présentes sont situées hors IdF la carte est bien centrée sur l'IdF quand même
- Il faudra s'assurer au moment de la communication que le code est bien disponible sur GitHub
- Rétablir Google Analytics
- Possible template de tweet pour inciter les utilisateurs à publier sur Twitter qu'ils sont présent sur ToM
- Bouton 'ok' des boîtes de dialogue
- Ajouter crédits OpenStreetMap

cluster à éclater
tags / catégories déselection
désélection d'un item dans la liste
 

