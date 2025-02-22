function swapImages1() {
    var $active = $('.swapimage1 .active');
    var $next = ($('.swapimage1 .active').next().length > 0) ? $('.swapimage1 .active').next() : $('.swapimage1 a:first');
    $active.fadeOut("fast", function() {
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
    });
};

function swapImages2() {
    var $active = $('.swapimage2 .active');
    var $next = ($('.swapimage2 .active').next().length > 0) ? $('.swapimage2 .active').next() : $('.swapimage2 a:first');
    $active.fadeOut(function() {
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
    });
};

function swapImages3() {
    var $active = $('.swapimage3 .active');
    var $next = ($('.swapimage3 .active').next().length > 0) ? $('.swapimage3 .active').next() : $('.swapimage3 a:first');
    $active.fadeOut("slow", function() {
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
    });
};

function swapImages4() {
    var $active = $('.swapimage4 .active');
    var $next = ($('.swapimage4 .active').next().length > 0) ? $('.swapimage4 .active').next() : $('.swapimage4 a:first');
    $active.fadeOut(function() {
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
    });
};

function swapImages5() {
    var $active = $('.swapimage5 .active');
    var $next = ($('.swapimage5 .active').next().length > 0) ? $('.swapimage5 .active').next() : $('.swapimage5 a:first');
    $active.fadeOut("slow", function() {
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
    });
};
$(document).ready(function() {
    setInterval('swapImages1(),swapImages2(),swapImages3(),swapImages4(),swapImages5()', 3000);
});