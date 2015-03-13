


Données
=======
x [v2.0] réinjection des e-mails System@tic (cf PJ)
- répertorier les tags qui sont à 0 et les mettre à jour (ex: 'telecentre')


Liste
=====
o masquer le partage sur les réseaux le temps qu'on décide

Carte
======
- sur mobile : popup vide lors d'un clic sur marqueur proche d'un cluster (ex cluster rue d'Uzès)

Embarquement
============
- voir si le filtre par zone est désactivable en mode embarqué sur une zone donnée : ex l'élu du Val d'Oise embarque TechOnMap avec menu, il ne souhaite pas que l'utilisateur puisse aller sur un autre département
- ne pas centrer sur Paris s'il y a des critères de recherche appliqués
- embarquement sans modifier la sélection : griser les filtres sur la carte / à préciser

Formulaire de contact
=====================
x 'votre message a bien été envoyé' cf maquette Antony
x message de confirmation dans le popup lui-même et non dans une boîte de dialogue externe

Design
======
- ne pas mettre les stats en bold car pb sur bold
- Les symboles pour dézoomer ne sont pas centrés (ni sur la hauteur ni sur la largeur)
- bordure grise en plus du drop-shadow
- pagination : mettre un chevron simple et un chevron double <<  < 1 2 3 4 >  >>
- sur grand écran les boutons du menu passent au centre au lieu d'être calés à droite. La liste doit avoir un min-width et un max-width

Formulaire d'édition
====================
- certains tags n'apparaissent pas dans la completion + revoir le tri
- problème de curseur dans les champs (début / fin de champ)
- info de validation lorsque le point n'a pas été géolocalisé
- si possible déclencher la géolocalisation automatiquement dés qu'un champ d'adresse est modifié / optionnellement désactiver le déplacement manuel de pin
- vérifier validation réseaux sociaux
- ajouter vérification des identifiants déjà pris
- génération automatique d'identifiant 
x sauvegarde des nouvelles entrées et des modifications
- tags : si possible n'afficher qu'un seul champ tag et un bouton pour en afficher d'autres 
NB: 4 niveaux de droits d'accès
    - non logués
    - authentifié non admin
    - authentifié admin
    - il faut pouvoir distinguer le propriétaire d'une entreprise d'un autre
    Olivier : l'auteur des fiches ne sera pas nécessairement le propriétaire de ces pages
    il faudra peut-être automatiser certaines alertes sur les changements

Recherche
=========

- prioriser les champs: titre, tag, description. Aujourd'hui "Villes Internet" : la fiche de la structure n'est proposée qu'à la fin de la liste..

Authentification
================
x authentification via réseaux sociaux
x Mettre l'écran d'authentification existant en modal
- gestion de session après refresh

Autres
======
o permalien et partage d'entités individuelles via fragments
- finalisation partage carte réseaux sociaux
- fil twitter
x afficher un message quand la liste de résultats est vide / liste de tags dans zone de recherche
- adresse e-mail à utiliser dans le formulaire de contact
- mettre à jour le texte de l'à propos utilisé par Facebook
- regarder comment poster une fiche individuelle dans Facebook
- s'assurer que lorsque des entreprises présentes sont situées hors IdF la carte est bien centrée sur l'IdF quand même

----

x Mettre à jour les données
x S'assurer que tous les messages de validation du formulaire sont bien traduits ('must contain', 'is required', ...)
x Vérifier qu'il y a bien une validation sur le champ e-mail
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
- Site Web : http: 
- Possible template de tweet pour inciter les utilisateurs à publier sur Twitter qu'ils sont présent sur ToM

vérifier que l'id saisi est bien disponible
quand on clique sur 'Revenir à la carte' dans le FeedbackPopup il y a pb de validation de champ la première fois

ajouter un paramètre 'Ok'

curseur dans les champs

se protéger du spam

