var URL = require('url');
var currentUrl = URL.parse(window.location.href, true);
module.exports = {
    baseUrl : './',
    contentBaseUrl : './data/content/',
    contentSaveUrl : './xwiki/bin/view/mobo/Saver?id=',
    //contactApiUrl : './xwiki/bin/view/mobo/Mailer',
    contactApiUrl : './',
    //dataUrl : './xwiki/bin/view/mobo/Api',
    dataUrl : './data/data.json',
    //userInfoApiUrl : './xwiki/bin/view/mobo/User',
    userInfoApiUrl : './data/user.json',
    logoutApiUrl : './xwiki/bin/logout/XWiki/XWikiLogout?xredirect=%2Fxwiki%2Fbin%2Fview%2Fmobo%2FUser',
    searchServiceUrl : './service/organizations',
    //dataUrl : './xwiki/bin/view/mobo/Api',
    dataUrl : './data/data.json',
    exportFields : 'data/export.fields.json',
    messages : './data/messages.json',
    dataFieldsUrl : './data/data.fields.json',
    categoriesUrl : './data/categories.json',
    zonesUrl : './data/africa.geo.json',
    mode : currentUrl.query.mode,
    siteUrl : currentUrl.protocol + '//' + currentUrl.host
            + currentUrl.pathname,
    header : toBoolean(currentUrl.query.header, true),
    containers : {
        main : document.querySelector('body')
    },
    map : {
        // Paris:
        // NE 49.04694, 2.63791
        // SW 48.658291, 2.08679
        bbox : [ [-10, -10], [10, 20] ],
        center : [ 2.33185, 6.86246 ],
        // tilesUrl :
        // 'http://{s}.tiles.mapbox.com/v3/ubimix.in6p41ic/{z}/{x}/{y}.png',
        // tilesUrl : '/tiles/{z}/{x}/{y}.png',
        // tilesUrl : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // tilesUrl : 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
        // tilesUrl : 'http://techonmap.ubimix.com/tiles/{z}/{x}/{y}.png',
        tilesUrl : 'http://{s}.tiles.mapbox.com/v3/ubimix.kgopg33n/{z}/{x}/{y}.png',
        tilesAttribution : {
            prefix : false,
            position : 'bottomleft',
            text : 'Données cartographiques &copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>',
        },
        zoom : 4,
        maxZoom : 16,
        minZoom : 3,
        attribution : '',
        zoomControl : false,
        attributionControl : false
    }
};

function toBoolean(str, def) {
    if (!str || str === undefined)
        return def;
    str += '';
    str = str.toLowerCase();
    return (str == 'true' || str == 'ok' || str == 'yes' || str == '1');
}
