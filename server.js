var _ = require('underscore');
var Mosaic = require('mosaic-commons');
require('mosaic-teleport');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ServiceStubProvider = require('mosaic-teleport-server').ServiceStubProvider;

var defaultPort = 3701;
var serviceOptions = _.extend({
    port : defaultPort
}, ServiceStubProvider.toOptions(process.argv), {
    path : '/api',
    dir : __dirname + '/service/api',
});
var port = (+serviceOptions.port) || defaultPort;

/* ------------------------------------------------------- */
// Creates and initializes an Express application
var app = express();
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(bodyParser.json());
app.use(cookieParser());

/* ------------------------------------------------------- */
app.get('/api/auth/user', function(req, res) {
    function readUser(str, defaultValue) {
        var user = defaultValue;
        try {
            user = JSON.parse(str);
        } catch (err) {
        }
        return user;
    }
    var key = 'user';
    var user;
    if (key in req.query) {
        user = readUser(req.query[key]);
        if (user) {
            res.cookie(key, JSON.stringify(user), {
                maxAge : 900000,
            // secure : true
            });
        } else {
            res.clearCookie(key);
        }
    } else {
        var cookies = req.cookies || {};
        user = readUser(cookies[key]);
    }
    user = user || {};
    res.json(user);
});

/* ------------------------------------------------------- */
var handlerProvider = new ServiceStubProvider(serviceOptions);
handlerProvider.registerInExpressApp(app);

/* ------------------------------------------------------- */
app.use('/data', express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/app'));

// Start the server
app.listen(port);
console.log('http://localhost' + (port ? ':' + port : '') + '/');
