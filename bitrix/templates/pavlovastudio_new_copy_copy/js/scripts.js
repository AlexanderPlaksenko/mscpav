$('.main-slider-wrapp').css({})
$(document).ready(function(){
	//Sticky header
	$(function () {
        $(window).scroll(function () {
		var hh = $('header').height();
            if ($(this).scrollTop() >= hh) {
                $('header').addClass('stickytop');
            } else {
                $('header').removeClass('stickytop');
            }
        });
    	});
	//Slider
	$(".master-slider").slick({
        	dots: true,
        	infinite: true,
        	slidesToShow: 4,
        	slidesToScroll: 4,
		autoplay: true,
  		autoplaySpeed: 4000,
		responsive: [
    		{
      			breakpoint: 990,
      			settings: {
        			centerMode: true,
        			centerPadding: '40px',
        			slidesToShow: 3,
				arrows: false
      			}
    		},
    		{
      			breakpoint: 768,
      			settings: {
        			arrows: false,
        			centerMode: true,
        			centerPadding: '40px',
        			slidesToShow: 2
     	 		}
    		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 1
			}
		}
  		]
      	});
});
$(window).on('load', function() {
    $('.main-slider').bxSlider({
        auto: true,
        pause: 2000,
        responsive: true,
        pager: false,
        controls: true,
        adaptiveHeight: true,
        onSlideAfter: function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
            $('.active-slide').removeClass('active-slide');
            $('.main-slider > div').eq(currentSlideHtmlObject + 1).addClass('active-slide')
        },
        onSliderLoad: function() {
            $('.main-slider > div').eq(1).addClass('active-slide')
        }
    });
    $('.eyebrows-slider').bxSlider({
        pagerCustom: '.eyebrows-slider-nav',
        onSliderLoad: function() {
            $('.eyebrows-slider-nav-wrapp').css('max-height', $('.eyebrows-slider').parent().height() + 'px');
            $('.eyebrows-slider-nav-wrapp').mCustomScrollbar({
                scrollButtons: {
                    enable: true
                }
            });
        },
        onSlideAfter: function() {
            $('.eyebrows-slider-nav-wrapp').mCustomScrollbar('scrollTo', $('.eyebrows-slider-nav').find('.active'));
        }
    });
    $('.lips-slider').bxSlider({
        pagerCustom: '.lips-slider-nav',
        onSliderLoad: function() {
            $('.lips-slider-nav-wrapp').css('max-height', $('.lips-slider').parent().height() + 'px');
            $('.lips-slider-nav-wrapp').mCustomScrollbar({
                scrollButtons: {
                    enable: true
                }
            });
        },
        onSlideAfter: function() {
            $('.lips-slider-nav-wrapp').mCustomScrollbar('scrollTo', $('.lips-slider-nav').find('.active'));
        }
    });
    $('.eyelids-slider').bxSlider({
        pagerCustom: '.eyelids-slider-nav',
        onSliderLoad: function() {
            $('.eyelids-slider-nav-wrapp').css('max-height', $('.eyelids-slider').parent().height() + 'px');
            $('.eyelids-slider-nav-wrapp').mCustomScrollbar({
                scrollButtons: {
                    enable: true
                }
            });
        },
        onSlideAfter: function() {
            $('.eyelids-slider-nav-wrapp').mCustomScrollbar('scrollTo', $('.eyelids-slider-nav').find('.active'));
        }
    });
})
$('.reviews-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    responsive: [{
        breakpoint: 991,
        settings: {
            slidesToShow: 2,
        }
    }, {
        breakpoint: 767,
        settings: {
            slidesToShow: 1,
        }
    }]
});
$('.reviews-slider').slick('slickPlay');

$('.tab-btn').click(function() {
    var t = $(this),
        tabs = t.closest('.tabs-btns').attr('data-tabs');
    if (t.hasClass('active')) return false;
    t.closest('.tabs-btns').find('.tab-btn').removeClass('active');
    $(tabs).find('.tab-block').removeClass('active');
    t.addClass('active');
    $(t.attr('href')).addClass('active');
    return false;
})

function showForm(t, form, focus, scroll, offset) {
    offset = offset || 0;
    $(form).slideToggle(300);
    if (scroll) {
        if (!t.hasClass('active')) {
            $('html, body').stop().animate({
                scrollTop: $(form).offset().top - offset
            }, 800);
        }
    }
    if (focus) {
        $(form).find('.input').first().focus();
    }
    t.toggleClass('active');
}
$('.recall-link').on('click', function() {
    showForm($(this), '#recall-call', true, true);
    return false;
})
$('.reviews-add-btn').on('click', function() {
    showForm($(this), '#reviews-add-form', true, true, 20);
    return false;
})
$('.faq-add-btn').on('click', function() {
    showForm($(this), '#faq-form', true, true);
    return false;
})
$('.scroll').on('click', function() {
    var t = $(this);
    $('html, body').stop().animate({
        scrollTop: $(t.attr('href')).offset().top
    }, 800);
    return false;
});
$('.tel-mask').mask('+7 (999) 999-99-99');
$(document).ready(function() {
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validate(t) {
        var inputs = t.find('.valid'),
            checks = t.find('.checkbox-valid'),
            test = [],
            checkTest = [];
        email = t.find('.email-valid'), emailVal = email.val();
        inputs.each(function() {
            if (!$(this).val()) {
                $(this).closest('.form-block').find('.alert').addClass('active');
                test.push(0);
            }
        })
        checks.each(function() {
            if (!$(this).prop('checked')) {
                $(this).closest('.form-block').find('.alert').addClass('active');
                checkTest.push(0);
            }
        })
        for (var i = 0; i < test.length; i++) {
            if (test[i] === 0) return false;
        }
        for (var i = 0; i < checkTest.length; i++) {
            if (checkTest[i] === 0) return false;
        }
        if (!validateEmail(emailVal) && email.length > 0) {
            email.closest('.form-block').find('.alert').addClass('active');
            return false;
        }
        return true;
    }
    var reachFormGoal = function(form) {
        var goal = 'free_consult';
        if (form.is('.main-banner-form-footer')) {
            goal = 'zayavka_in_footer';
        } else if (form.is('.recall-form')) {
            goal = 'zakazat_zvonok';
        } else if (form.is('.subscribe-form')) {
            goal = 'rassylka';
        } else if (form.is('.contacts-form')) {
            goal = 'otpravit_vopros';
        } else {
            goal = 'free_consult';
        }
        yaCounter32030751.reachGoal(goal);
    }
    var options = {
        clearForm: true,
        success: function () {
		window.location.href = "thanks.php"
	}
    };
    $('.form').submit(function() {
        if (validate($(this))) {
            try {
                reachFormGoal($(this));
            } catch (e) {
                console.log(e);
            }
            $(this).ajaxSubmit(options);
            return false;
        } else return false;
    });

    function showResponse() {
        $.fancybox.close(true);
        $.fancybox('<div class="send">Спасибо! Ваша заявка принята, наш менеджер свяжется с вами в ближайшее время!</div>', {
            padding: 0
        });
    }
});
$(document).click(function(event) {
    $('.alert').removeClass('active');
})
$(document).ready(function() {
    $('.checkbox:checked').parent().addClass('checkbox-active');
})
$('.checkbox').change(function() {
    if ($(this).prop('checked')) {
        $(this).parent().addClass('checkbox-active');
    } else {
        $(this).parent().removeClass('checkbox-active');
    }
})
$('.fancy').fancybox();
$('a.quest').on('click', function() {
    var t = $(this),
        request = t.closest('.faq-block').find('.request');
    t.toggleClass('active');
    request.slideToggle(200);
    return false;
})
$('.faq-all-show').on('click', function() {
    $('.faq-block .request').slideDown(200);
    $('.faq-block .quest').addClass('active');
    return false;
})
$('.faq-all-hide').on('click', function() {
    $('.faq-block .request').slideUp(200);
    $('.faq-block .quest').removeClass('active');
    return false;
})
var mapCanvas = document.getElementById('map');

function initializeMap() {
    if (!mapCanvas) return;
    var mapOptions = {
            center: new google.maps.LatLng(56.817621, 60.542466),
            zoom: 17,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(mapCanvas, mapOptions),
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(56.817621, 60.542466),
            map: map,
            cursor: 'default',
            icon: {
                url: '/bitrix/templates/pavlovastudio_new/img/marker.png',
                size: new google.maps.Size(53, 76),
                scaledSize: new google.maps.Size(53, 76)
            },
            optimized: false,
            title: 'Екатеринбург, Волгоградская улица, 220'
        });
    var content = document.createElement('div');
    content.innerHTML = "<p class='qq1'>Екатеринбург</p><p class='qq2'>микрорайон Юго-Западный,</p><p class='qq2'>Волгоградская улица, 220</p><a  class='qq3' href='#'>подробнее о том, как с нами связаться</a>";
    var infowindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}
if (mapCanvas) {
    google.maps.event.addDomListener(window, 'load', initializeMap);
}
