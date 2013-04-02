$(document).ready( function()
{
	$('#mynavigation > ul > li').click(function()
	{
		$('ul', this).slideToggle(200);
		$('ul', this).toggleClass('open');
		$(this).toggleClass('opened');

		
	});
	
})