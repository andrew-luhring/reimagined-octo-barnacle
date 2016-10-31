/* globals $: true, roo: true */
(function(){
	'use strict';
	window.roo = window.roo || {};

	function stripHtml(html){
		var elm = document.createElement('span');
		elm.innerHTML = html;
		return elm.textContent;
	}

	function Buoy(obj, favorited){
		roo.clone.call(this, obj);
		this.description = stripHtml(obj.description);
		this.favorited = (typeof favorited === 'boolean') ?  favorited : false;
	}

	Buoy.prototype.toggleFavorite = function(val){
		this.favorited = (typeof val === 'boolean') ? val : !this.favorited;
		$.post('/favorite', {user: 'token', buoy: this.id });
		roo.model.updateFavoriteBuoys();
		$('#favoriteBuoys .favorite-buoy').addClass('hide');
	};
	
	roo.Buoy = Buoy;
})();