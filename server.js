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
var handlerProvider = new ServiceStubProvider(serviceOptions);
handlerProvider.registerInExpressApp(app);

/* ------------------------------------------------------- */
app.use('/data', express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/app'));

// Start the server
app.listen(port);
console.log('http://localhost' + (port ? ':' + port : '') + '/');
