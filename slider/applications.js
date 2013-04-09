// AJAX call for matches for slider
var xmlhttp = new XMLHttpRequest();
var eventXml;
xmlhttp.onreadystatechange = function()
{
	//We will use this condition if we had files running on web server
	// instead we'll use condition for local access
	// to run it you'll need to use --allow-file-access-from-files flag ! (chrome)
	//if (xmlhttp.readyState==4 && xmlhttp.status==200)
	if (xmlhttp.response != "")
	{

		eventXml = xmlhttp.responseXML;
		console.log(eventXml);
	}
}
xmlhttp.open("GET","sliderdata.xml",true);
xmlhttp.send();
eventXml.getElementsByTagName('events')[0].getElementsByTagName('event')[0].getAttribute("startDate");