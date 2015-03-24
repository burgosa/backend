var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models/index');

  //Load the configs
  app.configs = require('./config/passport');

  // Load the routes.
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  app.use(passport.initialize());

  console.log('Listening on port 3001...');
  app.listen(3001);
});