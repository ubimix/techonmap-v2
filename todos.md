== Formulaire

x vérification que le xy est bien en idf (code postal)
- Régler le pb des liens longs dans le formulaire facebook xxx non accepté
- info de validation lorsque le point n'a pas été géolocalisé

? fermer le panneau de suggestion de tags une fois qu'un a été sélectionné
- ESC > fermer le formulaire 
N afficher les messages de problème de validation uniquement à la fin quand on soumet le formulaire
* nouvelle entité créée -> la sélectionner sur la carte ensuite
- délai d'attente long lors du premier chargement
- élargir le formulaire ?
- remplacer le select de catégories par une instance ReactSelect
- si possible déclencher la géolocalisation automatiquement dés qu'un champ d'adresse est modifié / optionnellement désactiver le déplacement manuel de pin
- rafraîchir popup sur la carte après édition

== Carte

x techonmap.fr/?# corrigé
x réduire la taille des icônes des réseaux sociaux dans le popup
* quand on clique deux fois de suite sur un marqueur, le popup devient vide
* un point est sélectionné sur la carte, on crée un nouveau point : le focus reste sur le point précédemment sélectionné
- pb de synchro carte liste lors d'un clic sur un item de la carte

== Recherche

- problème dans la liste quand un seul résultat, ex : axis développement
x focus dans le champ recherche
x rechercher également dans les ids (exemple : IGN)
x tags : rétablir le bouton pour afficher tous les tags
x prioriser les champs: titre, tag, description. Aujourd'hui "Villes Internet" : la fiche de la structure n'est proposée qu'à la fin de la liste..
x lunr / accents

== Liste

x le dernier item se retrouve en top position dans la page suivante
x possibilité de désélectionner un item dans la liste
x positionnement absolu de l'icône d'édition car pour les longs noms elle était décalée à droite
- pb sur le tri +récent / -récent
- pourquoi est-ce que 'sort' est appelé deux fois dans Resource.Module.js (onAppStateChange)
? Pagination : précédent / suivant sous forme de chevrons << < 1 2 3 4 > >> + design rouge ou bleu

== Mobile

x splash screen pour mobile
- les popups sur mobile sont trop larges
x pb affichage des boutons de tri 

== Autres

- le panneau d'about ne s'affiche pas sur mobile
- passer les sources de private à public en ayant vérifié que tout ok (sans le fichier data.json)
- balises du header description etc. pour SEO
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

== Backoffice

- bug backoffice : quand on crée une entité avec un id qui avait effacé il y a une erreur qui n'est pas transmise au client (ex : minarty)

