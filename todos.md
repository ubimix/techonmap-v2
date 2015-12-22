
x bug affichage de l'année de création dans la liste des entités: lorsque le champ année n'est pas complété, cela affiche Année de création 0. (exemple Y'ems Group)
x bug effet périmètre du cluster : quand tu passes avec la souris sur un cluster, le périmètre s'affiche aléatoirement: soit trop grand, soit trop petit, soit ne s'affiche pas du tout
x l'idéal serait d'avoir une différence visuelle du bouton connexion/déconnexion, quand déconnexion vert, connexion bleu.
- la heatmap c'est mieux mais pas encore top, parlos-en!
- ok pour les partage sélection tout va bien. Juste un problème de décalage des colonnes pour Minodoo, c'est peut-être un problème avec le fichier d'origine qu'on vous a passé.
- si tu arrives à reproduire ce bug, ça m'est arrivé plusieurs fois et Boudour aussi : tu es connecté, tu te déconnectes, puis la fen^tre avec l'inscription s'affiche, mais avant de sélectionner une des 4 modalités d'inscription, s'affiche un message d'erreur d'authentification.


Attention quand on ajoute ?mobile pb de layout
Couleur de la scrollbar

- Cluster : éclater les clusters si moins de 5 entités avec des adresses diférentes
- bug de géoloc : structures avec adresses remplies mais géolocalisées centre-ville ex: Abidjan, voir Ovillage et la géoloc Google / Abidjan Zone 4, Rue Paul Langevin, Immeuble BADEYA, Abidjan

# Dév
  x Authentification Google+
  - supprimer les xredirect inutiles vers LoggedIn?xpage=plain
  - Paramétrage heatmap
  - Mise en valeur des pays au survol de la souris + filtrage
  - Récupérer les contenus markdown depuis le nouveau backoffice
  - Déplacement du formulaire de recherche au-dessus de la liste de résultats
  - Partage de la carte filtrée sur Ecole

  - Formulaire: limiter la taille max de tous les champs
  - Formulaire: indicatif tél auto si possible
  - Formulaire: imposer le remplissage d'au moins une URL (web ou réseaux sociaux) si possible
  - Modifier le Google Analytics
  - gestion d'erreur quand la sauvegarde ne se fait pas
  - traduction des messages de social auth
  - http://tam.ubimix.com:8090/ masquer Tomcat

  - La geoloc c'est le plus important!
  - auth réseaux
  - boutons couleur auth
  - le filtrage par catégorie en place mais pas fonctionnel
  - dans le formulaire, j'ai eu des difficultés à inscrire une entité, alors même que j'ai utilisé une adresse complète, avec code postal etc..
  - envoi de mail formulaire contact
  - pb de clustering : cela change en fonction du tri : par nom/ par date et  "de a à z" ou "de z à a"
  - les 8 adresses geoloc en France
  - couleurs pictos : il reste les demi-tons foncé pour les sélctions: anto doit fournir les codes couleur

  les couleurs des pictos dans la liste changent de couleur à la sélection avec mauvaise couleur

# Intégration
  x marge blanche à droite des boutons
    chevrons de couleur

# Back-office
  - Rendre opérationnel l'envoi de mail
  - Liste de pays dans le form

http://nominatim.openstreetmap.org/search.php?street=89%20rue%20Joseph%20T.%20Gomis&city=Dakar&country=S%C3%A9n%C3%A9gal
http://nominatim.openstreetmap.org/search.php?street=89%20rue%20Joseph%20T.%20Gomis&city=Dakar&country=S%C3%A9n%C3%A9gal&format=json

  http://tam.ubimix.com:8090/xwiki/bin/login/XWiki/XWikiLogin?sl_callback=1&sl_provider=facebook

  https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find.htm
  https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
  http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?City=Lubumbashi&country=COD&outFields=*&forStorage=false&f=pjson
  http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?Address=380+new+york+st&City=redlands&Region=CA&Postal=92373&outFields=*&forStorage=false&f=pjson

http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=380+New+York+Street,+Redlands,+CA+92373&category=&outFields=*&forStorage=false&f=pjson
http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=Grand Dakar, Dakar, Senegal&category=&outFields=*&forStorage=false&f=pjson

http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=89 rue Joseph T. Gomis, Dakar, Sénégal&category=&outFields=*&forStorage=false&f=pjson


http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=89 rue Joseph T. Gomis&City=Dakar&countryCode=Sénégal&category=&outFields=*&forStorage=false&f=pjson

http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?Address=89 rue Joseph T. Gomis&City=Dakar&countryCode=S%C3%A9n%C3%A9gal&outFields=*&forStorage=false&f=pjson


https://doc.arcgis.com/en/arcgis-online/reference/geocode-coverage.htm





________________________________
