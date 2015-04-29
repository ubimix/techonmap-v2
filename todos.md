
recherche de tags é/e
pb http dans les popups ex: Bébé et Tournevis

'nous n'avons rien pu trouver pour votre requête'

Google Analytics
balises description etc.
lunr / accents

== Formulaire

Tags:
x mettre le focus sur le champ nom plutôt que sur le champ des tags
- fermer le panneau de suggestion de tags une fois qu'un a été sélectionné
* interdire l'ajout de tags tant qu'une catégorie n'a pas été sélectionnée
- délai d'attente long lors du premier chargement
x double clic nécessaire sur Chrome / MacOS pour sélectionner tag dans formulaire
- élargir le formulaire
- remplacer le select de catégories par une instance ReactSelect
- revoir le tri
- suggestion de tags avec accents
- info de validation lorsque le point n'a pas été géolocalisé
- si possible déclencher la géolocalisation automatiquement dés qu'un champ d'adresse est modifié / optionnellement désactiver le déplacement manuel de pin
* nouvelle entité créée -> la sélectionner sur la carte ensuite
- vérification que le xy est bien en idf
- afficher les messages de problème de validation uniquement à la fin quand on soumet le formulaire
- [SL] ESC > fermer le formulaire 
- rafraîchir popup sur la carte

== Carte

* quand on clique deux fois de suite sur un marqueur, le popup devient vide
* un point est sélectionné sur la carte, on crée un nouveau point : le focus reste sur le point précédemment sélectionné
- voir ce qu'on peut paramétriser sur les clusters


== Recherche

** tags : rétablir le bouton pour afficher tous les tags
- prioriser les champs: titre, tag, description. Aujourd'hui "Villes Internet" : la fiche de la structure n'est proposée qu'à la fin de la liste..

== Liste

- possibilité de désélectionner un item dans la liste
o masquer le partage sur les réseaux le temps qu'on décide
* [SL] Pagination : précédent / suivant sous forme de chevrons << < 1 2 3 4 > >> + bords carrés et design rouge ou bleu
- pourquoi est-ce que 'sort' est appelé deux fois dans Resource.Module.js (onAppStateChange)
- l'icône d'édition est toujours trop à droite parfois


== Autres

* [SL] passer les sources de private à public en ayant vérifié que tout ok
x [SL] crédits OpenStreetMap
* [SL] Rétablir Google Analytics
- panneau 'A propos': texte "merci de cliquer sur le bouton" à remplacer par 'merci de vous inscrire ici' pointant sur le formulaire
- voir comment centrer verticalement les images de chargement
- écran de chargement suite à commentaire MK zeroisthree.se position:relative, top:50%, transform: translateY(-50%);
- probleme avec la heatmap sur certains navigateurs / OS : pas de rouge (cf ordi Charlotte)

== Embarquement

- ne pas centrer sur Paris s'il y a des critères de recherche appliqués

== Design

- ne pas mettre les stats en bold car pb sur bold
- Les symboles pour dézoomer ne sont pas centrés (ni sur la hauteur ni sur la largeur)
- bordure grise en plus du drop-shadow
- sur grand écran les boutons du menu passent au centre au lieu d'être calés à droite. La liste doit avoir un min-width et un max-width

== Mobile

- splash screen pour mobile
- les popups sur mobile sont trop larges
- pb affichage des boutons de tri 

== Backkoffice

- bug backoffice : quand on crée une entité avec un id qui avait effacé il y a une erreur qui n'est pas transmise au client (ex : minarty)




