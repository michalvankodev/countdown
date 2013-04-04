$(document).ready( function()
{
	// Toggle drop menus in main navigation
	$('#mynavigation > div > ul > li').click(function()
	{
		$('ul', this).slideToggle(200);
		//$('ul', this).toggleClass('open');
		$(this).toggleClass('opened');
	});

	// Expand and Collapse all functions
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

	// Searchbox function
	// On every keystroke finds if element is in his child elements
	// If is - show (expand)!
	$('#mynavigation #searchbox').keyup(function()
	{
		var search = '';
		search = $(this).val();
		// expanded reset
		$('#mynavigation > div > ul > li > ul > li').each(function ()
		{
			$(this).parent().parent().data('expanded', false);
		});

		if(search != "" || search == "Search")
		{
			$('#mynavigation > div > ul > li > ul > li').each(function ()
			{
				if ($(this).text().toLowerCase().indexOf(search) > -1)
				{
					$(this).slideDown(150);
					$(this).parent().slideDown(200);
					$(this).parent().parent().addClass('opened');
					$(this).parent().parent().data('expanded', true);
				}
				else 
				{
					$(this).slideUp(150);
					if(!$(this).parent().parent().data('expanded'))
					{
						$(this).parent().slideUp(200);
						$(this).parent().parent().removeClass('opened');
					}
				}
			});
		}
		else 
		{
			// if search is cleared collapse all items
			// if open all links there were hidden
			$('#mynavigation > div > ul > li > ul > li').slideDown(150);
			$('#mynavigation > div > ul > li > ul').slideUp(200);
			$('#mynavigation > div > ul > li').removeClass('opened');
			
		}
	});

});