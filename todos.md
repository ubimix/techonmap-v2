== Formulaire

Tags:
- info de validation lorsque le point n'a pas été géolocalisé
- Régler le pb des liens longs dans le formulaire facebook xxx non accepté
- vérification que le xy est bien en idf (code postal)
- fermer le panneau de suggestion de tags une fois qu'un a été sélectionné
- délai d'attente long lors du premier chargement
- élargir le formulaire ?
- remplacer le select de catégories par une instance ReactSelect
- si possible déclencher la géolocalisation automatiquement dés qu'un champ d'adresse est modifié / optionnellement désactiver le déplacement manuel de pin
* nouvelle entité créée -> la sélectionner sur la carte ensuite
N afficher les messages de problème de validation uniquement à la fin quand on soumet le formulaire
- ESC > fermer le formulaire 
- rafraîchir popup sur la carte après édition

== Carte

- techonmap.fr/?#
* quand on clique deux fois de suite sur un marqueur, le popup devient vide
* un point est sélectionné sur la carte, on crée un nouveau point : le focus reste sur le point précédemment sélectionné
- voir ce qu'on peut paramétriser sur les clusters
- réduire la taille des icônes des réseaux sociaux dans le popup

== Recherche

- rechercher également dans les ids (exemple : IGN)
x tags : rétablir le bouton pour afficher tous les tags
x prioriser les champs: titre, tag, description. Aujourd'hui "Villes Internet" : la fiche de la structure n'est proposée qu'à la fin de la liste..
x lunr / accents

== Liste

- le dernier item se retrouve en top position dans la page suivante
- Pagination : précédent / suivant sous forme de chevrons << < 1 2 3 4 > >> + design rouge ou bleu
x possibilité de désélectionner un item dans la liste
(attention : il faudrait le déselectionner dans la carte ?)
x positionnement absolu de l'icône d'édition
- pourquoi est-ce que 'sort' est appelé deux fois dans Resource.Module.js (onAppStateChange)
- l'icône d'édition est toujours trop à droite parfois


== Autres

- passer les sources de private à public en ayant vérifié que tout ok
- balises du header description etc. pour SEO
- voir comment centrer verticalement les images de chargement
- écran de chargement suite à commentaire MK zeroisthree.se position:relative, top:50%, transform: translateY(-50%);
- probleme avec la heatmap sur certains navigateurs / OS : pas de rouge (cf ordi Charlotte)


== Mobile

- splash screen pour mobile
- les popups sur mobile sont trop larges
- pb affichage des boutons de tri 


== Embarquement

- ne pas centrer sur Paris s'il y a des critères de recherche appliqués

== Design

- ne pas mettre les stats en bold car pb sur bold
- Les symboles pour dézoomer ne sont pas centrés (ni sur la hauteur ni sur la largeur)
- bordure grise en plus du drop-shadow
- sur grand écran les boutons du menu passent au centre au lieu d'être calés à droite. La liste doit avoir un min-width et un max-width

== Backkoffice

- bug backoffice : quand on crée une entité avec un id qui avait effacé il y a une erreur qui n'est pas transmise au client (ex : minarty)

