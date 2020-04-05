let origin = {
    section: $('.first-slide-section'),
    image: $('.first-slide-section'),
    text: $('.first-slide-section h1'),
    btn: $('.first-slide-section .main-btn'),
    top_gap: $('#intro-slide'),
},
    bgAction = 'clone', // multi | clone | fix | none
    btnBottom, triggerLine, copy, windowWidth;

$(window).on('load', function () {
    //   Elements setup (position & copy)
    addStyles();
    resetPositions();
    windowWidth = $(window).innerWidth();
    $(window).resize(function () {
        if (windowWidth !== $(window).innerWidth()) {
            resetPositions();
            windowWidth = $(window).innerWidth();
        }
    });
    //   Control elements on scroll
    $(window).scroll(function () {
        checkShow();
    })
});

// Main control function

function resetPositions() {

    origin.btn.css('transition', 'none');
    origin.text.css('transition', 'none');

    origin.top_gap.css({/*'margin-top':($(window).innerHeight()/2 + 400),*/'padding-top': origin.btn.outerHeight() + 10 });

    $('.blockCpy').each(function (e) {
        $(this).remove();
    });

    enlargeBG();

    btnBottom = origin.btn.offset().top + origin.btn.height();

    let textFix = calcFix(origin.text),
        btnFix = calcFix(origin.btn);
    fixElement(origin.text, textFix);
    fixElement(origin.btn, btnFix);

    copy = {
        text: origin.text.clone().addClass('blockCpy'),
        btn: origin.btn.clone().addClass('blockCpy'),
        btnWide:
            resetStyle(origin.btn.clone()).
                addClass('blockCpy').
                addClass('hidden').
                attr('id', '_fixedButton').
                css('height', btnFix.height)
    };
    triggerLine = $('.last_bg_image').offset().top + $('.last_bg_image').height();

    copy.btn.insertAfter(origin.btn);
    copy.text.insertAfter(origin.text);
    copy.btnWide.insertAfter(origin.btn);

    setInvisible(resetStyle(origin.text));
    setInvisible(resetStyle(origin.btn));

    checkShow();
}

// Additional style

function addStyles() {
    let styles = "<style>.banner-bg-wrap:before {content: none;}.slide-hide{top: -100vh!important;}#_fixedButton{     transform:scale(1);border-bottom: 1px solid;top:0;right:0;left:0;margin:0;position:fixed;z-index:101;border-radius: 0;max-width: 100%;text-align: center}#_fixedButton.hidden{transform: translateY(-100%);}.threeScreenBG{height: 500vh!important;}.slowScroll{height: 150vh!important;}</style>";
    $('head').append(styles);
}

// Utility functions

function enlargeBG() {
    origin.image.css('z-index', 'auto');
    switch (bgAction) {
        case 'clone': {
            origin.image.clone().html('').addClass('blockCpy').addClass('last_bg_image').insertAfter(origin.image);
            origin.image.clone().html('').addClass('blockCpy').attr('style', 'transform:scaleY(-1)').insertAfter(origin.image);
            break;
        }
        case 'multi': {
            let subImage = origin.image.clone().html('').addClass('last_bg_image').addClass('blockCpy').insertAfter(origin.image), negaScroll = subImage.offset().top;
            subImage.css({ 'height': '300vh', 'transform': 'translateY(-' + negaScroll + 'px)', 'margin-bottom': '-' + negaScroll + 'px' }).addClass('threeScreenBG');

            break;
        }
        case 'fix': {
            let longImage = origin.image.clone().html('').insertAfter(origin.image), slowImage = origin.image.clone().html('').insertAfter(longImage), negaScroll;
            negaScroll = longImage.offset().top;
            longImage
                .css({ 'opacity': '0', 'height': '500vh', 'transform': 'translateY(-' + negaScroll + 'px)', 'margin-bottom': '-' + negaScroll + 'px' })
                .addClass('last_bg_image')
                .addClass('threeScreenBG')
                .addClass('blockCpy');
            slowImage.css({ 'height': '150vh', 'position': 'fixed', 'top': '0', 'width': '100%' })
                .addClass('slowScroll')
                .addClass('blockCpy');
            origin.image.css('opacity', '0');
            slowScroll();
            break;
        }
        case 'none': default:
            origin.image.addClass('last_bg_image');
            break;
    }
}
function checkShow() {
    if (btnBottom + $(window).scrollTop() >= triggerLine) {
        setInvisible(copy.text);
        setInvisible(copy.btn);
        copy.btn.css('transition', 'all 1s ease');
        copy.text.css('transition', 'all 1s ease');
        copy.text.addClass('slide-hide');
        copy.btn.addClass('slide-hide');
        copy.btnWide.removeClass('hidden');
    } else {
        setVisible(copy.text);
        setVisible(copy.btn);
        copy.text.removeClass('slide-hide');
        copy.btn.removeClass('slide-hide');
        copy.btnWide.addClass('hidden');
    }
}
function calcFix(element) {
    return {
        top: element.offset().top,
        left: element.offset().left - 1,
        height: element.outerHeight(),
        width: element.outerWidth() + 1,
    };
}
function fixElement(element, values = false) {
    if (values === false) {
        let values = {
            top: element.offset().top,
            left: element.offset().left - 1,
            height: element.outerHeight(),
            width: element.outerWidth() + 1,
        }
    }
    element.css({
        "margin": "0",
        "z-index": "100",
        "position": "fixed",
        "top": values.top,
        "width": values.width,
        "max-width": values.width,
        "height": values.height,
        "left": values.left,
    });
    return element;
}
function resetStyle(element) {
    element.attr('style', '');
    return element;
}
function setInvisible(element) {
    element.css('opacity', '0');
    return element;
}
function setVisible(element) {
    element.css('opacity', '1');
    return element;
}

function slowScroll() {
    let slow = $('.slowScroll'),
        long = $('.threeScreenBG'),
        scale = slow.outerHeight() / (long.outerHeight() + $(window).innerHeight()),
        offset;
    $(window).scroll(function () {
        offset = $(window).scrollTop() * scale;
        slow.css('top', '-' + offset + 'px');
    });
}
