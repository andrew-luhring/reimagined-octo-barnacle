'use strict';
var express = require('express')
	, router = express.Router()
	, jwt = require('jsonwebtoken')
	, bodyParser = require('body-parser')
	, parseUrlencoded = bodyParser.urlencoded({extended: false})
	, UserService = require('./../services/users.js')
	, User = UserService.User
	, getUser = UserService.getUser
	, addUser = UserService.addUser;


router.route('/').get(function(req, res){
	var token = jwt.sign({}, 'shhhhh');
	var user = new User(token);
	addUser(user);
	res.send(user);
}).post(parseUrlencoded, function(req, res){
	var token = req.body.token;
	getUser(token, req, res);
});

module.exports = router;

