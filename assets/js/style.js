$(document).ready(function () {
  //Menu
  let a = true;
  $('#btn-click').click(function () {
    if (a == true) {
      $('.menudt1').slideDown();
      a = false;
    }
    else {
      $('.menudt1').slideUp();
      a = true;
    }
  });

  //js cua da dang san pham

  // $('.trai .dadang').hover(function(){
  //   $('.sndg').slideDown(300);
  // },function(){
  //   $('.sndg').slideUp(300);
  // })


  //js cua loadthem
  $(function () {
    $(".sp1").slice(0, 1).addClass('display');
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".sp1:hidden").slice(0, 1).addClass('display');
        if ($(".sp1:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
});


$('a[href=#top]').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});
$('a[href=#top]').click(function () {
  $('body,html').animate({
      scrollTop: 0
  }, 600);
  return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});






  //
})
// button dang hinh//
$(".btn").bind("click", function(){
	$("#inp").click();
});
//het button dang hin//
//Login
$(':input[type=number]').on('mousewheel', function (e) {
  $(this).blur();
}); $(':input[type=number]').on('mousewheel', function (e) {
  $(this).blur();
}); $(':input[type=number]').on('mousewheel', function (e) {
  $(this).blur();
}); $(':input[type=number]').on('mousewheel', function (e) {
  $(this).blur();
});
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  var $this = $(this),
    label = $this.prev('label');

  if (e.type === 'keyup') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.addClass('active highlight');
    }
  } else if (e.type === 'blur') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.removeClass('highlight');
    }
  } else if (e.type === 'focus') {

    if ($this.val() === '') {
      label.removeClass('highlight');
    }
    else if ($this.val() !== '') {
      label.addClass('highlight');
    }
  }
});

$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);

});
//affix//
$('.menuan').affix({
  offset: {
    top: 190
  }
});





















$('section.awSlider .carousel').carousel({
	pause: "hover",
  interval: 20
});

var startImage = $('section.awSlider .item.active > img').attr('src');
$('section.awSlider').append('<img src="' + startImage + '">');

$('section.awSlider .carousel').on('slid.bs.carousel', function () {
 var bscn = $(this).find('.item.active > img').attr('src');
	$('section.awSlider > img').attr('src',bscn);
});


/*
Philips ambilight tv
Üzerine gleince duruyor slide
*/








///Author: Lorenzo Macchiavelli
///lmacchiavelli@gmail.com
var sliderExpand = {
	init:function(id,dividi,expand){
		var cur = $(".slider_expand_id"+id);
		for ( var x = 1; x < 20 ; x++ ){
			cur.removeClass('divide_'+x);
		}
		cur.addClass('divide_' + dividi);
		this.boxSize(cur,dividi);
		this.controlli(cur);
		this.overItem(cur);
	},
	resize:function(id,dividi){
		cur = $(".slider_expand_id"+id);
		for ( var x = 1; x < 20 ; x++ ){
			cur.removeClass('divide_'+x);
		}
		cur.addClass('divide_' + dividi);
		this.boxSize(cur,dividi);
	},
	overItem:function(id){
		id.mouseout(function(){
			sliderExpand.itemOpacity(id,'',false);
		});
		id.find('.item').each(function(){
			$(this).mouseover(function(){
				sliderExpand.expandItem($(this),id);
				sliderExpand.itemOpacity(id,$(this).index(),true);
			});
			$(this).mouseout(function(){
				sliderExpand.closeItem($(this),id);
			});
		});
	},
	itemOpacity:function(id,tindex,stat){
		if(stat){
			$(id).find('> div > .item').each(function(e){
				if(e==tindex){
					$(this).css('opacity','1');
				}else{
					$(this).css('opacity','.5');
				}
			});
		}else{
			$(id).find('> div > .item').css('opacity','1');
		}
	},
	expandItem:function(id,idOuter){
		var finalW = id.find('img').width();
		id.width(finalW);
		this.moveLast(id,idOuter);
	},
	closeItem:function(id,idOuter){
		a = this.itemSize(idOuter,this.divisione(idOuter));
		id.width(a[1]);
		this.reset(idOuter);
	},
	reset:function(idOuter){
		idOuter.find('.muovi').css('margin-left','0px');
	},
	moveLast:function(id,idOuter){
		var lastItem = this.divisione(idOuter);
		var curItem = id.index()+1;
		var finalW = id.find('img').width();
		var ItemWidth = this.itemSize(idOuter,this.divisione(idOuter));
		var gap = finalW - ItemWidth[1];
		if(curItem==lastItem){
			idOuter.find('.muovi').css('margin-left','-'+gap+'px');
		}
	},
	boxSize:function(id, dividi){
		a = this.itemSize(id,dividi);
		$(id).find('> div > .item').each(function(){
			$(this).width(a[1]);
		});
	},
	itemSize:function(id,dividi){
		var ww = id.width();
		var itemW = ww / dividi;
		return [ww,itemW];
	},
	controlli:function(id){
		a = id.find('.controlli');
		h = a.height();
		topOffset = (id.height() / 2 - h / 2)- 42 ;
		a.css("top",topOffset+'px');
		this.moveSlideSet(id);
	},
	moveSlideSet:function(id){
		id.find('.controlli > div').click(function(event){
				sliderExpand.moveDirection($(this).attr('class'),id);
				event.stopPropagation();
		});
	},
	moveDirection:function(direction,idOuter){
		var target = idOuter.find('.muovi');
		target.finish();
		target.removeClass('animationA');
		var step = this.itemSize(idOuter,this.divisione(idOuter))[1];
		var a = 0;
		if(direction=='next_btn'){
			a = -step;
		}
		if(direction=='back_btn'){
			target.find('.item:last').addClass("last");
			target.find('.item:last').prependTo(target);
			target.css('left','-'+step+'px');
		}
		target.animate({
			'left': a
		},240,function(){
			if(direction=='next_btn'){
				target.find('.item:first').appendTo(target);
				target.attr('style','');
			}
			if (navigator.userAgent.indexOf('Safari') && !navigator.userAgent.indexOf('Chrome')) {

			}else {
    			target.addClass('animationA');
			}
		});
	},
	divisione:function(idOuter){
		return idOuter.attr('class').slice(-1);
	}
};

///SLIDER END
function sliderResize(){
  var ws = $(window).width();
  var dividi = 4;
  var espandi= 1;
  if(ws<600){
    dividi = 3;
  }
  if(ws<450){
    dividi = 2;
  }
  return [ws,dividi]
}
function sliderInit(){
	a = sliderResize();
	$('.slider_gallery_expand').each(function(e){
		$(this).addClass("slider_expand_id"+e);
		sliderExpand.init(e,a[1],'');
	});
}
$(document).ready(function(){
	sliderInit();
});
// $(window).resize(function(){
// 	a = sliderResize();
//    $('.slider_gallery_expand').each(function(e){
// 			sliderExpand.resize(e,a[1]);
// 	});
// });
//SLIDER END

$(document).ready(function(){
  $('#btnTest').click(function(){
    alert('Hello');
  });
  //Upload IMG
  $('input[type=file]').on("change", function() {
    var $files = $(this).get(0).files;

    if ($files.length) {

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Please select a smaller file");
        return false;
      }

      // Begin file upload
      console.log("Uploading file to Imgur..");

      // Replace ctrlq with your own API key
      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = 'faef2b533303522';

      var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: 'Client-ID ' + apiKey,
          Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
      };

      var formData = new FormData();
      formData.append("image", $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function(response) {
        var obj = JSON.parse(response);
        $('#demo').html(obj.data.link);
      });
    }
  });
})
