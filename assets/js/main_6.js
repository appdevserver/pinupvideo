function re_height() {
    $('.first-slide-section').attr('style','height:' +window.innerHeight + 'px!important')
}
re_height();
$(window).resize(function () {
        if (window.innerWidth > 768)    re_height();
});
$(document).ready(function () {
    "use strict";

    /*-------------------------------------------------------------------------------
    javaScript for smooth scroll
    -------------------------------------------------------------------------------*/
    if(window.location.hash){
        let hash = window.location.hash;
        if ($(hash).length>0){
            setTimeout(function() {
                window.scrollTo(0, 0);
            }, 1);

            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: ($(hash).offset().top)
                }, 700);
            }, 500);
        }
    }

    $(document).on('click touchstart',"a[href^=\"#\"]",function (e) {
        e.preventDefault();
        var hash = this.hash;
        var position = $(hash).offset().top;
        $("html, body").animate({
            scrollTop: position
        }, 1000, function () {
            window.location.hash = hash;
        });
    });

    if($('.grid-wrap').length > 0){
        $('.grid-wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false
        });
    }
});