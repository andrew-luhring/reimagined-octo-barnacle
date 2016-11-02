'use strict';
var express = require('express')
, router = express.Router()
, http = require('http')
, parseString = require('xml2js').parseString
, Buoy = require('./../services/buoy.js');

var feedOptions = {
	host: 'www.ndbc.noaa.gov'
, port: 80
, path: '/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100'
, method: 'GET'
};


function transformBuoysIntoNormalLookingObjects(listOfBuoys){
	var arr = [];
	for (var i = 0; i < listOfBuoys.length; i++) {
		arr.push(new Buoy(listOfBuoys[i]));
	}
	return arr;
}


function createFeed(req, res){
	http.request(feedOptions, function(dataResp){
		var xmlDataString = '';
		dataResp.setEncoding('utf8');
		res.writeHead(dataResp.statusCode);

		dataResp
			.on('data', function(data){
				xmlDataString += data;
			})
			.on('close', function(){
				res.end();
			})
			.on('end', function(){
				parseString(xmlDataString, function(err, result){
					var listOfBuoys = result.rss.channel[0].item;
					listOfBuoys = transformBuoysIntoNormalLookingObjects(listOfBuoys);
					res.write(JSON.stringify(listOfBuoys));
				});
				res.end();
			});
	})
	.on('error', function(e){
		console.warn(e.message);
		res.writeHead(500);
		res.end();
	})
	.end();
}

router.route('/')
	.get( function(req, res){
		createFeed(req, res);
	});

module.exports = router;