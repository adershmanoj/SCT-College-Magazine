/* ----------------------------------
 *
 * Parallax
 *
 * ---------------------------------- */

jQuery('html').toggleClass('hasjs');

(function($) {
	var lastScrollTop = 0,
		$contentContainers,
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

	$(document).ready(function($){

		$('nav#access').setResponsiveClass();

		$.updatePageNav();

		$contentContainers = $('#wrapper .content-container');

		$contentContainers.each(function(){
			$(this).loadElements();
		});

		$(window).load(function(){
			setTimeout(function() {
				if (location.hash && $(location.hash).length > 0) {
					window.scrollTo(0, $(location.hash).offset().top + calculateOffset());
					$contentContainers.each(function(){
						$(this).animate({opacity:1},400);
					});
				}
			}, 1000);
		});

		$(window).bind('scrollstop',function(e){
			if('true'==parallax.snapAfterScroll) {
				var countainerCount = $contentContainers.length;
				$contentContainers.each(function(index){
					var elementBottom  = $(this).offset().top + $(this).height(),
						centerOfWindow = $(window).height() / 2 + $(window).scrollTop();
					if($(this).isInViewport() && elementBottom >= centerOfWindow && index != countainerCount - 1){
						var scrollTo = $(this).offset().top + calculateOffset();
						$('html, body').animate({scrollTop:scrollTo},400);
						return false;
					}
				});
			}
		});

		// Parallax
		if(!isMobile) {
			$contentContainers.each(function(){
				if($(this).hasClass("parallax-enabled")) {
					$(this).parallax();
				}
			});

			$(window).bind('scroll',function(e){
				$contentContainers.each(function(){
					if($(this).isInViewport() && $(this).hasClass("parallax-enabled")) {
						$(this).parallax();
					}
				});
			});

			$(window).bind('scroll',$.throttle(300,function(){
				$.updatePageNav();
			}));
		}

		// Smooth scroll for intrapage links
		$('nav#page a, a[href*=#]').smoothScroll({
			offset: calculateOffset(),
			easing: 'swing',
			excludeWithin: ['.slidedeck-frame, .ui-tabs, .no-smooth-scroll'],
			speed: 1600,
			afterScroll: function(){ // Set URL to current page
				if($(this.hash).length > 0) {
					var History = window.History,
						href = $(this).attr('href');
					if(History.enabled && !/msie/.test(navigator.userAgent.toLowerCase())) {
						History.pushState({href:1}, href, href);
					}
				} else {
					window.location.href = $(this).attr('href');
				}
			}
		});

		// Make Video in iframe etc responsive
		$('iframe, embed', $('body')).not('.unresponsive, [id^="_twttr_anywhere_client_"]').each(function(){
			$(this).removeAttr('width');
			$(this).removeAttr('height');
			$(this).wrap('<div class="responsive" />')
		});

		// Load Theme Designer
		$('#wp-admin-bar-parallax-designer').one('click', function(){
			$.getScript(parallax.templateUri+'js/theme-designer.js',function(){
				$('#wp-admin-bar-parallax-designer').addClass('loaded');
				return $.toggleDesigner();
			});
			return false;
		});

		// Toggle Theme Designer after first load
		$('#theme-designer h2 .f3-close-designer').on('click',function(){
			return $.toggleDesigner();
		});
		$('#wpadminbar').on('click','#wp-admin-bar-parallax-designer.loaded',function(){
			return $.toggleDesigner();
		});

		// iPad fallback
		if(isMobile) {
			$(window).bind('load orientationchange',function(e){
				var ipad_bg_pos_x = '50%',
					ipad_bg_pos_y = $('#branding').outerHeight(true);

				$contentContainers.each(function(index){
					var $contentContainer = $(this),
						$overlayContainer = $('.overlay',$contentContainer),
						article_height = $contentContainer.outerHeight(true) + $('#branding').outerHeight(true),
						repeatBackground = false,
						repeatOverlay = false;

					// Account for border image not taken into account by jQuery.outerHeight()
					if($('#branding').hasClass('shadow-container'))
						ipad_bg_pos_y = ipad_bg_pos_y - 10;

					// Resize the content background image if needed
					if(!$contentContainer.hasClass('cover')) {

						if($contentContainer.hasClass('repeat') || $contentContainer.hasClass('repeat-x') || $contentContainer.hasClass('repeat-y'))
							repeatBackground = true;

						if($contentContainer.css('backgroundImage') != undefined && $contentContainer.css('backgroundImage') != 'none' && repeatBackground != true) {
							$contentContainer.css({
										'backgroundPosition': ipad_bg_pos_x + ' ' + ipad_bg_pos_y + 'px',
										'-webkit-background-size': 'auto ' + article_height + 'px'
										});
						}
					} else {

						// Make the background scroll so "background-size: cover" works
						$contentContainer.css({'background-attachment': 'scroll'});

					}

					// Resize the overlay image if needed
					if(!$overlayContainer.hasClass('cover')) {

						if($overlayContainer.hasClass('repeat') || $overlayContainer.hasClass('repeat-x') || $overlayContainer.hasClass('repeat-y'))
							repeatOverlay = true;

						if($overlayContainer.css('backgroundImage') != undefined && $overlayContainer.css('backgroundImage') != 'none' && repeatOverlay != true) {
							$overlayContainer.css({'backgroundPosition': ipad_bg_pos_x + ' ' + ipad_bg_pos_y + 'px',
												'-webkit-background-size': 'auto ' + article_height + 'px',
												'opacity':1
												});
						}

					} else {

						$overlayContainer.css({'background-attachment': 'scroll'});

					}

					$contentContainer.css({'opacity':1});

					if(ipad_bg_pos_y == $('#branding').outerHeight(true))
						ipad_bg_pos_y = $contentContainer.outerHeight(true);
					else
						ipad_bg_pos_y += $contentContainer.outerHeight(true);
				});
			});
		}

		// Responsive menu
		var menu = $('nav#access ul.menu'),
			menuHeight = menu.height();

		$('#pull').on('click', function(e) {
			e.preventDefault();
			menu.slideToggle();
		});

		$(window).resize(function(){
			var w = $(window).width();
			if(w > 320 && menu.is(':hidden')) {
				menu.removeAttr('style');
			}
			$('nav#access').setResponsiveClass();

			var div=$('.hd_keep_scrolling');
			div.css('margin-top', ($(window).height() - 280)  + 'px');
		});

		var div=$('.hd_keep_scrolling');
		div.css('margin-top', ($(window).height() - 280)  + 'px');
	});

	$.fn.extend({
		loadElements: function(){
			var $element = $(this),
				makeVisible = true;

			if(location.hash)
				makeVisible = false;

			if($element.css('opacity')==0){
				var newTop = $element.height() / 5 * 4; // Position the loader just below the top of the parent element;
				$element.next('.preloader').css({top: -newTop+'px'});
			}

			// If no image, load immediately
			if($element.css('backgroundImage') == undefined || $element.css('backgroundImage') == 'none') {
				$element.next('.preloader').addClass('loaded').fadeOut(400);
				if(makeVisible){
					$element.animate({opacity:1},400);
				}
			} else { 
				// Otherwise, wait until background images are loaded
				var backgroundImage = new Image();

				$(backgroundImage).one('load',function() {
					$element.next('.preloader').addClass('loaded').fadeOut(400,function(){
						if(makeVisible){
							$element.animate({opacity:1},400);
						}
					});
				});

				backgroundImage.src = $element.css('backgroundImage').replace(/(url\(|\)|'|")/gi,'');

				// Make sure if fires in case it was cached
				if(backgroundImage.complete) {
					$(backgroundImage).load();
				}

				backgroundImage = null;
			}
		},
		parallax: function(){ // Apply the parallax effect to a given element
			// Scroll the Background
			if($(this).css('backgroundImage') != undefined && $(this).css('backgroundImage') != 'none'){
				var bg_pos = '50% ' + (-($(window).scrollTop() - $(this).offset().top) * 0.15) + 'px';
				$(this).css({'backgroundPosition':bg_pos});
			}
			// Scroll the Overlay
			if($('.overlay',$(this)).css('backgroundImage') != undefined && $('.overlay',$(this)).css('backgroundImage') != 'none'){
				var overlay_pos = '50% ' + (($(window).height()/2-($(window).height() + $(window).scrollTop() - $(this).offset().top)/3) - 120) + 'px';
				$('.overlay',$(this)).css('backgroundPosition',overlay_pos);
			}
		},
		isInViewport: function(){
			if($(window).scrollTop() >= ($(this).offset().top + $(this).height())) // Above the Top of the Viewport?
				return false;
			else if($(window).height() + $(window).scrollTop() <= $(this).offset().top)	// Below the fold?
				return false;
			else
				return true;
		},
		setResponsiveClass: function(){
			if($(window).width() < 900) {
				$(this).addClass('responsive-menu');
			} else {
				$(this).removeClass('responsive-menu');
			}
			$(this).show();
		}
	});

	$.extend({
		updatePageNav: function(){ // Set the current page nav element to be highlighted
			$('nav#page li a').each(function(index,element){
				var $contentElement = $($(this).attr('href')),
					contentTop = $contentElement.offset().top,
					contentBottom = $contentElement.offset().top + $contentElement.height();

				if(lastScrollTop < $(window).scrollTop()) {// Scrolling down
					linkTop = $(this).offset().top + (2 * $(this).height());
				} else {
					linkTop = $(this).offset().top;
				}

				if(linkTop >= contentTop && linkTop < contentBottom){
					lastScrollTop = $(window).scrollTop();
					$('.in-viewport').removeClass('in-viewport');
					var linkName = $(this).attr('href').substring(1)+'-link';
					$('.'+linkName).addClass('in-viewport');
					return false;
				}

				// If we made it to hear, no nav menus are in the viewport
				$('.in-viewport').removeClass('in-viewport');
			});
		},
		toggleDesigner: function(){ // Displays the front end designer
			if($('#wp-admin-bar-parallax-designer').hasClass('selected')){
				$('#wp-admin-bar-parallax-designer').removeClass('selected');
				$('#theme-designer').fadeOut(200);
			} else {
				$('#wp-admin-bar-parallax-designer').addClass('selected');
				$('#theme-designer').fadeIn(200);
			}
			return false;
		}
	});

	function calculateOffset() {
		var offset = 0;

		if($('body').hasClass('fixed'))
			offset = $('#branding').innerHeight();

		if($('#wpadminbar').length > 0)
			offset += $('#wpadminbar').innerHeight();

		return - offset;
	}

})(jQuery);
