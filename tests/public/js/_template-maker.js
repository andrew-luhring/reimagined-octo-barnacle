/* globals $: true, roo: true */
describe( 'TemplateMaker is an instance that', function(){
	'use strict';
	var mockBuoy = {
			id: '666'
		, favorited: true
		, title: "There are several reasons dolphins don\'t speak English."
		, description: "and also the cubs just won the world series, so there\'s an ice rink now in h*ck."
	};
	function createBuoyTmpl(){
		var tmpl = document.createElement('template');
			tmpl.id = 'buoytmpl';
			tmpl.innerHTML = ''+
					'<article>' +
						'<header class="buoy-header">'+
							'<button data-id class="favorite-buoy star icon icon-star"></button>'+
							'<h1 class="h4 buoy-name"></h1>'+
						'</header>'+
						'<pre class="buoy-description"></pre>'+
					'</article>';
			document.body.appendChild(tmpl);
	}
	
	beforeEach(function(){
		createBuoyTmpl();
	});
	
	afterEach(function(){
		$('#buoytmpl').remove();
	});

	describe('has a createTemplate method', function(){
		it('?', function(){
			expect(typeof roo.templateMaker.createTemplate).toBe('function');
		});
		it('accepts a buoy as an argument and populates the template with the buoys values and returns it as a node', function(){
			var node = roo.templateMaker.createTemplate(mockBuoy)
			, btn = node.querySelector('.favorite-buoy')
			, buoyName = node.querySelector('.buoy-name')
			, buoyDesc = node.querySelector('.buoy-description');
			
			expect(btn.dataset.id).toBe(mockBuoy.id);
			expect(btn.dataset.favorited).toBe(mockBuoy.favorited.toString());
			expect($(btn).hasClass('favorited')).toBe(true);
			expect(buoyName.textContent).toBe(mockBuoy.title);
			expect(buoyDesc.textContent).toBe(mockBuoy.description);
		});
		it('will remove a class of favorited from a buoy if it is not favorited', function(){
			var _mockBuoy = mockBuoy;
			var node, btn;
			mockBuoy.favorited = false;
			node = roo.templateMaker.createTemplate(mockBuoy)
			btn = node.querySelector('.favorite-buoy');
			expect($(btn).hasClass('favorited')).toBe(false);
		});
	});
	
	describe('has a registerFavoriteBuoyListeners method', function(){
		beforeEach(function(){
			var button = document.createElement('button');
			button.dataset.id = '4321';
			button.classList.add('favorite-buoy');
			button.classList.add('favorited');
			roo.model[4321] = new roo.Buoy({id: 4321});
			document.body.appendChild(button);
		});
		afterEach(function(){
			delete roo.model[4321];
			$('.favorite-buoy').remove();
		});
		it('that registers a click event listener on .favorite-buoys', function(){
			spyOn(roo.model[4321], 'toggleFavorite');
			$('.favorite-buoy').click();
			expect($('.favorite-buoy').hasClass('favorited')).toBe(true);
			expect(roo.model[4321].toggleFavorite).not.toHaveBeenCalled();
			roo.templateMaker.registerFavoriteBuoyListeners();
			$('.favorite-buoy').click();
			expect(roo.model[4321].toggleFavorite).toHaveBeenCalled();
			expect($('.favorite-buoy').hasClass('favorited')).toBe(false);
		});
	});
	
	describe('has a populateBuoysList method that', function(){
		var testAreaId = 'testArea';
		var mockList = [mockBuoy];
		function clearModel(){
			for(var i in roo.model){
				if(roo.model.hasOwnProperty(i)){
					delete roo.model[i];
				}
			}
		}
		
		function createTestBuoyListHtml(){
			var testArea = document.createElement('div');
			testArea.id = testAreaId;
			document.body.appendChild(testArea);
		}
		
		beforeEach(function(){
			createTestBuoyListHtml();
			clearModel();
		});
		afterEach(function(){
			$('#' + testAreaId).remove();
		});
		
		it('takes an array of buoys and publishes them to publishArea . buoy-list', function(){
			expect($('.buoy-name').length).toBe(0);
			expect($('.buoy-description').length).toBe(0);
			expect($('.buoy-list').length).toBe(0);
			roo.templateMaker.populateBuoysList(mockList, testAreaId);
			expect($('.buoy-list').length).toBe(1);
			expect($('.buoy-name').length).toBe(1);
			expect($('.buoy-description').length).toBe(1);
		});
		it('will turn nonBuoy objects into Buoy instances if necessary', function(){
			spyOn(roo, 'Buoy');
			expect(roo.Buoy).not.toHaveBeenCalled();
			roo.templateMaker.populateBuoysList(mockList, testAreaId);
			expect(roo.Buoy).toHaveBeenCalled();
		});
		it('will not add duplicate the buoy-list html element', function(){
			var oldList = document.createElement('div');
			var testArea = document.getElementById(testAreaId);
			oldList.id = 'oldList';
			oldList.classList.add('buoy-list');
			testArea.appendChild(oldList);
			expect($('.buoy-list').length).toBe(1);
			expect($('#oldList').length).toBe(1);

			roo.templateMaker.populateBuoysList(mockList, testAreaId);
			
			expect($('#oldList').length).toBe(0);
			expect($('.buoy-list').length).toBe(1);
			
		});
	});
});
