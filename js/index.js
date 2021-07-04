var 
	MainMenu = $('.menu'),
	user_scroll_current = 0,
	Links = $('.menu .box .links'),
	Content = $('.content'),
	CurrentPage = 'history',
	MobileMenuState = false
;

(function($) 
{
	$(document).ready(function() 
	{
		SearhLinks();
		GoPage(CurrentPage, 100, 300);
		
		$('.menu .mobile .mbutton').click(function(e)
		{
			MobileMenu();
		});
		$('.blurBox').click(function(e)
		{
			if(MobileMenuState == true)
			{
				MobileMenu();
			}
		});
		$('.goUp').click(function(e)
		{
			if($('html, body').scrollTop() != 0)
			{
				$('html, body').animate(
				{
					scrollTop: 0
				}, 500);
			}
		});
	});
	
	$(window).resize(function() 
	{
		if(MobileMenuState == true)
		{
			MobileMenu();
		}
	});
	
	$(window).scroll(function()
	{
		var Top = $(this).scrollTop();
		if(Top > 300)
		{
			$('.goUp').css({
				'bottom':'60px',
				'opacity': '1',
				'transform': 'scale(1)'
			});
		}
		if(Top < 300)
		{
			$('.goUp').css({
				'bottom':'-80px',
				'opacity': '0',
				'transform': 'scale(0)'
			});
		}
		if(Top > 150)
		{
			if(user_scroll_current > Top)
			{
				if(MainMenu.attr('state') == 'hided')
				{
					MainMenu.attr('state','showed');
				}
			}
			else if(Top > user_scroll_current - 10) 
			{
				if(MainMenu.attr('state') == 'showed')
				{
					MainMenu.attr('state','hided');;
				}
			}
		}
		user_scroll_current = Top;
	});
	
})(jQuery);


function GoPage(link, timeS = 500, timeO = 500)
{
	CurrentPage = link;
	Update();
	$.ajax(
	{
		url: '/pages/' + link + '.html',
		cache: false,
		success: function(data) 
		{
			Content.css('opacity','0');
			if($('html, body').scrollTop() != 0)
			{
				$('html, body').animate(
				{
					scrollTop: 0
				}, 500);
			}
			if(MobileMenuState == true)
			{
				MobileMenu();
			}
			setTimeout(function()
			{
				Content.html(data);
				setTimeout(function()
				{
					Content.css('opacity','1');
				}, timeS);
			}, timeO);
		}
	});
}

function AddLink(obj)
{
	obj.click(function(e)
	{
		var page = $(this).attr('page');
		GoPage(page);
	});
}

function SearhLinks()
{
	Links.find('.link').each(function(e)
	{
		AddLink($(this));
	});
	
	Links.find('li').each(function(e)
	{
		AddLink($(this));
	});
}

function Update()
{
	Links.find('a , li').each(function(e)
	{
		var obj = $(this);
		if(obj.attr('page') == CurrentPage)
		{
			obj.attr('act','true');
			document.title = 'UTINKA - ' + obj.text();
		}
		else obj.attr('act','false');
	});
}

function MobileMenu()
{
	if(MobileMenuState == true)
	{
		$('.menu .mobile .mbutton i').text('menu');
		$('.menu .mobile .mbutton').css('margin-left','0px');
		$('.menu .box').attr('mob','false');
		$('.blurBox').attr('state','false');
		$('html, body').css('overflow','unset');
		MobileMenuState = false;
	}
	else
	{
		$('.menu .mobile .mbutton i').text('close');
		$('.menu .mobile .mbutton').css('margin-left','calc(100% - 60px)');
		$('.menu .box').attr('mob','true');
		$('.blurBox').attr('state','true');
		$('html, body').css('overflow','hidden');
		MobileMenuState = true;
	}
}

