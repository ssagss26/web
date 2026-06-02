// Scroll Move
function scrollMove(t,h) {
	'use strict';
	if(h==undefined) h=0;
	var o = $('html,body');
	o.animate({
		scrollTop:$(t).offset().top-h
	},400);
}

// Menu Open
function menuOpen(o){
	"use strict";
	var o = $(o).attr('id'),
		a = -$(window).scrollTop();
	$('#wrap').css('top',a);
	$('#'+o).before('<a class="dim" onclick="menuClose('+o+');"><i class="sr-only">close</i></a>');
	$('body').addClass('nav-open');
	setTimeout(function  () {
		$('#'+o).show(0,function(){
			$('body').addClass(o+'-open');
		});
	},300);
}

// Menu Close
function menuClose(o){
	'use strict';
	var o = $(o).attr('id'),
		originScroll = -$('#wrap').position().top;
	$('body').removeClass(o+'-open').find('.dim').remove();
	setTimeout(function(){
		$('#'+o).hide();
		$('body').removeClass('nav-open');
		if (originScroll != -0) {
			$(window).scrollTop(originScroll);
		}
		$('#wrap').removeAttr('style');
	},300);
}


jQuery(function ($) {
	'use strict';
	var $window = $(window),
		$hd = $('#hd'),
		$gnb = $('#gnb'),
		$wrap = $('#wrap'),
		$body = $('body'), tD = 80;

	$('.animated').addClass('ani-stop');

	var scrollSection = function (){
		$wrap.find('.px-motion').each(function(){
			var t = $(this);
			var tT = t.offset().top;
			var tH = t.innerHeight();
			var sT = $window.scrollTop();
			var wH = $window.height();

			if(t.attr('data-delay')){
				tD = t.attr('data-delay');
			}
			if(tT-wH<sT-tD && tT+tH>sT){
				t.find('.animated').removeClass('ani-stop');
			} else {
				t.find('.animated').addClass('ani-stop');
			}
		});
	}

	$window.scroll(function(){
		if ($(this).scrollTop() > 0) {
			$body.addClass('is-scroll');
		}else {
			$body.removeClass('is-scroll');
		}
		if ($('.px-motion').length) {
			scrollSection();
		}
	}).trigger('scroll');

	$('.js-btn-scroll').on('click',function(){
		scrollMove($(this).attr('href'), $(this).attr('data-offset'));
		return false;
	});

	// gnb
	var $dep = $gnb.find('.nav-item');

	var depHide = function () {
		$hd.removeClass('open');
		$dep.removeClass('on');
	}

	$('.js-mn').click(function  () {
		$body.hasClass('nav-open') ? menuClose(gnb) : menuOpen(gnb);
	});

	$dep.children('a').on('focus',function(e){
		!$hd.hasClass('open') && $hd.addClass('open')
		$(this).parent().addClass('on').siblings().removeClass('on');
		e.stopPropagation();
	});

	$gnb.on({
		'mouseenter': function(){
			$hd.addClass('open');
		},
		'mouseleave': function(){
			depHide();
		}
	});

	$dep.on('mouseenter', function(){
		$(this).addClass('on').siblings().removeClass('on');
	});


	$('.btn-depth').click(function(){
		var target = $(this).parent();
		target.toggleClass('open').find('.depth').slideToggle(200);
		$gnb.find('.open').not(target).removeClass('open').find('.depth').slideToggle(200);
	});

	$('.util>a:first-child, .hd-logo>a').focus(depHide);
});
function fileuploadbasic(obj){

 	var thisId = $("#"+obj).attr('id');  
 	data = new FormData();
	$("#"+thisId+"_loding").show();
 
	data.append("editorFile",$("input[name="+obj+"]")[0].files[0]); 
	$.ajax({
		data: data,
		type: "POST",
		url: "/_lib/file_upload2.php",
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
				$("i#"+thisId).hide(); 
				var obj =  JSON.parse(data);

				console.log(obj);

				if (obj.success) {
 					$("#"+thisId+"_val").val(obj.save_filen);
					$("#"+thisId+"_val2").val(obj.save_url);
					$("#"+thisId+"_val3").val(obj.save_orgfilen);
					$("#attach-file").show();
					$("#attach-file").attr("src",obj.save_url);

 				} else {
					switch(parseInt(obj.error)) {
						case 1: alert('업로드 용량 제한에 걸렸습니다.'); break; 
						case 2: alert('MAX_FILE_SIZE 보다 큰 파일은 업로드할 수 없습니다.'); break;
						case 3: alert('파일이 일부분만 전송되었습니다.'); break;
						case 4: alert('파일이 전송되지 않았습니다.'); break;
						case 6: alert('임시 폴더가 없습니다.'); break;
						case 7: alert('파일 쓰기 실패'); break;
						case 8: alert('알수 없는 오류입니다. 용량을 확인해 주시기 바랍니다. 2메가 이상은 올릴 수 없습니다.'); break;
						case 100: alert('jpeg 이미지 파일이 아닙니다.(jpeg 만 올리실 수 있습니다.)'); break; 
						case 101: alert('이미지 파일이 아닙니다.(jpeg, jpg, gif, png 만 올리실 수 있습니다.)'); break; 
						case 102: alert('0 byte 파일은 업로드 할 수 없습니다.'); break; 
				}
			}

		$("#"+thisId+"_loding").hide();


		}
	}); 


}
function fileuploadbasic2(obj){

 	var thisId = $("#"+obj).attr('id');  
 	data = new FormData();
	$("#"+thisId+"_loding").show();
 
	data.append("editorFile",$("input[name="+obj+"]")[0].files[0]); 
	$.ajax({
		data: data,
		type: "POST",
		url: "/_lib/file_upload.php",
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
				$("i#"+thisId).hide(); 
				var obj =  JSON.parse(data);

				if (obj.success) {
 					$("#"+thisId+"_val").val(obj.save_filen);
					$("#"+thisId+"_val2").val(obj.save_url);
					$("#"+thisId+"_val3").val(obj.save_orgfilen);
					$(".attach-file").show();
					$("#attachfilename").html(obj.save_orgfilen);

 				} else {
					switch(parseInt(obj.error)) {
						case 1: alert('업로드 용량 제한에 걸렸습니다.'); break; 
						case 2: alert('MAX_FILE_SIZE 보다 큰 파일은 업로드할 수 없습니다.'); break;
						case 3: alert('파일이 일부분만 전송되었습니다.'); break;
						case 4: alert('파일이 전송되지 않았습니다.'); break;
						case 6: alert('임시 폴더가 없습니다.'); break;
						case 7: alert('파일 쓰기 실패'); break;
						case 8: alert('알수 없는 오류입니다. 용량을 확인해 주시기 바랍니다. 2메가 이상은 올릴 수 없습니다.'); break;
						case 100: alert('이미지 파일이 아닙니다.(jpeg, jpg, gif, png 만 올리실 수 있습니다.)'); break; 
						case 101: alert('이미지 파일이 아닙니다.(jpeg, jpg, gif, png 만 올리실 수 있습니다.)'); break; 
						case 102: alert('0 byte 파일은 업로드 할 수 없습니다.'); break; 
				}
			}

		$("#"+thisId+"_loding").hide();


		}
	}); 


}
 function filedelbasic2(obj){

 	var thisId = $("#"+obj).attr('id');  


 	$("#"+thisId+"_val").val("");
	$("#"+thisId+"_val2").val("");
	$("#"+thisId+"_val3").val("");
	$(".attach-file").hide();
	$("#attachfilename").html("");


 

}


