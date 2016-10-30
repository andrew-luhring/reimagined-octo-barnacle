(function() {
  'use strict';
  var express = require('express')
	, appPort = 5000
	, Server = require('./server')
	, serveStatic = require('serve-static')
	, session = require('express-session')
	, app = express()
	, bodyParser = require('body-parser')
	, publicD = __dirname + '/public/'
	, feed = require('./routes/feed.js')
	, favorite = require('./routes/favorite.js');
	
	app.use('/', serveStatic(publicD))
		.use('/feed', feed)
		.use('/favorite', favorite)
		.set('port', (process.env.PORT || appPort))
		.set('cache', false)
		.label = 'app';

	
	new Server (app);
  
})();



