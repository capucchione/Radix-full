/**
 * Rookie jQuery functions
 * version: 1.0
 */

(function($){
    $(document).ready(function(){

    // niceScroll
        $("html").niceScroll({
            cursorcolor: "#474747",
            cursorborder: false,
            cursorborderradius: false,
            cursorwidth: "10px",
            mousescrollstep: "60",
            zindex: "10000",
            cursoropacitymax: "0.5",
            scrollspeed: "30",
            hidecursordelay: "2000"
        });

    // Fire wow.js 
        wow = new WOW( {
            boxClass:     'wow',
            animateClass: 'animated',
            offset:       100
            }
        );

        wow.init();

    // mainslider
        $("#main-slider").swipe({
            swipeLeft: function(event, direction, distance, duration, fingerCount) {
                $(this).parent().carousel("prev");
                percent = 0;
            },
            swipeRight: function() {
                $(this).parent().carousel("next");
                percent = 0;
            },
            threshold: 0,
            preventDefaultEvents: true
        });

    // to top
        var offset = 1000;
        var duration = 1000;
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $(".to-top").fadeIn(duration);
            } else {
                $(".to-top").fadeOut(duration);
            }
        });
        $(".to-top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, duration, "jswing");
            return false;
        });

    // Sticky nav
        var navOffset, scrollPos = 0;
        
        // add utility wrapper elements for positioning
        $("#site-nav").wrap('<div class="placeholder-nav"></div>');

        // function to run on page load and window resize
        function stickyUtility() {
            
            // only update navOffset if it is not currently using fixed position
            if (!$("#site-nav").hasClass("is-sticky")) {
                navOffset = $("#site-nav").offset().top;
            }
            
            // apply matching height to nav wrapper div to avoid awkward content jumps
            $(".placeholder-nav").height($("#site-nav").outerHeight());
            
        } // end stickyUtility function
        
        // run on page load
        stickyUtility();
        
        // run on window resize
        $(window).resize(function() {
            stickyUtility();
        });
        
        // run on scroll event
        $(window).scroll(function() {
            
            scrollPos = $(window).scrollTop();
            
            if (scrollPos >= navOffset) {
                $("#site-nav").addClass("is-sticky");
            } else {
                $("#site-nav").removeClass("is-sticky");
            }
            
        });

    // Bootstrap edit
        $(".comment-reply-link").addClass("btn btn-sm btn-default");
        $("#submit, button[type=submit], html input[type=button], input[type=reset], input[type=submit]").addClass("btn btn-default");
        $(".postform").addClass("form-control");
        $("table").addClass("table table-striped");
        $("#submit, .tagcloud, button[type=submit], .widget_rss ul, .postform, table#wp-calendar").show("fast");
        $('a[data-toggle="tab"]:first').tab("show");
        // Open dropdown menu on hover
        $('#desktop-menu ul.nav.navbar-nav li.dropdown').hover(
            function() { $(this).addClass("open nav-animation") }, 
            function() { $(this).removeClass("open nav-animation") }
        ); 
        // add dropdown class to search dropdown button
        $("#search_dropdown a").click(
            function() { $("#search_dropdown").addClass("dropdown") }
        );
        // Add animation then focus to search pop up
        var animationend = "webkitAnimationEnd animationend";
        $("#search_dropdown a").on('click',
            function() {
            $("#dropdown_animation").addClass("search-animation").one(animationend, function() {
                $(this).removeClass("search-animation");
                $("li.dropdown a").next().find(".search-pop").focus();
            });
        });

    // progress-bar
        setTimeout(function() {
            $(".progress-bar").each(function() {
                var me = $(this);
                var perc = me.attr("data-percentage");
                var current_perc = 0;
                var progress = setInterval(function() {
                    if (current_perc >= perc) {
                        clearInterval(progress);
                    } else {
                        current_perc += 1;
                        me.css("width", (current_perc) + "%");
                    }
                    me.text((current_perc) + "%");
                }, 0);
            });
        }, 0);

    // feedback
        $("a.tip").tooltip();
        var pending_ajax = false;
        $(".feedback-wrap").on("click", "a", function(e) {
            e.preventDefault();
            if (pending_ajax) {
                return;
            }
            pending_ajax = true;
            var self = $(this),
                wrap = self.closest(".feedback-wrap"),
                data = {
                    post_id: self.data("id"),
                    type: self.data("type"),
                    action: "rookie_ajax_feedback",
                    _wpnonce: rookie.nonce
                };
            wrap.append('&nbsp; <i class="fa fa-refresh fa-spin"></i>');
            $.post(rookie.ajaxurl, data, function(resp) {
                wrap.html(resp.data);
                pending_ajax = false;
            });
        });

    // portfolio
        $(window).load(function() {
            $portfolio_selectors = $(".portfolio-filter >li>a");
            if ($portfolio_selectors != "undefined") {
                $portfolio = $(".portfolio-items");
                $portfolio.isotope({
                    itemSelector: "li",
                    layoutMode: "fitRows"
                });
                $portfolio_selectors.on("click", function() {
                    $portfolio_selectors.removeClass("active");
                    $(this).addClass("active");
                    var selector = $(this).attr("data-filter");
                    $portfolio.isotope({
                        filter: selector
                    });
                    return false;
                });
            }
        });

    // prettyPhoto
        jQuery(document).ready(function($) {
           $("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.gif'], a[href$='.png']").prettyPhoto({
            animationSpeed: 'normal', /* fast/slow/normal */
            padding: 40, /* padding for each side of the picture */
            opacity: 0.35, /* Value betwee 0 and 1 */
            showTitle: true /* true/false */            
            });
        });

    });
})(jQuery); 
