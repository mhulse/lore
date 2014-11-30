/* jshint unused:false */
/* global ga:false */

// @see http://api.jqueryui.com/accordion/
// @todo Combine these two accordions.
LORE.register(function() {
	
	'use strict';
	
	// http://jsfiddle.net/adamboduch/tJnw7/
	// http://www.boduch.ca/2013/12/activate-accordion-section-by-url-hash.html
	var hashchange = function($accordion) {
		
		var $this = $(this);
		
		$(window).on('hashchange', function(e) {
			
			var headers = $this.accordion('option', 'header');
			var header = $(location.hash);
			var index = $this.find(headers).index(header);
			
			if (index >= 0) {
				
				$this.accordion('option', 'active', index);
				
			}
			
		});
		
	};
	var $accordion = $('#accordion');
	var $progress = $('<div />', { 'class' : 'progress' });
	
	$accordion
		.children('h3')
		.each(function() {
			
			$(this).after('<div class="ui-accordion-content" />');
			
		});
	
	$accordion
		.accordion({
			collapsible: true,
			active : false,
			heightStyle: 'content',
			animate: false,
			icons: false,
			header: '> h3:not(.off)', // Allows for hidden text-only content related to each header for Google to index.
			beforeActivate: function(e, ui) {
				
				var url;
				
				if (ui.newPanel.is(':empty')) {
					
					url = ui.newHeader.attr('data-href');
					
					ui.newHeader
						.next()
						// Loaded children must have .ajax-content class as that's the content target that gets loaded:
						.load(url + ' .ajax-content', function(response, status, xhr) {
							
							var $this = $(this);
							var $content = $this.children('.ajax-content'); // Better way?
							
							$progress
								.appendTo($this)
								.fadeIn('fast');
							
							$content
								.imagesLoaded()
									.always(function(instance) {
										
										// Triggered after all images have been either loaded or confirmed broken.
										//console.log('all images loaded');
										
									})
									.done(function(instance) {
										
										// Triggered after all images have successfully loaded without any broken images.
										//console.log('all images successfully loaded');
										
										$progress.fadeOut('fast', function() {
											
											$content.fadeIn('fast', function() {
												
												$content.find('.scroll').trigger('scroll.perfect'); // See `lore.mod.scroll.js`.
												
												$('html, body').animate({ scrollTop: ui.newHeader.offset().top }, 'fast');
												
												if ((typeof ga != 'undefined') && (ga !== null)) {
													
													// Track that shit!
													ga('send', 'pageview', { 'page': '/' + url, 'title': ui.newHeader.text() });
													
												}
												
											});
											
										});
										
									})
									.fail(function() {
										
										// Triggered after all images have been loaded with at least one broken image.
										//console.log('all images loaded, at least one is broken');
										
									})
									.progress(function(instance, image) {
										
										// Triggered after each image has been loaded.
										//var result = image.isLoaded ? 'loaded' : 'broken';
										//console.log('image is ' + result + ' for ' + image.img.src);
										
									});
							
						});
				}
			},
			activate: function(e, ui) {
				
				if (ui.newPanel.length && ui.newPanel.not(':empty')) {
					
					$('html, body').animate({ scrollTop: ui.newHeader.offset().top }, 'fast');
					
					history.pushState(null, null, ('#' + ui.newHeader.attr('id')));
					
				}
				
				$accordion.accordion('refresh');
				
				ui.oldHeader.children('a').blur();
				
			},
			create: function( e, ui ) {
				
				hashchange.call(this, $accordion);
				
				$(window).trigger('hashchange');
				
			}
		});
	
}); // LORE
