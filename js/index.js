var 
	MainContent = $('.site .content_page'),
	MainMenu = $('.site .menu')
;

(function($) 
{
	$(document).ready(function() 
	{
		GoLink('history');
		MainMenu.find('.mlist').find('a').each(function(e)
		{
			ConnectMenuLinks($(this));
		});
		
		MainMenu.find('.blackbg').click(function(e)
		{
			var mVal = MainMenu.attr('state');
			if(mVal == 'true')
			{
				MainMenu.attr('state','false');
				MainContent.attr('statebl','false');
				MainMenu.find('.mbutton a').find('i').text('menu');
			}
		});
		MainMenu.find('.mbutton a').click(function(e)
		{
			var obj = $(this);
			var mVal = MainMenu.attr('state');
			if(mVal == 'false')
			{
				MainMenu.attr('state','true');
				MainContent.attr('statebl','true');
				obj.find('i').text('keyboard_arrow_left');
			}
			else if(mVal == 'true')
			{
				MainMenu.attr('state','false');
				MainContent.attr('statebl','false');
				obj.find('i').text('menu');
			}
		});
		
		setTimeout(function()
		{
			$('body .loader').attr('state','false');
		},1000);
	});
	
	$(window).resize(function() 
	{
		var mVal = MainMenu.attr('state');
		if(mVal == 'true')
		{
			MainMenu.attr('state','false');
			MainContent.attr('statebl','false');
			MainMenu.find('.mbutton a').find('i').text('menu');
		}
	});
	
	$(window).scroll(function()
	{	
		/*var top = $(this).scrollTop();
		var body_top = $('.header').offset().top-$('.header').height();
		if(body_top > -40) 
		{
			$('.menu').attr('state','active');
		}
		if(body_top < -40) 
		{
			$('.menu').attr('state','');
		}*/
	});
	
})(jQuery);

function ConnectClickMore(obj)
{
	var post = obj;
	// enter
	post.find('.image .more').click(function(e)
	{
		var state = post.find('.info').attr('show');

		if(state == null || state == 'false')
		{
			post.find('.up').css('opacity','0');
			post.find('.image .developers').css('opacity','0');
			post.find('.image .more').css('opacity','0');
			post.find('.image img').css('filter','blur(10px)');
			//
			post.find('.info').css({
				'z-index':'6',
				'top':'0'
			})
			post.find('.info').attr('show','true');
		}
		else if(state == 'true')
		{
			post.find('.up').css('opacity','1');
			post.find('.image .developers').css('opacity','1');
			post.find('.image .more').css('opacity','1');
			post.find('.image img').css('filter','blur(0px)');
			//
			post.find('.info').css({
				'z-index':'0',
				'top':'100%'
			})
			post.find('.info').attr('show','false');
		}
	});
	// exit
	post.find('.info .i_menu a').click(function(e)
	{
		var state = post.find('.info').attr('show');

		if(state == null || state == 'false')
		{
			post.find('.up').css('opacity','0');
			post.find('.image .developers').css('opacity','0');
			post.find('.image .more').css('opacity','0');
			post.find('.image img').css('filter','blur(10px)');
			//
			post.find('.info').css({
				'z-index':'6',
				'top':'0'
			})
			post.find('.info').attr('show','true');
		}
		else if(state == 'true')
		{
			post.find('.up').css('opacity','1');
			post.find('.image .developers').css('opacity','1');
			post.find('.image .more').css('opacity','1');
			post.find('.image img').css('filter','blur(0px)');
			//
			post.find('.info').css({
				'z-index':'0',
				'top':'100%'
			})
			post.find('.info').attr('show','false');
		}
	});
}

function GoLink(link)
{
	$.ajax(
	{
		url: '/pages/' + link + '.html',
		cache: false,
		success: function(data) 
		{
			MainContent.html(data);
			var mVal = MainMenu.attr('state');
			if(mVal == 'true')
			{
				MainMenu.attr('state','false');
				MainContent.attr('statebl','false');
				MainMenu.find('.mbutton a').find('i').text('menu');
			}
			if($('html, body').scrollTop() != 0)
			{
				$('html, body').animate(
				{
					scrollTop: 0
				}, 500);
			}
			$('.site .content_page .content .post').each(function(e)
			{
				var obj = $(this);
				ConnectClickMore(obj);
			});
		}
	});
}

function ConnectMenuLinks(obj)
{
	obj.click(function(e)
	{
		var page = obj.attr('page');
		GoLink(page);
	});
}