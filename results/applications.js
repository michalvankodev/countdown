$(document).ready(function()
{
	$.ajax('seasons.xml').done(function(data)
	{
		var seasonsXml = $.parseXML(data);
		$.ajax('seasonsfilter.xsl').done(function(xsldata)
		{
			var seasonsXsl = $.parseXML(xsldata);
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
		$.ajax('http://ness-test.tutoky.com/get_matches&type=season&id='+ seasonId + '&detailed=yes.xml').done(function(seasonData)
		{
			shit = seasonData;
			var matchesXml = shit;
			console.log(matchesXml);
			$.ajax('matches.xsl').done (function(matchesData)
			{
				var matchesXsl = $.parseXML(matchesData);
				console.log(matchesXsl);
				console.log(matchesXml);
				var matchProc = new XSLTProcessor();
				matchProc.importStylesheet(matchesXsl);
				 resultDocument = matchProc.transformToFragment(matchesXml, document);
				console.log(resultDocument);
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