var AppUtil = (function(){
	return {
		showPadDetails: function (){
			var gamepadSupportAvailable = Modernizr.gamepads;
			var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
			if( gamepadSupportAvailable )
			{
				function updateStatus()
				{
					window.webkitRequestAnimationFrame(updateStatus);
					var data = '';
				 	var gamepads = navigator.webkitGetGamepads();
					
					var data = '';
				    for (var padindex = 0; padindex < gamepads.length; ++padindex)
				    {
				        var pad = gamepads[padindex];
				        var i;
				        if (!pad) continue;
				        data += '<pre>' + pad.index + ": " + pad.id + "<br/>";
				        for (i = 0; i < pad.buttons.length; ++i)
				            data += "button" + i + ": " + pad.buttons[i] + "<br/>";
				        for (i = 0; i < pad.axes.length; ++i)
				            data += "axis" + i + ": " + pad.axes[i] + "<br/>";
				    }
					document.body.innerHTML = data;
				}
				 window.webkitRequestAnimationFrame(updateStatus);
				 updateStatus();
			}
			else
			{
				alert("wtf");
			}
		}
	// end show pad details
	}
}());