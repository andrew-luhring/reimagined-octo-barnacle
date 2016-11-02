'use strict';
var express = require('express')
	, router = express.Router()
	, MongoClient = require('mongodb').MongoClient
	, url = 'mongodb://localhost:27017/favorite'
	, bodyParser = require('body-parser')
	, parseUrlencoded = bodyParser.urlencoded({extended: false});


router.route('/').post(parseUrlencoded, function(req, res){
	var user = req.body;
	var keyString = 'favorites.' + user.buoy;
	var favoriteObj = {};
	favoriteObj[keyString] = user.favorited;
	
	MongoClient.connect(url, function(err, db) {
		var users = db.collection('users');
		users.update(
				{'token' : user.user}
			, {'$set' : favoriteObj
			}, function(err, result){
				console.log(result.result);
			});
		db.close();
	});
	res.sendStatus(200);
});

module.exports = router;