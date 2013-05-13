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
		$('#results p.nomatch').remove();
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

		var select = "//match[@status='Played']"+filterDate+filterTeam+"/@date_utc[generate-id() = generate-id(key('ddates',.)[1])]";
		
		$('[name="mojdruhyselect"]', matchesXsl).attr('select', "//match[@status='Played'][@date_utc = $datenow]"+filterTeam);
		$('[name="mojselect"]', matchesXsl).attr('select', select);

		var x = new XSLTProcessor();
		x.importStylesheet(matchesXsl);
		displayMatches = x.transformToFragment(matchesXml, document);

		 
		var tables = $('matches table', $(displayMatches).children());

		tables.each(function()
		{	
			var rows = $('tr', this);
			rows.each(function()
			{
				var utcTime = $('.time', this).text();
				var utcT = utcTime.split(":");

				var userTime = new Date();
				userTime.setUTCHours(utcT[0]);
				userTime.setUTCMinutes(utcT[1]);

				$('.time', this).text(userTime.toLocaleTimeString().substr(0,5));

			});

		});


		if (tables.length > 0)
			$('#results').append(tables);

		else 
		{
			noMatchError = $('<p>', {
				"class" : "nomatch",
				text: "No matches to display"
			});
			$('#results').append(noMatchError);
		}


		$('#results button').click(function()
		{	
			var existingDiv = $('.matchDetails', $(this).parent());

			if (existingDiv.length == 0)
			{
				var newDiv = $('<div>',{
					"class" : "matchDetails",
					text: "Loading match info" 
				});
				$(this).after(newDiv);
				$('#results .matchDetails').slideUp();
				newDiv.slideDown();
				getMatchInfo($(this).val(), newDiv);

			}
			else 
			{
				$('#results .matchDetails').not(existingDiv).slideUp();
				existingDiv.slideToggle();
			}


		});

	}

	function getMatchInfo(matchId, appendant)
	{
		var returnElements;

		$.ajax({
		url: 'matchinfo.xsl',
		dataType: "xml"
		}).done(function(infoxsl)
		{
			var newxls = infoxsl;
			var select="//match[@match_id = " + matchId + "]";
			$('[name="matchpath"]', newxls).attr('select', select);

			var x = new XSLTProcessor();
			x.importStylesheet(newxls);
			returnElements  = x.transformToFragment(matchesXml, document);
			appendant.html(returnElements);

		}).fail(function() {
			var returnElements = $('<p>',
			{
				text: 'Error while loading match info',
				'class': 'error'
			});
			appendant.html(returnElements);
		
		});
		
	}




});