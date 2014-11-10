module.exports = {
    baseUrl : '../',
    searchServiceUrl : '../service/organizations',
    messages : 'data/messages.json',
    containers : {
        main : document.querySelector('body')
    },
    layers : {
        admin : {
            tilesUrl : '../service/tiles/admin/{z}/{x}/{y}/tile.png'
        },
        routes : {
            tilesUrl : '../service/tiles/routes/{z}/{x}/{y}/tile.png'
        }
    },
    map : {
        center : [ 3.0444, 48.8177 ],
        tilesUrl : 'http://{s}.tiles.mapbox.com/v3/ubimix.in6p41ic/{z}/{x}/{y}.png',
        tilesAttribution : '&copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors',
        zoom : 9,
        maxZoom : 18,
        minZoom : 3,
        attribution : '',
        zoomControl : false,
        attributionControl : false
    }
};
