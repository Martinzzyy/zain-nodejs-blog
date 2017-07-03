;$(function(){
	function getUrl(){
		var url = window.location.href;
		if(url.indexOf('#') > 0){
			return url.split('#')[1];
		}else{
			return '';
		}
	};
	function setFind(find){
		var urlFind;
		if(!!find) urlFind = find;
		else urlFind = getUrl();
		var $a;
		if(!!urlFind){
			$('.left a').each(function(index,element){
				if($(element).attr('href').replace('#','') == urlFind){
					$a = $(element);
				}
			});
		}else{
			$a = $('.left a').first();
		}
		$('.left a').each(function(index,element){
			var $ul = $(element).next().next();
			if($ul.length > 0){
				$ul.slideUp("fast",function(){
					$(element).parent().removeClass('find-li');
					$(element).next().attr('src','/images/arrow-left.png')
						.removeClass('find-img')
						.addClass('nofind-img');
				});
			}else{
				$(element).parent().removeClass('find-li');
				$(element).next().attr('src','/images/arrow-left.png')
					.removeClass('find-img')
					.addClass('nofind-img');
			}
		});
		var $ul = $a.next().next();
		if($ul.length > 0){
			$ul.slideDown("fast",function(){
				$a.parent().addClass('find-li');
				$a.next().attr('src','/images/arrow-down.png')
					.removeClass('nofind-img')
					.addClass('find-img');
			});
		}else{
			$a.parent().addClass('find-li');
			$a.next().attr('src','/images/arrow-down.png')
				.removeClass('nofind-img')
				.addClass('find-img');
		}
		setSize();
	}
	setFind();
	function setSize(){
	    var $content = $('.content'),
			$iframe = $('.iframeContent'),
            $left = $('.left');
        
	    $content.height($(window).height() - 80);
	    var $contentHei = $content.height(),
			$contemtWid = $content.width();
	    $left.height($contentHei);
	    $(".header>.bg-img>img").height(91);
	    $("body>.bg-img>img").height($contentHei + 91);
	    $iframe.height($contentHei).width($contemtWid - $left.width());
	};
	setSize();
	$(window).resize(setSize);
	$('.left a').click(function(){
		setFind($(this).attr('href').replace('#',''));
	});
	$('.children-menu>li').click(function(){
		var url = $(this).attr('url');
		if (!!url) {
		    var $iframe = $('.iframeContent');
		    $('.children-menu li').removeClass('find-menu');
		    $(this).addClass('find-menu');
		    $('.iframeContent').attr('src', url).show();
		    setSize();
		}
	})
});
