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
	
	$(document).ready(function(){
		$.get('/feed', {}, function(data){
			roo.templateMaker.populateBuoysList(data, 'allBuoys');
			roo.templateMaker.registerFavoriteBuoyListeners();
			$('#allBuoys .buoy-description').addClass('hide');
		}, 'json');
	});

})();