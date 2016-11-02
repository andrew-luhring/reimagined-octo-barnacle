/* globals $: true, roo: true */
(function(){
	'use strict';
	window.roo = window.roo || {};
	
	function TemplateMaker(){}
	
	TemplateMaker.prototype.createTemplate = function(buoy){
		var templ = document.getElementById('buoytmpl');

		function setTextContent(selector, text){
			templ.content.querySelector(selector).textContent = text;
		}

		function setBuoyData(buoy){
			var buoyButton = templ.content.querySelector('.favorite-buoy');
			buoyButton.dataset.id = buoy.id;
			buoyButton.dataset.favorited = buoy.favorited;
			if(buoy.favorited === true){
				buoyButton.classList.add('favorited');
			} else {
				buoyButton.classList.remove('favorited');
			}
		}

		setTextContent('.buoy-name', buoy.title);
		setTextContent('.buoy-description', buoy.description);
		setBuoyData(buoy);
		return document.importNode(templ.content, true);
	};
	
	TemplateMaker.prototype.registerFavoriteBuoyListeners = function(){
		$('.favorite-buoy').click(function(){
			var $this = $(this);
			var id = $this.data('id');
			$this.toggleClass('favorited');
			roo.model[id].toggleFavorite();
		});
	};
	
	function createFragment(){
		function createBuoyListWrapper(){
			var div = document.createElement('div');
			div.className = 'buoy-list';
			return div;
		}
		var fragment = document.createDocumentFragment(); 
		fragment.appendChild(createBuoyListWrapper());
		return fragment;
	}

	TemplateMaker.prototype.populateBuoysList = function(data, publishTo){
		var publishArea = document.getElementById(publishTo);
		var fragment = createFragment();
		var fragmentBuoyList = fragment.querySelector('.buoy-list');  
		var current;
		
		for (var i = 0; i < data.length; i++) {
			current = data[i];
			if(current instanceof roo.Buoy !== true){
				current = new roo.Buoy(current);
			}
			roo.model.addBuoy(current);
			fragmentBuoyList.appendChild(this.createTemplate(current));
		}
		
		if(publishArea.querySelector('.buoy-list')){
			publishArea.querySelector('.buoy-list').remove();
		}
		publishArea.appendChild(fragment);
	};
	
	var templateMaker = new TemplateMaker();
	
	roo.templateMaker = templateMaker;
})();