// countdown script

// allows to run script for 10 seconds
var tenSeconds = new Date();
tenSeconds.setTime(+5);

(function( $ ) {
  $.fn.countdown = function(inDate, liveLink) {
    var inTime = Date.parse(inDate);
    var time = Date.parse(new Date());
    var divs, count, live;
    $content = $(this);
    var interval = setInterval(loop, 1000);

    loop();
    function loop()
    {
      time = Date.parse(new Date());
      var timeTo = inTime - time;

      if (timeTo > 0)
      {
        count = new countTimes(timeTo);
        divs = getDivs(count.days, count.hours, count.mins, count.secs);
        $content.html(divs);
      }
      else
      {
        live = getLive(liveLink);
        $content.html(live);
        clearInterval(interval);
      }
    }

  }
})( jQuery );

function getDivs(d, h, m, s)
{
  this.daysDiv = '<div class="daysDiv">'+d+'</div>';
  this.hoursDiv = '<div class="hoursDiv">'+h+'</div>';
  this.minsDiv = '<div class="minsDiv">'+m+'</div>';
  this.secsDiv = '<div class="secsDiv">'+s+'</div>';
  return this.daysDiv + this.hoursDiv + this.minsDiv + this.secsDiv;
}

function countTimes(timeTo)
{
  this.days = parseInt( timeTo / (1000*60*60*24) ); // time / oneDay
  this.hours = parseInt( (timeTo-this.days*(1000*60*60*24)) / (1000*60*60) ); // ... oneHour
  this.mins = parseInt( (timeTo-this.days*(1000*60*60*24)-this.hours*(1000*60*60)) / (1000*60) );  //  ... oneMin
  this.secs = parseInt( (timeTo-this.days*(1000*60*60*24)-this.hours*(1000*60*60)-this.mins*(1000*60)) / 1000 ); // ... oneSec
}

function getLive(link)
{
  return '<a href="'+ link +'"><h3>Live coverage now on</h3><p>click here to listen to live commentary</p></a>';
}



function runCountdown(getTime)
{
 matchTime = getTime*1000; // javascript parse function returns Unix timestamp in microseconds
 
 CD = setInterval(count,1000);
 count();  
}