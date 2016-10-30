
(function(){
	'use strict';

	function clone(obj){
		/*jshint validthis: true */
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				this[key] = obj[key];
			}
		}
	}

	function stripHtml(html){
		var elm = document.createElement('span');
		elm.innerHTML = html;
		return elm.textContent;
	}

	function Buoy(obj){
		clone.call(this, obj);
		this.description = stripHtml(obj.description);
	}

	function createTemplate(buoy){
		var templ = document.getElementById('buoytmpl');

		function setTextContent(selector, text){
			templ.content.querySelector(selector).textContent = text;
		}

		function setBuoyDataId(id){
			templ.content.querySelector('.favorite-buoy').dataset.id = id;
		}

		setTextContent('.buoy-name', buoy.title);
		setTextContent('.buoy-description', buoy.description);
		setBuoyDataId(buoy.id);

		return document.importNode(templ.content, true);
	}

	function populateBuoysList(data){
		var current;
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < data.length; i++) {
			current = new Buoy(data[i]);
			fragment.appendChild(createTemplate(current));
		}
		document.getElementById('main').appendChild(fragment);
	}

	function registerFavoriteBuoys(){

		$('.favorite-buoy').click(function(){
			var id = $(this).data('id');
			
			$.post('/favorite', {user: 'token', buoy: id});
		});

	}
	
	$(document).ready(function(){
		$.get('/feed', {}, function(data){
			populateBuoysList(data);
			registerFavoriteBuoys();
		}, 'json');
	});

})();