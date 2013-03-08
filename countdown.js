// countdown script

// allows to run script for 10 seconds
var tenSeconds = new Date();
tenSeconds.setTime(+5);

(function( $ ) {
  $.fn.countdown = function(inDate, onCountDownEnd, onCountDownChange) {
    var inTime = Date.parse(inDate);
    var time = Date.parse(new Date());
    var divs, count, live;
    var $content = $(this);
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
        if (onCountDownEnd && typeof(onCountDownEnd) === "function") 
        {  
          onCountDownEnd();  
        }  
        clearInterval(interval);
      }
      if (onCountDownChange && typeof(onCountDownChange) === "function") 
        {  
          onCountDownChange();  
        }  
    }

  }
})( jQuery );

function getDivs(d, h, m, s)
{
  if (d.toString().length == 1) this.daysZero = '0'; else this.daysZero = '';
  if (h.toString().length == 1) this.hoursZero = '0'; else this.hoursZero = '';
  if (m.toString().length == 1) this.minsZero = '0'; else this.minsZero = '';
  if (s.toString().length == 1) this.secsZero = '0'; else this.secsZero = '';

  if (d == 1) this.dText='day'; else this.dText='days';
  if (h == 1) this.hText='hour'; else this.hText='hours';
  if (m == 1) this.mText='min'; else this.mText='mins';
  if (s == 1) this.sText='sec'; else this.sText='secs';

  this.daysDiv = '<div class="cd-digit">'+ this.daysZero + d +'<span class="cd-info">'+ this.dText +'</div>';
  this.hoursDiv = '<div class="cd-digit">'+ this.hoursZero + h +'<span class="cd-info">'+ this.hText +'</div>';
  this.minsDiv = '<div class="cd-digit">'+ this.minsZero + m +'<span class="cd-info">'+ this.mText +'</div>';
  this.secsDiv = '<div class="cd-digit-right cd-digit">'+ this.secsZero + s +'<span class="cd-info">'+ this.sText +'</div>';
  return this.daysDiv + this.hoursDiv + this.minsDiv + this.secsDiv;
}

function countTimes(timeTo)
{
  this.days = parseInt( timeTo / (1000*60*60*24) ); // time / oneDay
  this.hours = parseInt( (timeTo-this.days*(1000*60*60*24)) / (1000*60*60) ); // ... oneHour
  this.mins = parseInt( (timeTo-this.days*(1000*60*60*24)-this.hours*(1000*60*60)) / (1000*60) );  //  ... oneMin
  this.secs = parseInt( (timeTo-this.days*(1000*60*60*24)-this.hours*(1000*60*60)-this.mins*(1000*60)) / 1000 ); // ... oneSec
}

function getLive(link, divId)
{
  console.log(divId);
  $(divId).html('<a href="'+ link +'"><h3>Live coverage now on</h3><p>click here to listen to live commentary</p></a>');
}
