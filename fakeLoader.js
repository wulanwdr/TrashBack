(function ($) {
    $.fakeLoader = function(options) {

        var settings = $.extend({
            targetClass:'fakeLoader',
            timeToHide:1200,               
            bgColor: '#2ecc71', 
            spinner:'spinner2'
        }, options);

        var spinner01 = '<div class="fl fl-spinner spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
        var spinner02 = '<div class="fl fl-spinner spinner2"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
        
        var el = $('body').find('.' + settings.targetClass);

        el.each(function() {
            var a = settings.spinner;
            
                switch (a) {
                    case 'spinner1':
                            el.html(spinner01);
                        break;
                    case 'spinner2':
                            el.html(spinner02);
                        break;
                    default:
                        el.html(spinner01);
                    }
        });

        el.css({
            'backgroundColor':settings.bgColor
        });

        setTimeout(function () {
            $(el).fadeOut();
        }, settings.timeToHide);
    }; 
}(jQuery));




