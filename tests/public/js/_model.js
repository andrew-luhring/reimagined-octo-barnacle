/* globals $: true, roo: true */
describe( 'Model is an instance that', function(){
	'use strict';
	it('exists', function(){
		expect(typeof roo.model === 'object' && roo.model !== null).toBe(true);
	});
	describe('has an addBuoy method', function(){
		it('?', function (){
			expect(typeof roo.model.addBuoy ).toBe('function');
		});
		it('that will add a buoy instance to its own list of enumerable properties if it is a buoy instance', function(){
			var buoy = new roo.Buoy({id: '123443'});
			expect(roo.model[buoy.id]).toBeUndefined();
			roo.model.addBuoy(buoy);
			expect(typeof roo.model[buoy.id]).toBe('object');
		});
		it('will throw a TypeError if the object passed to it is not an instance of roo.Buoy', function(){
			expect(function(){
				roo.model.addBuoy({});
			}).toThrow();
		});
	});
	describe('has a removeBuoy method', function(){
		it('?', function(){
			expect(typeof roo.model.removeBuoy).toBe('function');
		});
		it('that will remove a buoy with the id thats passed as an argument from itself', function(){
			roo.model[1234] = {derp: 'herp'};
			expect(typeof roo.model[1234]).toBe('object');
			expect(roo.model[1234].derp).toBe('herp');
			roo.model.removeBuoy(1234);
			expect(roo.model[1234]).toBeUndefined();
		});
		it('will throw an error if the id doesnt exist on the model', function(){
			expect(function(){
				roo.model.removeBuoy(1234);
			}).toThrow();
		});
	});
	describe('has an updateFavoriteBuoys method', function(){
		
		beforeEach(function(){
			function setUpBody(){
				var fbs = document.createElement('div');
				var fb = document.createElement('div');

				fbs.id = 'favoriteBuoys';
				fb.classList.add('favorite-buoy');
				fbs.appendChild(fb);
				document.body.appendChild(fbs);
			}
			setUpBody();
		});
		afterEach(function(){
			$('#favoriteBuoys').remove();
		});
		
		it('calls templateMaker.populateBuoysList with a list of buoys that have a favorited attribute of true', function(){
			spyOn(roo.templateMaker, 'populateBuoysList');
			roo.model.thing = {favorited: true};
			roo.model.otherThing = {favorited: false};
			roo.model.updateFavoriteBuoys();
			expect(roo.templateMaker.populateBuoysList).toHaveBeenCalledWith([roo.model.thing], 'favoriteBuoys');
		});
		it('adds a hide class to .favorite-buoys within #favoriteBuoys', function(){
			spyOn(roo.templateMaker, 'populateBuoysList');
			roo.model.updateFavoriteBuoys();
			expect($('#favoriteBuoys .favorite-buoy').hasClass('hide')).toBe(true);
		});
	});
});