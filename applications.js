$('#count1').countdown(tenSeconds,  function()
          {
            getLive("#", "#countdown-inner1");
          } );

$('#count2').countdown(new Date(2013, 2, 8, 17, 35, 35),  function()
          {
            getLive("#", "#countdown-inner21");
          } );