/* globals $: true, roo: true */
(function(){
	'use strict';
	window.roo = window.roo || {};
	
	roo.clone = function clone(obj){
		/*jshint validthis: true */
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				this[key] = obj[key];
			}
		}
	};
	
	function validateUser(){
		var userToken = localStorage.getItem('userToken');
		var userRequest;
		if(!userToken){
			userRequest = $.get('/user', {}, function(data){
				localStorage.setItem('userToken', data.token);
			});
		} else {
			userRequest = $.post('/user', {token: userToken});
		}
		return userRequest;
	}
	
	$(document).ready(function(){
		var userRequest = validateUser();
		userRequest.done(function(user){
			$.get('/feed', {}, function(data){
				
				for(var i = 0; i < data.length; i++){
						var current = data[i];
						if(user.favorites[current.id] === true || user.favorites[current.id] === 'true'){
							current.favorited = true;
						}
				}
				roo.templateMaker.populateBuoysList(data, 'allBuoys');
				roo.templateMaker.registerFavoriteBuoyListeners();
				roo.model.updateFavoriteBuoys();
				$('#allBuoys .buoy-description').addClass('hide');
			}, 'json');
		})
	});

})();