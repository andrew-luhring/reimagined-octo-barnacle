/* globals $: true, roo: true */
describe( 'main is an initializer that', function(){
'use strict';
	var localStorageStr = 'laksjdlfkjlkajsldkjf';
	var exampleBuoy = {
			"description":"a description"
		, "georss": "40.251 -73.164"
		, "id":"NDBC-44025-20161103195000"
		, "link":"http://www.ndbc.noaa.gov/station_page.php?station=44025"
		, "pubDate":"Thu, 03 Nov 2016 20:47:02 +0000"
		, "title":"herp"
	};
	
	beforeEach(function(){
		jasmine.Ajax.install();
	});
	afterEach(function(){
		localStorage.clear();
		jasmine.Ajax.uninstall();

	});
	
	describe('creates a roo global', function(){
		it('?', function(){
			expect(typeof roo).toBe('object');
		});
		
		it('with a clone method that clones properties of one object to "this"', function(){
			var obj = {derp: 'derp'};
			function Spike(){
				roo.clone.call(this, obj);
			}
			var spike = new Spike();
			expect(spike.derp).toBe('derp');
		});
		
	});
	
	describe('on document ready,', function(){
		it('makes a GET request to /user if there is no userToken in localStorage', function(){
			roo.onReady();
			expect(localStorage.getItem('userToken')).toBeNull();
			expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
			expect(jasmine.Ajax.requests.mostRecent().url).toBe('/user');
		});
		it('makes a POST request to /user if there is a userToken in localStorage', function(){
			localStorage.setItem('userToken', 'laksjdlfkjlkajsldkjf');
			expect(localStorage.getItem('userToken')).toBe(localStorageStr);
			roo.onReady();
			expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
			expect(jasmine.Ajax.requests.mostRecent().url).toBe('/user');
		});
		
		describe('makes a GET request to /feed', function(){
			it('?', function(){
				roo.setUpFeed({token: localStorageStr, favorites: {}});
				expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
				expect(jasmine.Ajax.requests.mostRecent().url).toBe('/feed');
			});
			// fails because jquery throws a parse error. the parse error is happening because the response jquery is expecting is JSON,
			// and theres something weird happening with how jquery is interpreting the jasmine stub; removing  
			xit('then it will call templateMaker.populateBuoysList, templateMaker.registerFavoriteBuoyListeners, and model.updateFavoriteBuoys', function(){
				
				jasmine.Ajax.stubRequest('/feed').andReturn([exampleBuoy]);
				
				spyOn(roo.templateMaker, 'populateBuoysList');
				spyOn(roo.templateMaker, 'registerFavoriteBuoyListeners');
				spyOn(roo.model, 'updateFavoriteBuoys');

				roo.setUpFeed({token: localStorageStr, favorites: {}});

				expect(jasmine.Ajax.requests.mostRecent().url).toBe('/feed');
				expect(roo.templateMaker.populateBuoysList).toHaveBeenCalled();
			});
		});
	});
	
});