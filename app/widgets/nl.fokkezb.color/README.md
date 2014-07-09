# Alloy Color Picker Widget [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

An [Alloy](http://appcelerator.com/alloy) [Widget](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Widgets) to display an HSV color space that can have any size. By tapping or dragging the user can change the selected color, which will be returned in HSV, RGB and HEX.

* Source code: [https://github.com/FokkeZB/nl.fokkezb.color/tree/master](https://github.com/FokkeZB/nl.fokkezb.color/tree/master)
* Documentation: [http://color.fokkezb.nl](http://color.fokkezb.nl)
* Test app: [https://github.com/FokkeZB/nl.fokkezb.color/tree/test](https://github.com/FokkeZB/nl.fokkezb.color/tree/test)

## See it
Screenshots of the [test app](https://github.com/FokkeZB/nl.fokkezb.color/tree/test) in which the actual widget is only the HSV color space image:

![Screenshots](http://color.fokkezb.nl/screenshots.png)

## Get it [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/nl.fokkezb.color)

Install via [gitTio](http://gitt.io/component/nl.fokkezb.color):

	$ gittio install nl.fokkezb.color

Or download a [release](https://github.com/FokkeZB/nl.fokkezb.color/releases), extract it to your app's `app/widgets/nl.fokkezb.color` folder and add the dependency to your `config.json`:

	{
		..
		"dependencies": {
		    "nl.fokkezb.color": "*"
		    ..
		  }
	}	

## Use it

See the following code form the [test app](https://github.com/FokkeZB/nl.fokkezb.color/tree/test) and consult the [documentation](http://color.fokkezb.nl) for more information.

### index.xml

	<Alloy>
	  <Window id="win" backgroundColor="#00FF00" fullscreen="true">
	    <Label id="hex" width="Ti.UI.FILL" textAlign="Ti.UI.TEXT_ALIGNMENT_CENTER" top="0" height="40">#00FF00</Label>
	    
			<Widget id="widget" src="nl.fokkezb.color" onChange="onChange" color="#00FF00" top="40" bottom="40" left="40" right="40">
				<!-- YOU CAN ADD CHILD VIEWS -->
			</Widget>
			
		</Window>
	</Alloy>
	
### index.js

	// $.widget.color = '#FF0000';

	$.win.open();
	
	function onChange(e) {
	  console.debug(JSON.stringify(e, null, '  '));
	
	  $.hex.applyProperties({
	    text: e.hex,
	    color: e.bw
	  });
	
	  $.win.backgroundColor = e.hex;
	  
	  // var color = $.widget.color;
	}
 
## License

	The MIT License (MIT)
	
	Copyright (c) 2014 Fokke Zandbergen
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
