var OsmGeolocation = require('./OsmGeolocation');
var Mosaic = require('mosaic-commons');
var _ = require('underscore');

var client = new OsmGeolocation({
    _remoteCall : function(url) {
        var HTTP = require('http');
        var URL = require('url');
        var options = URL.parse(url);
        options.method = 'GET';
        var deferred = Mosaic.P.defer();
        var req = HTTP.request(options, function(res) {
            if (Math.round(res.statusCode / 100) != 2) {
                deferred.reject(new Error('Status: ' + res.statusCode));
                return;
            }
            var data = '';
            res.on('data', function(chunk) {
                data += chunk
            });
            res.on('end', function() {
                var obj = JSON.parse(data);
                deferred.resolve(obj);
            });
        });
        req.on('error', function(e) {
            deferred.reject(e);
        });
        req.end();

        return deferred.promise;
    },

});

client.geolocalize({
    street : '32 avenue Gambetta',
    city:'Chatou',
    postcode: '78400',
    country: 'France'
}).then(function(result) {
    console.log('Result: ', result);
}, function(err) {
    console.log('Error! ', err);
});
