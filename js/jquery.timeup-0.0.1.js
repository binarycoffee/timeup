/*
	Copyrights (c) 2012 William E. <testorati@gmail.com>

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is furnished to do
	so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	The Software shall be used for Good, not Evil.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
/*
	
	timeup - A count up timer (h:m:s)

	usage:
		@click: $("#container").timeup('start');
		@click: $("#container").timeup('stop');
	note:
		timeup('stop') will reset the counter (for  now)
	
*/
(function($)
{
	// For now let's put this here
	var	timerHandle = 0;
	var	timerOn = false;

	$.fn.timeup = function(action)
	{
		var	seconds = 0;
		var	minutes = 0;
		var	hours = 0;
		var	tagType = this.get(0).tagName.toLowerCase();
		var	timerStr = '';
		var	tu = this;

		if (action == 'start')
		{
			if (timerOn == false)
			{
				timerHandle = setInterval(timer, 1000);
				timerOn = true;
			}
		}
		
		if (action == 'stop')
		{
			clearInterval(timerHandle);
			timerOn = false;
		}

		function timer()
		{
			seconds++;

			if (seconds > 59)
			{
				seconds = 0;
				minutes += 1;
			}
			if (minutes > 59)
			{
				minutes = 0;
				hours += 1;
			}
			
			timerStr = hours + ':' + minutes + ':' + seconds;

			if ((tagType == 'input') || (tagType == 'textarea'))
				tu.val(timerStr);
			else
				tu.html(timerStr);

		};
	};
})(jQuery);
