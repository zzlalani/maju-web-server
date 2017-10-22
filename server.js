/**
 *
 * Developer: Zeeshan Lalani
 *
 */

// Get the configurations
var config = require( __dirname + '/config' );

// Our logger for logging to file and console
var logger = require( __dirname + '/logger' );

// Instance for express server
var express = require( 'express' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var session = require( 'express-session' );
var compression = require('compression')

var app = module.exports = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'majumad-damujam',
  resave: true,
  saveUninitialized: true
}));

// parse application/json
app.use(bodyParser.json());

// We want to gzip all our content before sending.
app.use( compression() );

// Support for cross domain.
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Configure all servers for this application
var werServiceProvider = require( __dirname + '/providers/WebService' );
werServiceProvider.setup( app );

// Start the http server
var httpServer;

var server_port = config.http.port
var server_ip_address = '127.0.0.1'

var http = require('http');
httpServer = http.createServer(app);
// Make the server listen
httpServer.listen( server_port, server_ip_address, function () {
  logger.info( "Listening on " + server_ip_address + ", Port " + server_port );
});
