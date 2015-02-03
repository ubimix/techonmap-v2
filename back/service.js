var _ = require('underscore');
var Mosaic = require('mosaic-commons');
var CsvFormatter = require('../app/js/tools/CsvFormatter');

module.exports = {
    format : rest('/format', 'POST', serialize),
};

function serialize(params) {
    var data = params.data || '[]';
    var format = params.format || 'csv';
    data = JSON.parse(data);
    var result;
    if (format === 'csv') {
        result = toCsv(data);
    } else {
        result = JSON.stringify(data);
    }
    return result;
}

/**
 * This utility function "annotates" the specified object methods by the
 * corresponding REST paths and HTTP methods.
 */
function rest(path, http, method) {
    method.http = http.toLowerCase();
    method.path = path;
    return method;
}

var formatter = new CsvFormatter();
formatter.addField('Identifiant', 'properties.id');
formatter.addField('Nom', 'properties.name');
formatter.addField('Description', 'properties.description');
formatter.addField('Tag 1', 'properties.tags.0');
formatter.addField('Tag 2', 'properties.tags.1');
formatter.addField('Tag 3', 'properties.tags.2');
formatter.addField('Latitude', 'geometry.coordinates.1');
formatter.addField('Longitude', 'geometry.coordinates.0');
formatter.addField('N° et nom de rue', 'properties.address');
formatter.addField('CP', 'properties.postcode');
formatter.addField('Ville', 'properties.city');
formatter.addField('Année de création', 'properties.creationyear');
formatter.addField('Url site web', 'properties.url');
formatter.addField('Email', 'properties.email');
formatter.addField('Nom compte Twitter', 'properties.twitter');
formatter.addField('Url page Facebook', 'properties.facebook');
formatter.addField('Url page Google +', 'properties.googleplus');
formatter.addField('Url page Linkedin', 'properties.linkedin');
formatter.addField('Url page Viadeo', 'properties.viadeo');
formatter.addField('Catégorie', 'properties.category');
formatter.addField('Permalien', function(obj) {
    var id = obj.properties.id;
    if (!id)
        return '';
    return 'http://techonmap.fr/#' + encodeURIComponent(id);
});

function toCsv(collection) {
    return formatter.toCsv({
        objects : collection
    });
}
