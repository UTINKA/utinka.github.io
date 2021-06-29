var 
	MainMenu = $('.menu'),
	user_scroll_current = 0,
	Links = $('.menu .box .links'),
	Content = $('.content'),
	CurrentPage = 'history'
;

(function($) 
{
	$(document).ready(function() 
	{
		SearhLinks();
		GoPage(CurrentPage, 100, 300);
	});
	
	$(window).resize(function() 
	{
		
	});
	
	$(window).scroll(function()
	{
		var Top = $(this).scrollTop();
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

