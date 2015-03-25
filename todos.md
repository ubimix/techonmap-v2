Twitter à rétablir
Authentification avec Facebook
check identifiant
Mettre des icônes pour gagner de la place pour éviter le scroll vertical
logos
SIRET: check sur le SIRET bien formatté un chiffre sert à valider
Problème de sélection de tags
Site Web: champ libre avec ou sans http avec ou sans http
Création de fiche -> l'afficher sur la carte ensuite
pas de géolocalisation -> warning
champ mail
envoyer contacts
écrire http://www.siteweb.com


Données
=======
x Mise à jour des données
x réinjection des e-mails System@tic (cf PJ)
- répertorier les tags qui sont à 0 et les mettre à jour (ex: 'telecentre')

Authentification
================
x authentification via réseaux sociaux
x Mettre l'écran d'authentification existant en modal
- gestion de session après refresh


Formulaire de contact
=====================
x 'votre message a bien été envoyé' cf maquette Antony
x message de confirmation dans le popup lui-même et non dans une boîte
de dialogue externe
x S'assurer que tous les messages de validation du formulaire sont bien
traduits ('must contain', 'is required', ...)
x Vérifier qu'il y a bien une validation sur le champ e-mail
x Ajouter objet 'Suggestion', et le mettre par défaut
x màj adresse de contact (Maria)

Formulaire d'édition
====================
x vraie boîte de dialogue d'alerte lors de la soumission
x sauvegarde des nouvelles entrées et des modifications
x Supprimer les 'http://www.facebook.com' etc. des champs de réseaux sociaux
x http://www.twitter.com -> @
- supprimer le champ 'Identifiant' lors de l'édition d'une fiche
- certains tags n'apparaissent pas dans la completion + revoir le tri
- problème de curseur dans les champs (début / fin de champ)
- info de validation lorsque le point n'a pas été géolocalisé
- si possible déclencher la géolocalisation automatiquement dés qu'un
champ d'adresse est modifié / optionnellement désactiver le déplacement
manuel de pin
- ajouter vérification des identifiants déjà pris
- génération automatique d'identifiant
- tags : si possible n'afficher qu'un seul champ tag et un bouton pour
en afficher d'autres
mail obligatoire lors de l'edition mais pas lors dela

Recherche
=========
- prioriser les champs: titre, tag, description. Aujourd'hui "Villes
Internet" : la fiche de la structure n'est proposée qu'à la fin de la
liste..
- sur mobile : afficher le nombre de résultats sur une ligne, et les boutons sur une autre
- sur mobile : affichage des tags d'une catégorie : pb d'agencement visuel

Liste
=====
o masquer le partage sur les réseaux le temps qu'on décide
- Pagination : précédent / suivant sous forme de chevrons

Carte
======
- sur mobile : popup vide lors d'un clic sur marqueur proche d'un
cluster (ex cluster rue d'Uzès)

Embarquement
============
- 3 modes d'agencement : sans menu, avec menu, version réduite
- ne pas centrer sur Paris s'il y a des critères de recherche appliqués
- Embarquement iframe: indiquer l'URL complète, pas seulement les
paramètres à ajouter à l'URL

Design
======
- ne pas mettre les stats en bold car pb sur bold
- Les symboles pour dézoomer ne sont pas centrés (ni sur la hauteur ni sur la largeur)
- bordure grise en plus du drop-shadow
- pagination : mettre un chevron simple et un chevron double << < 1 2 3 4 > >>
- sur grand écran les boutons du menu passent au centre au lieu d'être
calés à droite. La liste doit avoir un min-width et un max-width

Autres
======
o permalien et partage d'entités individuelles via fragments
- fil twitter
- s'assurer que lorsque des entreprises présentes sont situées hors IdF la carte est bien centrée sur l'IdF quand même
- Il faudra s'assurer au moment de la communication que le code est bien disponible sur GitHub
- Déplacer le 'Leaflet'
- Rétablir Google Analytics
- Site Web : http:
- Possible template de tweet pour inciter les utilisateurs à publier sur Twitter qu'ils sont présent sur ToM
- Bouton 'ok' des boîtes de dialogue

cluster à éclater 
tags / catégories déselection
désélection d'un item dans la liste
 

