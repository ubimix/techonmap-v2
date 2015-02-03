var _ = require('underscore');
var Mosaic = require('mosaic-commons');

module.exports = {
    sendMail : rest('/send', 'POST', function(params) {
        var message = {
            user : {
                name : params.name,
                email : params.email
            },
            title : params.reason,
            content : params.content
        };
        console.log('>>>', message);
        return message;
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
