/* globals $: true, roo: true */
describe( 'Buoy is a constructor that', function(){
	'use strict';
	it('clones the object passed as its first parameter', function(){
		spyOn(roo, 'clone');
		var buoy = new roo.Buoy({});
		expect(roo.clone).toHaveBeenCalled();
	});
	it('strips html tags from the description property', function(){
		var text = "Shoes are like pieces of floor that you take with you.";
		var mockObj = {description: "<strong>" + text + "</strong>"};
		var buoy = new roo.Buoy(mockObj);
		expect(buoy.description).toBe(text);
	});
	it('has a favorited property that can be passed as an argument if there is not a favorited property already on the object passed as its first parameter; defaults to false', function(){
		var buoy = new roo.Buoy({}, true);
		expect(buoy.favorited).toBe(true);
		buoy = new roo.Buoy({favorited: true}, false);
		expect(buoy.favorited).toBe(true);
		buoy = new roo.Buoy({});
		expect(buoy.favorited).toBe(false);
	});
	
	describe('has a method toggleFavorite', function(){
		beforeEach(function(){
			spyOn(roo.model, 'updateFavoriteBuoys');
			jasmine.Ajax.install();
		});
		afterEach(function(){
			jasmine.Ajax.uninstall();
		});
		
		it('?', function(){
			expect(typeof roo.Buoy.prototype.toggleFavorite).toBe('function');
		});
		it('toggles its favorited value unless one is passed as an argument', function(){
			var buoy = new roo.Buoy({});
			expect(buoy.favorited).toBe(false);
			buoy.toggleFavorite();
			expect(buoy.favorited).toBe(true);
			buoy.toggleFavorite(true);
			expect(buoy.favorited).toBe(true);
		});
		it('makes a post request to /favorite with userToken, the buoyId, and the new favorited value', function(){
			var buoy = new roo.Buoy({id: '1234'});
			var userId = 'laksjdlfkjlkajsldkjf';
			var paramsString = 'user=' + userId + '&buoy=' + buoy.id + '&favorited=';
			localStorage.clear();
			localStorage.setItem('userToken', 'laksjdlfkjlkajsldkjf');
			
			expect(buoy.favorited).toBe(false);
			buoy.toggleFavorite();
			expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
			expect(jasmine.Ajax.requests.mostRecent().url).toBe('/favorite');
			expect(jasmine.Ajax.requests.mostRecent().params).toBe(paramsString + 'true');
			buoy.toggleFavorite();
			expect(jasmine.Ajax.requests.mostRecent().params).toBe(paramsString + 'false');
		});
		it('that calls updateFavoriteBuoys', function(){
			var buoy = new roo.Buoy({});
			buoy.toggleFavorite();
			expect(roo.model.updateFavoriteBuoys).toHaveBeenCalled();
		});
	});
});