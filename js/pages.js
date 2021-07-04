$('.post').each(function(e)
{
	var obj = $(this);
	var img = '../' + obj.find('.img').attr('src');
	obj.find('.img div').css({
		'background': 'url(' + img + ')',
		'background-attachment': 'inherit',
		'background-position': 'center',
		'background-size': 'cover',
		'background-repeat': 'no-repeat'
	});
	
	// add links
	obj.find('.title .bottom .category label').each(function(e)
	{
		$(this).click(function(e)
		{
			var page = $(this).attr('page');
			GoPage(page);
		});
	});
});



    