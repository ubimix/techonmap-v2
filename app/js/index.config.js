module.exports = {
    baseUrl : '../',
    contentBaseUrl : '../data/content/',
    searchServiceUrl : '../service/organizations',
    messages : 'data/messages.json',
    dataUrl : 'data/data.json',
    dataFieldsUrl : 'data/data.fields.json',
    categoriesUrl : 'data/categories.json',
    zonesUrl : 'data/zones.json',
    mode : 'mobile',
    containers : {
        main : document.querySelector('body')
    },
    map : {
        center : [ 2.33185, 48.86246 ],
        // tilesUrl :
        // 'http://{s}.tiles.mapbox.com/v3/ubimix.in6p41ic/{z}/{x}/{y}.png',
        // tilesUrl : '/tiles/{z}/{x}/{y}.png',
        // tilesUrl : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // tilesUrl : 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
        // tilesUrl : 'http://techonmap.ubimix.com/tiles/{z}/{x}/{y}.png',
        tilesUrl : 'http://{s}.tiles.mapbox.com/v3/ubimix.kgopg33n/{z}/{x}/{y}.png',
        tilesAttribution : '&copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors',
        zoom : 10,
        maxZoom : 16,
        minZoom : 10,
        attribution : '',
        zoomControl : false,
        attributionControl : false
    }
};
