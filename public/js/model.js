/* globals $: true, roo: true */
(function(){
	'use strict';
	window.roo = window.roo || {};
	
	function Model(){}
	
	Model.prototype.addBuoy = function(buoy){
		if(buoy instanceof roo.Buoy){
			this[buoy.id] = buoy;
		} else {
			throw new TypeError('tried to add a non-buoy instance to the model', buoy);
		}
	};

	Model.prototype.removeBuoy = function(id){
		if(this[id]){
			delete this[id];
		} else {
			throw new Error('No buoy with id ' + id + ' exists on model.');
		}
	};
	
	var model = new Model();
	
	roo.model = model;
	
})();