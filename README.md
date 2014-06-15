# Alloy Form Widget [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

An [Alloy](http://appcelerator.com/alloy) widget to create a form using a `Ti.UI.TableView`, much like the familiar settings views on iOS.

* Source code: [https://github.com/FokkeZB/form/tree/master](https://github.com/FokkeZB/form/tree/master)
* Documentation: [http://form.fokkezb.nl](http://form.fokkezb.nl)

## Example

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

Will get you:

![Screenshot](https://github.com/FokkeZB/form/blob/gh-pages/doc-resources/example.png?raw=true)
 
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