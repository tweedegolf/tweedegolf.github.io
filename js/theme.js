$.easing.easeCustom = function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};

// jQuery for page scrolling feature - requires jQuery Easing plugin
$('.page-scroll a').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
    }, 800, 'easeCustom', function () {
        // This will fire twice: for both HTML and BODY
        if ($(this).is('body')) {
            window.location.href = $anchor.attr('href');
            if (typeof ga !== 'undefined') {
                ga('send', 'pageview', $anchor.attr('href').replace('#','/') );
            }
        }
    });
    event.preventDefault();
});

// add contact form authentiocation hash
$('#contact form').on('submit', function (e) {
    var form = $(this),
        name = form.find('[name=name]').val(),
        email = form.find('[name=email]').val(),
        message = form.find('[name=message]').val(),
        payload = email + '|' + name + '|' + message,
        hash = Sha1.hash(payload.replace(/(\W)/gm, ''));

    $('<input>', {
        'type': 'hidden',
        'name': 'hash',
        'value': hash
    }).appendTo(form);

    return true;
});

// Floating label headings for the contact form
$('body').on('input propertychange', '.floating-label-form-group', function(e) {
    $(this).toggleClass('floating-label-form-group-with-value', !! $(e.target).val());
}).on('focus', '.floating-label-form-group', function() {
    $(this).addClass('floating-label-form-group-with-focus');
}).on('blur', '.floating-label-form-group', function() {
    $(this).removeClass('floating-label-form-group-with-focus');
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
});

// collapse menu
var didScroll = false;
$(window).on('scroll', function (e) {
    if (!didScroll) {
        didScroll = true;
        setTimeout(function () {
            if (didScroll) {
                didScroll = false;
                var top = $(window).scrollTop();
                if (top > 200) {
                    $('.navbar-fixed-top').addClass('navbar-shrink');
                } else {
                    $('.navbar-fixed-top').removeClass('navbar-shrink');
                }
            }
        }, 250);
    }
});

// Direct modal links
$(function() {
    var modal = $(window.location.hash);
    if (modal.length > 0 && modal.is('.modal')) {
         modal.modal('show');
    }
    if (window.location.hash === '#contact-ok') {
        $('#contact .alert').slideDown();
    }
    $('.portfolio-modal').on('show.bs.modal', function (e) {
        var hash = '#' + $(e.target).attr('id');
        if(window.history.pushState) {
            window.history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
        if( typeof ga !== 'undefined' ) {
            ga('send', 'pageview', hash.replace('#','/') );
        }
    }).on('hidden.bs.modal', function () {
        var location = window.location.pathname + window.location.search;
        if(window.history.pushState) {
            window.history.pushState(null, null, location);
        } else {
            window.location = location;
        }
    });
});
