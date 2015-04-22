- double clic nécessaire sur Chrome / MacOS pour sélectionner tag dans formulaire
- Boîte de dialogue d'info : Merci de vous inscrire 'ici' -> doit pointer sur le popup d'auth / ou le formulaire
- quand on clique deux fois de suite sur un marqueur, le popup devient vide
x vérifier que le tri fonctionne bien
- afficher les messages de problème de validation uniquement à la fin quand on soumet le formulaire
- recherche 'arty'

- peut-on mettre le focus sur le champ nom plutôt que le champ des tags
fermer le panneau de suggestion de tags une fois qu'un a été sélectionné
délai d'attente au premier chargement

- l'icône d'édition est toujours trop à droite parfois

rétablir le bouton permettant d'afficher tous les tags

la création de point

changement dynamique de catégories
rendre le site web obligatoire

bug backoffice : quand on crée une entité avec un id qui avait effacé il y a une erreur qui n'est pas transmise au client (ex : minarty)


voir ce qu'on peut faire avec les clusters

pourquoi est-ce que 'sort' est appelé deux fois dans Resource.Module.js (onAppStateChange)
loading screen sur mobile

- ESC > fermer le formulaire 

- publier sources
- crédits OpenStreetMap
- sélection entité puis clic sur tag utilisé par cette entité : on perd le focus

cluster à éclater
tags / catégories déselection
désélection d'un item dans la liste

== Formulaire

- revoir le tri
- suggestion de tags avec accents
- info de validation lorsque le point n'a pas été géolocalisé
- si possible déclencher la géolocalisation automatiquement dés qu'un champ d'adresse est modifié / optionnellement désactiver le déplacement manuel de pin
- tags : si possible n'afficher qu'un seul champ tag et un bouton pour en afficher d'autres
*** l'afficher sur la carte ensuite
- vérification que le xy est bien en idf
- Déplacer le 'Leaflet'

Comment sont triés les tags prioritaires ?

== Recherche

- tags : rétablir un bouton pour afficher tous les tags
- prioriser les champs: titre, tag, description. Aujourd'hui "Villes Internet" : la fiche de la structure n'est proposée qu'à la fin de la liste..

Liste
=====
o masquer le partage sur les réseaux le temps qu'on décide
- Pagination : précédent / suivant sous forme de chevrons << < 1 2 3 4 > >> + bords carrés et design rouge ou bleu

== Autres

- voir comment centrer verticalement les images de chargement
- écran de chargement suite à commentaire MK zeroisthree.se position:relative, top:50%, transform: translateY(-50%);
- probleme avec la heatmap sur certains navigateurs / OS : pas de rouge (cf ordi Charlotte)

Données
=======
- Mise à jour des données
- Regrouper tags à regrouper
- répertorier les tags qui sont à 0 et les mettre à jour (ex: 'telecentre')



Embarquement
============
- 3 modes d'agencement : sans menu, avec menu, version réduite
- ne pas centrer sur Paris s'il y a des critères de recherche appliqués
x Embarquement iframe: indiquer l'URL complète, pas seulement les paramètres à ajouter à l'URL

Design
======
- ne pas mettre les stats en bold car pb sur bold
- Les symboles pour dézoomer ne sont pas centrés (ni sur la hauteur ni sur la largeur)
- bordure grise en plus du drop-shadow
- sur grand écran les boutons du menu passent au centre au lieu d'être calés à droite. La liste doit avoir un min-width et un max-width

Autres
======
x permalien et partage d'entités individuelles via fragments
- s'assurer que lorsque des entreprises présentes sont situées hors IdF la carte est bien centrée sur l'IdF quand même
- Il faudra s'assurer au moment de la communication que le code est bien disponible sur GitHub
- Rétablir Google Analytics
- Bouton 'ok' des boîtes de dialogue
- Ajouter crédits OpenStreetMap

== Mobile

splash screen pour mobile
les popups sur mobile sont trop larges
pb affichage des boutons de tri 



