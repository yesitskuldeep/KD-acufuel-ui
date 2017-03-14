;(function($){

	"use strict";

	$(document).ready(function(){


		/* ------------------------------------------------
				flipster-master
		------------------------------------------------ */

			if($('.reviews_slider').length){

				$('.reviews_slider').owlCarousel({
				    nav:true,
				    loop:true,
				    navText: [ '', '' ],
				    items:1
				})

			}

        /* ------------------------------------------------
				End of flipster-master
		------------------------------------------------ */

	});

	$(window).load(function(){

		/* ------------------------------------------------
	    	Parallax
		------------------------------------------------ */

			if($(".blackout[class*='bg'],.blackout2[class*='bg'], .cstheme_parallax").length){

				$(".blackout[class*='bg'],.blackout2[class*='bg'], .cstheme_parallax").each(function(){

					$(this).parallax("50%", 0.2);

				});

			}
		/* ------------------------------------------------
		    End Parallax
		------------------------------------------------ */

	});

})(jQuery);