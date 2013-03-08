// countdown script

// allows to run script for 10 seconds
var tenSeconds = (Date.parse(new Date())+10000)/1000;

countdown = function(getTime)
{

}


var timeTo;
var days;
var hours;
var mins;
var secs;
var matchTime;
var CD
function runCountdown(getTime)
{
 matchTime = getTime*1000; // javascript parse function returns Unix timestamp in microseconds
 
 CD = setInterval(count,1000);
 count();  
}

function count()
{
  var counter = countTimer(matchTime);
  if (counter)
    returnCounter();
  else 
    returnLive();  
}

function countTimer(getTime)
{
  var time = Date.parse(new Date());
  timeTo = getTime - time;
  if (timeTo > 0)
  {
  days = parseInt( timeTo / (1000*60*60*24) ); // time / oneDay
  hours = parseInt( (timeTo-days*(1000*60*60*24)) / (1000*60*60) ); // ... oneHour
  mins = parseInt( (timeTo-days*(1000*60*60*24)-hours*(1000*60*60)) / (1000*60) );  //  ... oneMin
  secs = parseInt( (timeTo-days*(1000*60*60*24)-hours*(1000*60*60)-mins*(1000*60)) / 1000 ); // ... oneSec
  
  console.log(days);
  console.log(hours);
  console.log(mins);
  console.log(secs);
  return 1;
  }
  else 
  {
    return 0;
  }
}

function returnCounter()
{
  if (days.toString().length == 1) daysZero = '0'; else daysZero = '';
  if (hours.toString().length == 1) hoursZero = '0'; else hoursZero = '';
  if (mins.toString().length == 1) minsZero = '0'; else minsZero = '';
  if (secs.toString().length == 1) secsZero = '0'; else secsZero = '';


  document.getElementById("cd-days").innerHTML = daysZero + days;
  document.getElementById("cd-hours").innerHTML = hoursZero + hours;
  document.getElementById("cd-mins").innerHTML = minsZero + mins;
  document.getElementById("cd-secs").innerHTML = secsZero + secs;  
}

function returnLive()
{
  window.clearInterval(CD);
  document.getElementById("countdown-inner").style.display="none";
  document.getElementById("countdown-live").style.display="block";
}