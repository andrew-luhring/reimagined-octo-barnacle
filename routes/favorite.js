'use strict';
var express = require('express')
	, router = express.Router()
	, MongoClient = require('mongodb').MongoClient
	, url = 'mongodb://localhost:27017/favorite'
	, bodyParser = require('body-parser')
	, parseUrlencoded = bodyParser.urlencoded({extended: false});


router.route('/')
	.post(parseUrlencoded, function(req, res){
		res.send(req.statusText);
	});

function User(username, password){
	this.username = username;
	this.password = password;
	// Using an object rather than array so I don't have to loop through an array every time i want to perform an operation
	this.favorites = {};
}

User.prototype.addFavorite = function(id){
	this.favorites[id] = true;
};

User.prototype.removeFavorite = function(id){
	if(this.favorites[id]){
		delete this.favorites[id];
	}
};


// Users -> Favorites -> [buoy_ids]

module.exports = router;