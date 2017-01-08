[![Stories in Ready](https://badge.waffle.io/FokkeZB/nl.fokkezb.form.png?label=ready&title=Ready)](https://waffle.io/FokkeZB/nl.fokkezb.form)
NOTE: We facing a [bug with Titanium 6+ on Android](https://jira.appcelerator.org/browse/AC-4661), follow this [workaround](https://github.com/FokkeZB/nl.fokkezb.form/issues/34) or help fix it.

# Alloy Form Widget [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

An [Alloy](http://appcelerator.com/alloy) [Widget](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Widgets) to create a form using a [TableView](http://docs.appcelerator.com/titanium/latest/#!/guide/TableViews), much like the familiar settings views on iOS.

* Source code: [https://github.com/FokkeZB/nl.fokkezb.form/tree/master](https://github.com/FokkeZB/nl.fokkezb.form/tree/master)
* Documentation: [http://form.fokkezb.nl](http://form.fokkezb.nl)
* Test app: [https://github.com/FokkeZB/nl.fokkezb.form/tree/test](https://github.com/FokkeZB/nl.fokkezb.form/tree/test)

## Get it [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/nl.fokkezb.form)

Install via [gitTio](http://gitt.io/component/nl.fokkezb.form):

	$ gittio install nl.fokkezb.form

Or download a [release](https://github.com/FokkeZB/nl.fokkezb.form/releases), extract it to your app's `app/widgets/nl.fokkezb.form` folder and add the dependency to your `config.json`:

	{
		..
		"dependencies": {
		    "nl.fokkezb.form": "*"
		    ..
		  }
	}	

## Use it

Consult the [documentation](http://form.fokkezb.nl) for all options, e.g. to create:

### index.js
    var form = Alloy.createWidget('nl.fokkezb.form', {
      fieldsets: [{
        legend: 'My form',
        fields: [{
          name: 'name',
          label: 'Your name',
          type: 'text'
        }, {
          name: 'email',
          label: 'Your email address',
          type: 'text',
          format: 'email'
        }, {
          name: 'like',
          label: 'Do you like it?',
          type: 'switch'
        }]
      }]
    });
    $.index.add(form.getView());
    $.index.open();

### Screenshot

![Screenshot](https://github.com/FokkeZB/nl.fokkezb.form/blob/gh-pages/doc-resources/example.png?raw=true)
 
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
