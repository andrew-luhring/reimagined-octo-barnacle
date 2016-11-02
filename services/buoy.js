'use strict';

function Buoy(obj){
	for(var key in obj){ // I'm aware of the complexity here
		if(obj.hasOwnProperty(key)){
			this[key] = obj[key][0];
		}
	}
	this.id = this.guid._;
}

module.exports = Buoy;