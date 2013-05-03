$(document).ready(function()
{
	$.ajax({
	url: 'seasons.xml',
	dataType: "xml"
	}).done(function(data)
	{
		var seasonsXml = data;
		$.ajax({
		url: 'seasonsfilter.xsl',
		dataType: "xml"
		}).done(function(xsldata)
		{
			var seasonsXsl = xsldata;
			var xsltProcessor=new XSLTProcessor();
			xsltProcessor.importStylesheet(seasonsXsl);
			var resultDocument = xsltProcessor.transformToFragment(seasonsXml, document);
			$('#leagues').html(resultDocument);
			$('#leagues').change();
			
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
	
	$('#leagues').change(function()
	{
		var seasonId = $(this).val();
		$.ajax({
		url: 'http://ness-test.tutoky.com/get_matches&type=season&id='+ seasonId + '&detailed=yes.xml',
		dataType: 'xml'
		}).done(function(seasonData)
		{
			var matchesXml = seasonData;
			console.log(matchesXml);
			$.ajax({
			url: 'matches.xsl',
			dataType: 'xml'
			}).done (function(matchesData)
			{
				var matchesXsl = $.parseXML(matchesData);
				console.log(matchesXsl);
				console.log(matchesXml);
				var matchProc = new XSLTProcessor();
				matchProc.importStylesheet(matchesXsl);
				resultDocument = matchProc.transformToFragment(matchesXml, document);
				console.log(resultDocument);
				lolo =  $('team', $(resultDocument).children());
				
				lolo.each(function()
					{
						console.log($(this).text());
					});
				
				
			});

			
		}).fail(function()
		{
			var error = $('<p>',
			{
				text: 'Error while loading season file',
				'class': 'error'
			});
			
			$('#results').append(error);
		});
	});
});