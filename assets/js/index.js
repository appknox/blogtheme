(function ($) {
    "use strict";

    $(document).ready(function() {
        
        /**
        * JS: Fluid width video embeds
        */
        $(".post-content").fitVids();
        
        /**
        * JS: Menu Navigation
        */
        $("#open-menu-item").click(function() {
            $( "#open-menu-item" ).hide(); 
            $( "#main-menu" ).fadeIn();
        });

        $("#close-menu-item").click(function() {
            $( "#main-menu" ).fadeOut( "fast");
            $( "#open-menu-item" ).fadeIn();
        });
        
        /**
        * JS: Scroll to top action
        */
        $(window).scroll(function() {
            if($(this).scrollTop() != 0) {
            $("#toTop").fadeIn();
            } else {
            $("#toTop").fadeOut();
            }
        });
        
        $("#toTop").click(function() {
            $("body,html").animate({
            scrollTop : 0
            }, 800);
        }); 
        
        /**
        * JS: Post Cover Image
        */
        var cover       = $('img[alt="header-cover"]');
        var container   = $('.post-header-cover');
    
        if (cover.length > 0) {
            cover.remove();
            container.css("background-image", "url(" + cover.attr("src") + ")");
        } else {
            container.css("background", "url(/assets/images/mbl-pattern.png)");
        }
        
        /**
        * JS: Remove emtpy paragraphs
        */
        $(".post-content p:empty").remove();

        /**
        * JS: Enquire
        */
        enquire.register("screen and (min-width: 992px)", {
            
            match : function() {
                
                /**
                * JS: Affix
                */
                if ($("#navigation").length){
                    $("#navigation").affix({
                    offset: { top: $('#navigation').offset().top-20 }
                    });
                }
                
                if ($("#share").length){
                    $("#share").affix({
                    offset: { top: $('#share').offset().top-20 }
                    });
                }
                
                $('#navigation').width($(".col-md-2").width());
                $('#share').width($(".col-md-2").width());
                $('#navigation.affix').width($(".col-md-2").width());
                $('#share.affix').width($(".col-md-2").width());
                
                $(window).resize(function() {
                $('#navigation').width($(".col-md-2").width());
                $('#share').width($(".col-md-2").width());
                });
                
                /**
                * JS: Progress bar
                */
                if ($("#progressbar").length){
                    var s = $(window).scrollTop(),
                    d = $(document).height(),
                    c = $(window).height(),
                    e = $(".post-footer").height(),
                    f = parseInt($(".post-footer").css("margin-top")) + parseInt($(".post-footer").css("padding-top")),
                    g = $(".site-footer").height(),
                    h = parseInt($(".site-footer").css("margin-top")) + parseInt($(".site-footer").css("padding-top")),
                    i = $("#disqus_thread").height();
                    
                    var scrollPercent;
                    if (c >= (d-e-f-g-h-i)) { scrollPercent = 100; } else { scrollPercent = 0; }

                    $("#progressbar").css("width", scrollPercent + "%");
                    $("#progressbar-value").html(scrollPercent + "%");
                }
                
                $(window).scroll(function () {
                    if ($("#progressbar").length){
                        var s = $(window).scrollTop(),
                        d = $(document).height(),
                        c = $(window).height(),
                        e = $(".post-footer").height(),
                        f = parseInt($(".post-footer").css("margin-top")) + parseInt($(".post-footer").css("padding-top")),
                        g = $(".site-footer").height(),
                        h = parseInt($(".site-footer").css("margin-top")) + parseInt($(".site-footer").css("padding-top")),
                        i = $("#disqus_thread").height();

                        var scrollPercent = (s / (d-c-e-f-g-h-i)) * 100;
                        scrollPercent = Math.round(scrollPercent);
                        
                        if (c >= (d-e-f-g-h-i)) { scrollPercent = 100; }  else if (scrollPercent < 0) { scrollPercent = 0; } else if (scrollPercent > 100) { scrollPercent = 100; }
                        
                        $("#progressbar").css("width", scrollPercent + "%");
                        $("#progressbar-value").html(scrollPercent + "%");
                    }
                    
                });
                
            },  
            unmatch : function() {
                $('#navigation').width("100%");
                $('#share').width("100%");
            }

        });
        
    });
    
    /**
    * JS: Google Map
    */
    $(document).ready(function() {

        var myLatlng = new google.maps.LatLng(config.lat,config.lng);
        var myZoom = config.zoom;
        var marker;
        var map;
    
        function initialize() {
    
            var mapOptions = {
                zoom: config.zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: myLatlng,
                scrollwheel: false
            };
    
            map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    
            marker = new google.maps.Marker({
                map:map,
                draggable:true,
                animation: google.maps.Animation.DROP,
                position: myLatlng        
            });
    
            google.maps.event.addDomListener(window, "resize", function() {
                map.setCenter(myLatlng);
            });
    
            google.maps.event.addListener(marker, "click", toggleBounce);
    
        }
    
        function toggleBounce() {
    
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    
        google.maps.event.addDomListener(window, "load", initialize);
    
        $('input:checkbox[name="mapswitch"]').change(
            function(){
            if ($(this).is(':checked')) {
                $("#map-canvas").show(); 
                google.maps.event.trigger(map, 'resize');
                map.setCenter(myLatlng);
                map.setZoom(myZoom);
            } else {
                $("#map-canvas").slideUp(); 
            }
            }
        );
        
    });

}(jQuery));

/**
* JS: DISQUS
*/
if ($("#disqus_thread").length){
    (loadDisqus = function(){
    var e = document.createElement('script'); e.type = 'text/javascript'; e.async = true; e.src = '//' + config.disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(e);
    })();
}
        