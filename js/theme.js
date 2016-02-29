$.easing.easeCustom = function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};

// Calculate and fill miliseconds since 1 jul 2009 continuously
function setMillisec() {
  var millisec = ((new Date).getTime() - (new Date(2009, 07, 01)).getTime());
  $('.millisec').text(millisec);
}
setInterval(setMillisec, 500);

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
$('#contact form, .hashable-form').on('submit', function (e) {
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
        $("img.lazy", modal).lazyload({
            threshold : 100
        }).removeClass("lazy");
        modal.modal('show');
    }
    if (window.location.hash === '#contact-ok' || window.location.hash === '#form-ok') {
        console.log($('#contact .alert, .form-ok').length);
        $('#contact .alert, .form-ok').slideDown();
    }
    $('.portfolio-modal').on('show.bs.modal', function (e) {
        var hash = '#' + $(e.target).attr('id');
        var portfolioModal = $(this);
        $("img.lazy", portfolioModal).lazyload({
            threshold : 100
        }).removeClass("lazy");
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

$('.member-image:not(".blog")').click(function(e){
    e.preventDefault();
});

/**
 * Truncate a text block
 */
var truncate = function(target) {

  $(target).each(function() {

    var className = 'truncate-2-lines';
    var block = $(this);

    block.addClass(className);

    // create link and bind handler
    var link = $('<span/>').attr({href: '#','class': 'more'}).text('Meer ↓');
    link.click(function() {
        $(this).prev('.' + className).removeClass(className);
        $(this).hide();
        return false;
    });

    // insert link in truncated block
    block.after(link);
  });
};

truncate('.adv div');


/*
 * Back button closes modal if opened
 */

window.addEventListener("hashchange",function(e){
  $('.modal').modal('hide');
});

// filtering blog items
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {
  var author = getParameterByName('author') ? "." + getParameterByName('author') : "",
      filter = getParameterByName('filter') ? "." + getParameterByName('filter') : "";
  
  // the class combi of blog articles to show    
  var show = author + filter;

  if (show !== "") {
    $('.blog-item').hide();
    $('.blog-item' + show).show();
  }
});
