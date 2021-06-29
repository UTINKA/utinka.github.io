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
});


    