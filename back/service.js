var _ = require('underscore');
var Mosaic = require('mosaic-commons');

module.exports = {
    formatJson : rest('/format/json', 'GET', function(params) {
        return 'JSON: ' + JSON.stringify(params.data);
    }),
    formatCsv : rest('/format/csv', 'GET', function(params) {
        return 'CSV: ' + params.data;
    })
};

/**
 * This utility function "annotates" the specified object methods by the
 * corresponding REST paths and HTTP methods.
 */
function rest(path, http, method) {
    method.http = http.toLowerCase();
    method.path = path;
    return method;
}

function toCsv(collection) {
    function escape(str) {
        return JSON.stringify(str);
        // str = str ? '' + str : '';
        // str = str.replace(/[\r\n\t]+/gi, ' ');
        // str = str.replace(/["]/gi, "'");
        // if (str.indexOf(',') > 0) {
        // str = '"' + JSON.stringify(str) + '"';
        // }
        // return str;
    }
    function serializeArray(array, delimiter) {
        delimiter = delimiter || ',';
        return array.join(delimiter);
    }
    function formatCSV(resource) {
        var array = [];
        var properties = resource.properties || {};
        var coordinates = resource.geometry && resource.geometry.coordinates
                || [];

        array.push(properties.id);
        array.push(properties.name);
        array.push(properties.description);
        var tags = properties.tags || [];
        array.push(tags[0]);
        array.push(tags[1]);
        array.push(tags[2]);
        array.push(coordinates[1]);
        array.push(coordinates[0]);
        array.push(properties.address);
        array.push(properties.postcode);
        array.push(properties.city);
        array.push(properties.creationyear);
        array.push(properties.url);
        array.push(properties.email);
        array.push(properties.twitter);
        array.push(properties.facebook);
        array.push(properties.googleplus);
        array.push(properties.linkedin);
        array.push(properties.viadeo);
        array.push(properties.category);
        array.push(resource.buildPermalink());
        for (var i = 0; i < array.length; i++) {
            array[i] = escape(array[i]);
        }
        var str = serializeArray(array);
        return str;
    }
    var lines = [];

    var headers = _.keys(Utils.fieldMapping);
    headers.push('Permalien');

    lines.push(serializeArray(headers));

    for (var i = 0; i < collection.models.length; i++) {
        var line = formatCSV(collection.models[i]);
        lines.push(line);
    }
    var str = serializeArray(lines, '\n');
    return str;
}
