'use strict';
var MongoClient = require('mongodb').MongoClient
	, url = 'mongodb://localhost:27017/favorite';

function objExists(obj){ return typeof obj !== 'undefined' && obj !== null && typeof obj === 'object' && !Array.isArray(obj); }

function User(userId, favorites){
	this.token = userId;
	// Using an object rather than array so I don't have to loop through an array every time i want to perform an
	// operation
	this.favorites = objExists(favorites) ? favorites : {};
}

User.prototype.toggleFavorite = function(userToken, buoyId, isFavorited){
	var favoriteObj = {};
	var keyString = 'favorites.' + buoyId;
	favoriteObj[keyString] = isFavorited;
	

	MongoClient.connect(url, function(err, db) {
		var users = db.collection('users');
		users.update(
			{'token' : userToken}
			, {'$set' : favoriteObj}
			, function(err, result){
				console.log(result.result);
			});
		db.close();
	});
};

function getUser(userToken, req, res){
	MongoClient.connect(url, function(err, db) {
		var users = db.collection('users');
		users.find({'token': userToken}).toArray(function(err, result){
			var user;
			if(result[0]){
				user = new User(result[0].token, result[0].favorites);
			}
			res.send(user);
		});
		
		db.close();
	});
}

function addUser(userInstance){
	MongoClient.connect(url, function(err, db) {
		var users = db.collection('users');
		users.insert({'token': userInstance.token, favorites: userInstance.favorites});
		db.close();
	});
}

module.exports.User = User;
module.exports.addUser = addUser;
module.exports.getUser = getUser;