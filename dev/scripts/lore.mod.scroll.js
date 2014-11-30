/* jshint unused:vars */

LORE.register(function() {
	
	'use strict';
	
	var timer;
	var options = {
		suppressScrollY: true,
		wheelPropagation: true,
		minScrollbarLength: 100
	};
	var _scroll = function() {
		
		// Make `.scroll` fit width of children:
		$(this)
			.each(function() {
				
				var $this = $(this);
				
				console.log($this.find('img, table').width());
				
				$this.css('maxWidth', $this.find('img, table').width());
				
			})
			// Re-initialize plugin:
			.perfectScrollbar(options);
		
	};
	var $scroll = $('.scroll');
	
	// Call on page load (to catch non-ajaxed `.scroll`s):
	_scroll.call($scroll);
	
	// Listen for custom `scroll.perfect` event (called from `lore.mod.accordion.js`):
	$(document).on('scroll.perfect', '.scroll', _scroll);
	
	$(window).resize(function() {
		
		clearTimeout(timer);
		
		timer = setTimeout(function() {
			
			$('.scroll').perfectScrollbar('update'); // Update initialized `perfectScrollbar()` instances.
			
		}, 100);
		
	});
	
}); // LORE
