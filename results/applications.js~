$(document).ready(function()
{
	$.ajax('seasons.xml').done(function(data)
	{
		var xml = data;
		$.ajax('xslt.xsl').done(function(xsldata)
		{
			var xsl = xsldata;
			
			
			
			
		}).fail(function()
		{
			var error = $('<p>',
			{
				text: 'Error while loading xslfile',
				'class': 'error'
			});
			
			$('#results').append(error);
		});
		
	}).fail(function() 
	{
		var error = $('<p>',
		{
			text: 'Error while loading matches',
			'class': 'error'
		});
		
		$('#results').append(error);
	});
});