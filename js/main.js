<<<<<<< HEAD
var agent = navigator.userAgent.toLowerCase();
var evtName = 'mousewheel';
if(agent.indexOf('firefox') > -1){
	evtName = 'DOMMouseScroll';
}
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault){
	  e.preventDefault();
  }
  e.returnValue = false;
}
function wheel(e) {
  preventDefault(e);
}
function disableScroll() {
	window.addEventListener(evtName, wheel, { passive: false });
}
$(function(){
    var lnb = $("#lnb");
	var lnbBtn = lnb.children();
	var w = $(window);
	var body = $('body');
	var $section = $('.main-section, #ft');
	var scrollState = false;

    function move () {
		scrollState = true;
		var isState = true;

		function goPrevPage(num){
			isState = false;
			lnbBtn.eq(num-1).click();
			setTimeout(function(){
				isState = true;
			},900);
		}

		function goNextPage(num){
			isState = false;
			lnbBtn.eq(num+1).click();
			setTimeout(function(){
				isState = true;
			},900);
		}

		disableScroll();

		w.on("mousewheel DOMMouseScroll",function(e){
			var evt = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
			var pxNum = lnb.find('.active').index();

			if(!isState) {
				return;
			}

			if(evt<0){
				goNextPage(pxNum)
			}else if(evt>0 && pxNum) {
				goPrevPage(pxNum)
			}
		});

		$(document).on("keydown", function(e) {

			if(38 == (e.keyCode || e.which) || 40 == (e.keyCode || e.which)){
				e.preventDefault();
			}

			var pxNum = lnb.find('.active').index();

			if(isState){
				38 == (e.keyCode || e.which) && pxNum !== 0 && goPrevPage(pxNum);
		        40 == (e.keyCode || e.which) && pxNum !== $section.length-1 && goNextPage(pxNum);
			}
	    });
	}

	lnb.on('click','button',function(){
		var t = $(this);
        body.attr('data-theme', t.data('color'));
		t.addClass('active').siblings().removeClass('active');
		scrollMove(t.attr('data-target'));
	});

    $('body').scrollspy({
		target: '#lnb'
	});

    var visualSwiper = new Swiper('.visual-swiper', {
        loop: true,
        loopedSlides: 5,
        observer: true,
	    observeParents: true,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
 		autoplay: {
			delay: 5000
		},
   });

    var newSwiper = new Swiper('.news-swiper .swiper-container', {
        direction: 'vertical',
        loop: true,
        navigation: {
            nextEl: '.news-swiper .swiper-button-next',
            prevEl: '.news-swiper .swiper-button-prev',
        },
    });


    var businessSwiper = new Swiper('.business-swiper', {
        loop: true,
        loopedSlides: 5,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChangeTransitionEnd: function(){
                var num = this.realIndex+2;
                if(this.realIndex == this.loopedSlides-1){
                    num = 1;
                }
                $('#businessBg').css('background', 'url(img/main/business'+(this.realIndex+1)+'.jpg) no-repeat 50% 50%/cover');
                $(this.navigation.nextEl).attr('data-index', num).html($('.business-swiper .swiper-slide-next .display-2').clone());
            }
        }
    });

    var portfolioSwiper = new Swiper('.portfolio-swiper', {
        loop: true,
        slidesPerView: 1,
        loopedSlides: $('.portfolio-swiper .swiper-slide').length,
        observer: true,
	    observeParents: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            557: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 2,
            },
        }
    });

    var vh;

    w.on('resize',function  () {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh+'px');
		prop = w.width() > 1640 && w.height()>=645 ? true : false; //1200보다 크면 파랄렉스 스크롤 적용됨, 모든 해상도 적용할려면 수치 조정 필요

		if (prop) {
			!scrollState && move();
            body.addClass('is-wheel');
		}else {
			window.removeEventListener(evtName, wheel, { passive: false });
			w.off("mousewheel DOMMouseScroll");
            body.removeClass('is-wheel');
			scrollState = false;
		}
	}).trigger('resize');
});
=======
var agent = navigator.userAgent.toLowerCase();
var evtName = 'mousewheel';
if(agent.indexOf('firefox') > -1){
	evtName = 'DOMMouseScroll';
}
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault){
	  e.preventDefault();
  }
  e.returnValue = false;
}
function wheel(e) {
  preventDefault(e);
}
function disableScroll() {
	window.addEventListener(evtName, wheel, { passive: false });
}
$(function(){
    var lnb = $("#lnb");
	var lnbBtn = lnb.children();
	var w = $(window);
	var body = $('body');
	var $section = $('.main-section, #ft');
	var scrollState = false;

    function move () {
		scrollState = true;
		var isState = true;

		function goPrevPage(num){
			isState = false;
			lnbBtn.eq(num-1).click();
			setTimeout(function(){
				isState = true;
			},900);
		}

		function goNextPage(num){
			isState = false;
			lnbBtn.eq(num+1).click();
			setTimeout(function(){
				isState = true;
			},900);
		}

		disableScroll();

		w.on("mousewheel DOMMouseScroll",function(e){
			var evt = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
			var pxNum = lnb.find('.active').index();

			if(!isState) {
				return;
			}

			if(evt<0){
				goNextPage(pxNum)
			}else if(evt>0 && pxNum) {
				goPrevPage(pxNum)
			}
		});

		$(document).on("keydown", function(e) {

			if(38 == (e.keyCode || e.which) || 40 == (e.keyCode || e.which)){
				e.preventDefault();
			}

			var pxNum = lnb.find('.active').index();

			if(isState){
				38 == (e.keyCode || e.which) && pxNum !== 0 && goPrevPage(pxNum);
		        40 == (e.keyCode || e.which) && pxNum !== $section.length-1 && goNextPage(pxNum);
			}
	    });
	}

	lnb.on('click','button',function(){
		var t = $(this);
        body.attr('data-theme', t.data('color'));
		t.addClass('active').siblings().removeClass('active');
		scrollMove(t.attr('data-target'));
	});

    $('body').scrollspy({
		target: '#lnb'
	});

    var visualSwiper = new Swiper('.visual-swiper', {
        loop: true,
        loopedSlides: 5,
        observer: true,
	    observeParents: true,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
 		autoplay: {
			delay: 5000
		},
   });

    var newSwiper = new Swiper('.news-swiper .swiper-container', {
        direction: 'vertical',
        loop: true,
        navigation: {
            nextEl: '.news-swiper .swiper-button-next',
            prevEl: '.news-swiper .swiper-button-prev',
        },
    });


    var businessSwiper = new Swiper('.business-swiper', {
        loop: true,
        loopedSlides: 5,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChangeTransitionEnd: function(){
                var num = this.realIndex+2;
                if(this.realIndex == this.loopedSlides-1){
                    num = 1;
                }
                $('#businessBg').css('background', 'url(img/main/business'+(this.realIndex+1)+'.jpg) no-repeat 50% 50%/cover');
                $(this.navigation.nextEl).attr('data-index', num).html($('.business-swiper .swiper-slide-next .display-2').clone());
            }
        }
    });

    var portfolioSwiper = new Swiper('.portfolio-swiper', {
        loop: true,
        slidesPerView: 1,
        loopedSlides: $('.portfolio-swiper .swiper-slide').length,
        observer: true,
	    observeParents: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            557: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 2,
            },
        }
    });

    var vh;

    w.on('resize',function  () {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh+'px');
		prop = w.width() > 1640 && w.height()>=645 ? true : false; //1200보다 크면 파랄렉스 스크롤 적용됨, 모든 해상도 적용할려면 수치 조정 필요

		if (prop) {
			!scrollState && move();
            body.addClass('is-wheel');
		}else {
			window.removeEventListener(evtName, wheel, { passive: false });
			w.off("mousewheel DOMMouseScroll");
            body.removeClass('is-wheel');
			scrollState = false;
		}
	}).trigger('resize');
});
>>>>>>> 08ee6607157f4ad06df8c9f6ebb0a5c3748ca2ac
