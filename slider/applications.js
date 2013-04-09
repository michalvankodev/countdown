$(document).ready(function()
{
	// AJAX call for matches for slider
	var xmlhttp = new XMLHttpRequest();
	var eventXml;
	//Define slider
	var slider = $('#myslider');
	// Slider options
	var sliderOptions = {
		speed: 300,
		slideMargin: 100,
		auto: true,
		autoHover: true,
		pause: 5000,
		pagerType: 'short',
		pagerSelector: '#sliderpager',
		nextSelector: '#slidernext',
		prevSelector: '#sliderprev',

	};

	xmlhttp.onreadystatechange = function()
	{
		//We will use this condition if we had files running on web server
		// instead we'll use condition for local access
		// to run it you'll need to use --allow-file-access-from-files flag ! (chrome)
		//if (xmlhttp.readyState==4 && xmlhttp.status==200)
		if (xmlhttp.response != "" && xmlhttp.responseXML != null)
		{

			eventXml = xmlhttp.responseXML;
			jxml = $('event', eventXml);
			
			for (var i = 0; i < 5 && i < jxml.length; i++)
			{
				slider.html(slider.html() + "<li><div style='height: 50px;'>" + jxml.eq(i).attr('startDate') + "</div></li>");
				
			}
			$('.bxslider').bxSlider(sliderOptions);
		}
	}
	xmlhttp.open("GET","sliderdata.xml",true);
	xmlhttp.send();

});
