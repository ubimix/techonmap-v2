module.exports = {
    baseUrl : '../',
    contentBaseUrl : '../data/content/',
    searchServiceUrl : '../service/organizations',
    messages : 'data/messages.json',
    dataUrl : 'data/data.json',
    dataFieldsUrl : 'data/data.fields.json',
    categoriesUrl : 'data/categories.json',
    containers : {
        main : document.querySelector('body')
    },
    map : {
        center : [ 3.0444, 48.8177 ],
        // tilesUrl :
        // 'http://{s}.tiles.mapbox.com/v3/ubimix.in6p41ic/{z}/{x}/{y}.png',
        tilesUrl : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        tilesAttribution : '&copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors',
        zoom : 9,
        maxZoom : 18,
        minZoom : 3,
        attribution : '',
        zoomControl : false,
        attributionControl : false
    }
};
