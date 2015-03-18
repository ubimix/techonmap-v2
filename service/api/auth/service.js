var _ = require('underscore');
var Mosaic = require('mosaic-commons');

module.exports = {
    google : rest('/google', 'GET', function(params) {
        console.log(params);
        return 'Google';
    }),

    linkedin : rest('/linkedin', 'GET', function(params) {
        return 'LinkedIn';
    }),

    twitter : rest('/twitter', 'GET', function(params) {
        return 'Titter';
    }),

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
