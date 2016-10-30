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
	
	function createTemplate(buoy){
		var templ = document.getElementById('buoytmpl');

		function setTextContent(selector, text){
			templ.content.querySelector(selector).textContent = text;
		}

		function setBuoyData(buoy){
			var buoyButton = templ.content.querySelector('.favorite-buoy');
			buoyButton.dataset.id = buoy.id;
			buoyButton.dataset.favorited = buoy.favorited;
		}
		
		setTextContent('.buoy-name', buoy.title);
		setTextContent('.buoy-description', buoy.description);
		setBuoyData(buoy);
		
		return document.importNode(templ.content, true);
	}
	
	function populateBuoysList(data){
		var current;
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < data.length; i++) {
			current = new roo.Buoy(data[i]);
			roo.model.addBuoy(current);
			fragment.appendChild(createTemplate(current));
		}
		document.getElementById('buoylist').appendChild(fragment);
	}

	function registerFavoriteBuoys(){

		$('.favorite-buoy').click(function(){
			var $this = $(this);
			var id = $this.data('id');
			$this.toggleClass('favorited');
			roo.model[id].toggleFavorte();
		});

	}
	
	$(document).ready(function(){
		$.get('/feed', {}, function(data){
			populateBuoysList(data);
			registerFavoriteBuoys();
		}, 'json');
	});

})();