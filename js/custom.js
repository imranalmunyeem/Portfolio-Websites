(function ($) {
    'use strict';

    // preloader
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
    
    var $window = $(window);

    // Fullscreen Active Code
    $window.on('resizeEnd', function () {
        $(".full_height").height($window.height());
    });

    $window.on('resize', function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");


    // Menu Active Code
    $('#menuIcon').on('click', function () {
        $('body').toggleClass('menu-open');
    });
    $('.closeIcon').on('click', function () {
        $('body').removeClass('menu-open');
    });

    // Tooltip Active Code
    $('[data-toggle="tooltip"]').tooltip()


    // MatchHeight Active Code
    if ($.fn.matchHeight) {
        $('.full-height').matchHeight({
            byRow: true,
            property: 'height'
        });
    }

    // PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

})(jQuery);


(function() {
    var Progress = function( element ) {
        this.context = element.getContext( "2d" );
        this.refElement = element.parentNode;
        this.loaded = 0;
        this.start = 4.72;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.total = parseInt( this.refElement.dataset.percent, 10 );
        this.timer = null;
        this.diff = 0;
        this.init();    
    };
    Progress.prototype = {
        init: function() {
            var self = this;
            self.timer = setInterval(function() {
                self.run(); 
            }, 25);
        },
        run: function() {
            var self = this;
            self.diff = ( ( self.loaded / 100 ) * Math.PI * 2 * 10 ).toFixed( 2 );  
            self.context.clearRect( 0, 0, self.width, self.height );
            self.context.lineWidth = 5;
            self.context.fillStyle = "#f3c26b";
            self.context.strokeStyle = "#f3c26b";
            self.context.textAlign = "center";
            self.context.fillText( self.loaded + "%", self.width * .5, self.height * .5 + 2, self.width );
            self.context.beginPath();
            self.context.arc( 50, 50, 45, self.start, self.diff / 10 + self.start, false );
            self.context.stroke();
            if( self.loaded >= self.total ) {
                clearInterval( self.timer );
            }
            self.loaded++;
        }
    };
    var CircularSkillBar = function( elements ) {
        this.bars = document.querySelectorAll( elements );
        if( this.bars.length > 0 ) {
            this.init();
        }   
    };
    CircularSkillBar.prototype = {
        init: function() {
            this.tick = 2;
            this.progress();
        },
        progress: function() {
            var self = this;
            var index = 0;
            var firstCanvas = self.bars[0].querySelector( "canvas" );
            var firstProg = new Progress( firstCanvas );
            var timer = setInterval(function() {
                index++;
                var canvas = self.bars[index].querySelector( "canvas" );
                var prog = new Progress( canvas );
                if( index == self.bars.length ) {
                        clearInterval( timer );
                } 
            }, self.tick * 100);
        }
    };
    document.addEventListener( "DOMContentLoaded", function() {
        var circularBars = new CircularSkillBar( ".single-pie-bar" );
    });
})();


// Isotope Filter
var $container = $('.work-gallery');
    $container.imagesLoaded().progress( function() {
        $container.isotope();
    });

$('.work-filter li').on('click', function(){
    $(".work-filter li").removeClass("active");
    $(this).addClass("active");
    var selector = $(this).attr('data-filter');
    $container.imagesLoaded().progress( function() {
        $container.isotope({
            filter: selector,
        });
    });
    return false;
});


