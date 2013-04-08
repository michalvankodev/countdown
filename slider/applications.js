// AJAX call for matches for slider
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function()
{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		var eventXml = xmlhttp.responseXML;
		console.log(eventXml);
	}
}
xmlhttp.open("GET","http://www.livesport.tv/streaming/eventList/0,,14976,00.html?partnerId=4044&days=10&showCompletedEvents=false",true);
xmlhttp.send();