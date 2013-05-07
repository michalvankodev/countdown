$(document).ready(function()
{
	var myMatches;
	var seasonsXml;
	var matchesXml
	var matchesXsl;
	$.ajax({
	url: 'seasons.xml',
	dataType: "xml"
	}).done(function(data)
	{
		 seasonsXml = data;
		$.ajax({
		url: 'seasonsfilter.xsl',
		dataType: "xml"
		}).done(function(xsldata)
		{
			var seasonsXsl = xsldata;
			var xsltProcessor=new XSLTProcessor();
			xsltProcessor.importStylesheet(seasonsXsl);
			var mySeason = xsltProcessor.transformToFragment(seasonsXml, document);
			$('#leagues').html(mySeason);
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
			matchesXml = seasonData;
			console.log(matchesXml);
			$.ajax({
			url: 'matches.xsl',
			dataType: 'xml'
			}).done (function(matchesData)
			{
				matchesXsl = matchesData;
				var matchProc = new XSLTProcessor();
				matchProc.importStylesheet(matchesXsl);
				myMatches = matchProc.transformToFragment(matchesXml, document);
				var teams =  $('teams > team', $(myMatches).children());
				var teamsToAppend = '<option value="all"> all </option>';

				teams.each(function()
				{
					teamsToAppend += '<option value="' + $(this).text() + '"> '+ $(this).text() + '</option>';
				});
				$('#team').html(teamsToAppend);

				var dates = $('dates > date', $(myMatches).children());

				var datesToAppend = '<option value="all"> Select date </option>';
				dates.each(function ()
				{
					datesToAppend += '<option value="' + $(this).text() + '"> '+ $(this).text() + '</option>';

				});
				$('#date').html(datesToAppend);
				$('#date').change();
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
	$('#team').change(function ()
	{
		showMatches();
	});
	$('#date').change(function ()
	{
		showMatches();
	});

	function showMatches()
	{

		$('#results > table').remove();
		var filterTeam = '';
		var filterDate = '';
		var selectedTeam = $('#team').val();
		var selectedDate = $('#date').val();

		if (selectedTeam != '' && selectedTeam != 'all')
		{
			filterTeam = "[@team_A_name = '"+ selectedTeam +"' or @team_B_name = '"+ selectedTeam +"']";
		}

		if (selectedDate != '' && selectedDate != 'all')
		{
			filterDate = "[@date_utc = '"+ selectedDate +"']";
		}

		var select = "//match[@status='Played']"+filterTeam+filterDate+"/@date_utc[generate-id() = generate-id(key('ddates',.)[1])]"

		console.log(matchesXsl);
		$('variable[name="mojselect"]', matchesXsl).attr('select', select);

		console.log(matchesXml);
		newXml = matchesXml;
		console.l
		console.log(matchesXsl);
		var x = new XSLTProcessor();
		x.importStylesheet(matchesXsl);
		displayMatches = x.transformToFragment(newXml, document);

		 
		console.log(displayMatches);
		var tables = $('matches table', $(displayMatches).children());

		console.log(tables);
		$('#results').append(tables);
		

	}
});