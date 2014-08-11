// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $('body').on('input propertychange', '.floating-label-form-group', function(e) {
        $(this).toggleClass('floating-label-form-group-with-value', !! $(e.target).val());
    }).on('focus', '.floating-label-form-group', function() {
        $(this).addClass('floating-label-form-group-with-focus');
    }).on('blur', '.floating-label-form-group', function() {
        $(this).removeClass('floating-label-form-group-with-focus');
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
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
        if(history.pushState) {
            window.history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    });
    $('.portfolio-modal').on('show.bs.modal', function (e) {
        var hash = '#' + $(e.target).attr('id');
        if(window.history.pushState) {
            window.history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
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
