var someSeconds = new Date(new Date().getTime()+15000);

var options1 = {
	dateTo: new Date(2013, 2, 15, 14, 0, 0),
    dString: 'dní',
    hString: 'hodín',
    mString: 'minút',
    sString: 'sekúnd',
};

var options2 = {
	onCountDownEnd: function (){
		$('#count1').countdown('setTime', new Date(2013, 2, 15, 15, 0, 0));
	},
};
$('footer').countdown('init', options2);
$('#count1').countdown('init', options1);

//$('.links a').countdown('init', options1);




// $('#count2').countdown(new Date(2013, 2, 8, 17, 35, 35),  function()
//           {
//             getLive("#", "#countdown-inner21");
//           } );

