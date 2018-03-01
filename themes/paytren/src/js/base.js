/**
 *  PayTren- v1.0.0 - Main JavaScript file
 */

/* greedly theme javascripts module */
var paytren = (function($) {

    'use strict';
    var _owlCarousel = function() {
            $(".post-loop").owlCarousel({
                loop: true,
                dots: false,
                nav: true,
                navSpeed:500,
                navClass: ['button-slider button-prev', 'button-slider button-next'],
                navText: [
                      "<i class='icon-angle-left'></i>",
                      "<i class='icon-angle-right'></i>"
                      ],
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 1,
                
            });
        },
        _treniSlider = function() {
            $(".tren-slider").owlCarousel({
                loop: true,
                center: true,
                nav: true,
                dots: false,
                margin: 30,
                navSpeed:500,
                navClass: ['nav-slider nav-prev', 'nav-slider nav-next'],
                navText: [
                    "<i class='icon-angle-left'></i>",
                    "<i class='icon-angle-right'></i>"
                ],
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                responsiveClass:true,
                items:1,         
            });
        },
        _mobileMenu = function() {
            $('.nav-toggle').on('click', function(){
                    $('.nav-menu').toggleClass('nav-menu-active');
                });
                 // Hamburger to X toggle
                $('.nav-toggle').on('click', function() {
                    this.classList.toggle('active');
                });
        },
         _menuAccordion = function () {
            var acc = document.getElementsByClassName("qa-button");
            var i;

            for (i = 0; i < acc.length; i++) {
                acc[i].onclick = function() {
                    this.classList.toggle("active");
                    var panel = this.nextElementSibling;
                    if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                    } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    } 
                }
            }
        },
        _fitVids = function () {
          
        // Start fitVids
        var $postContent = $(".treni-video, .tren-youtube");
        $postContent.fitVids();
        // End fitVids

        },
        _hightlightJS = function () {
            hljs.initHighlightingOnLoad();
        }
    
    return {
        /* greedly theme initialization */
        init: function() {
            _owlCarousel();
            _treniSlider();
            _mobileMenu();
            _menuAccordion();
            _fitVids();
            _hightlightJS();
        }
    };

})(jQuery);

/* greedly theme javascripts initialization */
(function() {

	'use strict';
	paytren.init();

})();