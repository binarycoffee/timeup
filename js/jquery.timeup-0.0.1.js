
/*
	
	timeup - A simple count up timer (h:m:s)

	usage:
		@click: $("#element").timeup('start','id');
		@click: $(".element").timeup('start','class');
*/
(function($)
{
	// Let's create small db to keep track of multiple clocks
	// We must do this so we can have multiple clocks running
	var	Clocks = new Object();
		Clocks.db = new Array();
	
	// We need a way to get the records off the db
	Clocks.getClocks = function(ClockID)
	{
		// If we already have clockID on db, return it
		if (Clocks.db[ClockID] != undefined)
			return Clocks.db[ClockID];

		// We don't have ClockID on the db, create it and return it
		return (Clocks.db[ClockID] = 
		{
			Handle: 0,
			On: false,
			Seconds: 0,
			Minutes: 0,
			Hours: 0,
			Clock: ClockID
		});
	};
	
	// Let's insert the plugin into jQuery.fn object
	$.fn.timeup = function(action, clockIdentifier)
	{
		// Get current jquery object
		var	tuObj = this;
		
		// Get clock or start with a fresh one
		var	currentClock = Clocks.getClocks(tuObj.attr(clockIdentifier));

		// Determine tag type
		var	tagType = this.get(0).tagName.toLowerCase();
		
		// What action to take
		switch(action)
		{
			case 'start':
				currentClock.Handle = setInterval(timer, 1000);
				currentClock.On = true;
				break;
			case 'stop':
				clearInterval(currentClock.Handle);
				currentClock.On = false;
				break;
			case 'reset':
				currentClock.Seconds = 0;
				currentClock.Minutes = 0;
				currentClock.Hours = 0;
				break;
		}


		// The actual timer function
		function timer()
		{
			// Time string
			var	timeStr = '';

			currentClock.Seconds++;

			if (currentClock.Seconds > 59)
			{
				currentClock.Seconds = 0;
				currentClock.Minutes += 1;
			}

			if (currentClock.Minutes > 59)
			{
				currentClock.Minutes = 0;
				currentClock.Hours += 1;
			}

			// Display
			timeStr = currentClock.Hours + ':' + currentClock.Minutes + ':' + currentClock.Seconds;

			if ((tagType == 'input') || (tagType == 'textarea'))
				tuObj.val(timeStr);
			else
				tuObj.text(timeStr);
		};
	};
})(jQuery);
