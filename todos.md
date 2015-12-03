
# Dév
  - Formulaire: prise en compte du champ pays pour la géolocalisation
  - Authentification via Facebook et Google+
  - utiliser une autre API de géolocalisation: OSM ?
  - Auth: préfixer le login avec le nom du réseau pour davantage de clarté (les doublons sont déjà évités dans le plugin socialauth d'XWiki)
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


# Intégration
  - Intégration de l'ensemble du design
  - Formulaire: amélioration de la fenêtre d'authentification
  - marge blanche à droite des boutons
  - favicon ?
  - agrandir police de résultats

# MK
  Déplacer le formulaire de recherche au-dessus de la liste des résultats
  Mise en évidence des pays + déclencher le filtre

# Back-office
  - Rendre opérationnel l'envoi de mail
  - Liste de pays dans le form
  - Géoloc des 8 points qui apparaissent en France: il faudrait les positonner manuellement au bon endroit depuis le backoffice

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
