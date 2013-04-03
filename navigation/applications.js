$(document).ready( function()
{
	$('#mynavigation > div > ul > li').click(function()
	{
		$('ul', this).slideToggle(200);
		//$('ul', this).toggleClass('open');
		$(this).toggleClass('opened');
	});
	$('#mynavigation #expand').click(function()
	{
		if ($(this).attr('id') == 'expand')
		{
			// OPEN all elements
			$('#mynavigation > div > ul > li > ul').slideDown(200);
			//$('#mynavigation > div > ul > li > ul').addClass('open');
			$('#mynavigation > div > ul > li').addClass('opened');

			// Set button for collapse
			$(this).html('Collapse all');
			$(this).attr('id', "collapse");
		}
		else if ($(this).attr('id') == 'collapse')
		{
			//Close all elements
			$('#mynavigation > div > ul > li > ul').slideUp(200);
			//$('#mynavigation > div > ul > li > ul').removeClass('open');
			$('#mynavigation > div > ul > li').removeClass('opened');

			// Set button for expand
			$(this).html('Expand all');
			$(this).attr('id', "expand");
		}

	});

})