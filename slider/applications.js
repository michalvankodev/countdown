$(document).ready(function()
{
	// AJAX call for matches for slider

	var eventXml;
	//Define slider
	var slider = $('#myslider');
	// Slider options
	var sliderOptions = {
		speed: 500,
		slideMargin: 100,
		auto: true,
		autoHover: true,
		pause: 5000,
		pagerType: 'short',
		pagerSelector: '#sliderpager',
		nextSelector: '#slidernext',
		prevSelector: '#sliderprev',
		nextText: '>',
  		prevText: '<',
	};

	$.ajax('sliderdata.xml').done(function(data)
	{
		// to run it you'll need to use --allow-file-access-from-files flag ! (chrome)
		// get XML
		eventXml = $.parseXML(data);
		jxml = $('event', eventXml);
		
		// For first five elements make countdowns
		for (var i = 0; i < 5 && i < jxml.length; i++)
		{
			// divide text into separate strings
			var matchText = jxml.eq(i).text().trim().split('<BR>');
			
			// remove 'SOCCER:' from string
			var soccerpos = matchText[0].indexOf('SOCCER:');
			if ( soccerpos > -1)
			{
				matchText[0] = matchText[0].substr(soccerpos+7).trim();
			}

			//parse date
			var startDate = new Date(jxml.eq(i).attr('start'));
			var dateString = startDate.toLocaleString();
			var jsonDate = startDate.toJSON();


			// list item to add
			var $listItem = $('<div></div>',
			{
				'class': 'sliderinner',
			});
			// header with title of the match
			var $header = $('<h1></h1>', 
			{
				text: matchText[0],
			});

			//additional info
			var $info = $('<span></span>');
			if (matchText[1])
			{
				console.log('existuje');
				$info.text(matchText[1]);
			}
			else 
			{
				// make info empty element
				$info = $([]);
			}

			$time = $('<time></time>',
			{
				'datetime': jsonDate,
				text: 'Date: ' + dateString,
			});
			// create countdown div element and start countdown
			var $countdown = $('<div></div',
			{	
				'id': 'count'+i,
				'class': 'countdown',
			});

			// Text to display after countdown ends
			var $liveText = $('<a></a>',
			{
				html: 'LIVE ! <span class="info">Watch now</span>',
				'class': 'countdownlive',
				'href': '#',
			});

			// set options for countdown
			var cOptions =
			{
				dString: 'd',
			    hString: 'h',
			    mString: 'm',
			    sString: 's',
	            dStringSingle: 'd',
		        hStringSingle: 'h',
		        mStringSingle: 'm',
		        sStringSingle: 's',
		        dateTo: startDate,

		        // SET element to display after countdown ends
		        onCountDownEnd: function()
			    {
			    	$countdown.hide();
			    	$liveText.show();
			    }
			}
			// Start countdown
			$countdown.countdown('init', cOptions);

			// append elements to list
			$listItem.append($header, $info, $time, $countdown, $liveText);
			
			// add new match into slider
			slider.append($listItem);

		}
		$('.bxslider').bxSlider(sliderOptions);
	});
});
