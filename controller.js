(function() {
  'use strict';
  var express = require('express')
    , appPort = 5000
    , Server = require('./server')
    , serveStatic = require('serve-static')
    , session = require('express-session')
    , app = express()
    , fs = require('fs')
    , bodyParser = require('body-parser')
    , publicD = __dirname + '/public/'
    , createFeed = require('./feed');
  
  app.use('/', serveStatic(publicD))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .set('port', (process.env.PORT || appPort))
    .set('cache', false)
    .label = 'app';
  
  app.get('/info', function(req, res){
    createFeed(req, res);
  });
  
  new Server (app);
})();
