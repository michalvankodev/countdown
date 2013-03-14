(function (window, document, $) {
  'use strict';

  /**
   * Countdown jQuery plugin
   *
   * Sample Usage:
   *
   * $('.countdown').countdown();
   * $('.countdown').countdown('destroy');
   *
   * @method
   * @customOptions
   *
   * @return   {object}
   */
  $.fn.extend({
    countdown: function (method, customOptions) {
      var $content = $(this);
      var options = 
      {
        dateTo: new Date(new Date().getTime()+15000),
        dString: 'days',
        hString: 'hours',
        mString: 'mins',
        sString: 'secs',

        dStringSingle: 'day',
        hStringSingle: 'hour',
        mStringSingle: 'min',
        sStringSingle: 'sec',

        onCountDownEnd: false,
        onCountDownChange: false,
      };

      var methods;

      options = $.extend(options, customOptions);

      methods = {
        /**
        * initializing function
        */
        init : function () {
          return this.each(function () { // Maintaining Chainability
          loop();
        
          });
        },

        /**
        * destroy function
        */
        destroy : function () {

        }
      };

      //FUNCTIONS 
      function loop()
      {
        var time = Date.parse(new Date());
        var inTime = Date.parse(options.dateTo);
        var timeTo = inTime - time;
        if (timeTo > 0)
        {
          var count = new countTimes(timeTo);
          var divs = getDivs(count.days, count.hours, count.mins, count.secs);
          $content.html(divs);
          setTimeout(loop, 1000);
        }
        else
        {
          if (options.onCountDownEnd && typeof(options.onCountDownEnd) === "function") 
          {  
            options.onCountDownEnd();  
          }  
        }
        if (options.onCountDownChange && typeof(options.onCountDownChange) === "function") 
          {  
            options.onCountDownChange();  
          }  
      }

      function getDivs(d, h, m, s)
      {
        if (d.toString().length == 1) var daysZero = '0'; else var daysZero = '';
        if (h.toString().length == 1) var hoursZero = '0'; else var hoursZero = '';
        if (m.toString().length == 1) var minsZero = '0'; else var minsZero = '';
        if (s.toString().length == 1) var secsZero = '0'; else var secsZero = '';

        if (d == 1) var dText=options.dStringSingle; else var dText=options.dString;
        if (h == 1) var hText=options.hStringSingle; else var hText=options.hString;
        if (m == 1) var mText=options.mStringSingle; else var mText=options.mString;
        if (s == 1) var sText=options.sStringSingle; else var sText=options.sString;

        var daysDiv = '<div class="cd-digit">'+ daysZero + d +'<span class="cd-info">'+ dText +'</div>';
        var hoursDiv = '<div class="cd-digit">'+ hoursZero + h +'<span class="cd-info">'+ hText +'</div>';
        var minsDiv = '<div class="cd-digit">'+ minsZero + m +'<span class="cd-info">'+ mText +'</div>';
        var secsDiv = '<div class="cd-digit-right cd-digit">'+ secsZero + s +'<span class="cd-info">'+ sText +'</div>';
        return daysDiv + hoursDiv + minsDiv + secsDiv;
      }

      function countTimes(timeTo)
      {
        this.days = parseInt( timeTo / (1000*60*60*24) ); // time / oneDay
        this.hours = parseInt( (timeTo-this.days*(1000*60*60*24)) / (1000*60*60) ); // ... oneHour
        this.mins = parseInt( (timeTo-this.days*(1000*60*60*24)-this.hours*(1000*60*60)) / (1000*60) );  //  ... oneMin
        this.secs = parseInt( (timeTo-this.days*(1000*60*60*24)-this.hours*(1000*60*60)-this.mins*(1000*60)) / 1000 ); // ... oneSec
      }


      // methods caller
      if ( methods[method] ) {
        // call selected method
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        // call init
        return methods.init.apply( this, arguments);
      } else {
        // method not found
        $.error( 'Method ' +  method + ' does not exist on jQuery.countdown plugin' );
      }
    }
  });

}(window, document, jQuery));