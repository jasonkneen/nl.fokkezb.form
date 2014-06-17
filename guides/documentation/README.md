# Documentation

This guide gives a little background on how I structured the documentation for this widget. This was also published as an article on [tiDev.io]().

## JSDuck

After reading Ronald Treur's article about [Duckumentation](http://www.tidev.io/2014/05/14/duckumentation/) on tiDev I decided to give [JSDuck](https://github.com/senchalabs/jsduck) a try for some projects and widgets I'm working on.

## GitHub pages

I wanted to publish the documentation online with minimal effort. Since the widget lives on GitHub, using [GitHub pages](https://pages.github.com) was the logical choice. This requires the repo to have a [gh-pages](https://github.com/FokkeZB/nl.fokkezb.form/tree/gh-pages) branch which will be served as a website.

## Working copies
Because JSDuck generates most of the documentation from inline docblocks in the code, I have set up multiple working copies on my local machine as follows:

- `~/form/master`: the [master](https://github.com/FokkeZB/nl.fokkezb.form/tree/master) branch.
- `~/form/gh-pages`: the [gh-pages](https://github.com/FokkeZB/nl.fokkezb.form/tree/gh-pages) branch.
- `~/form/test`: the [test](https://github.com/FokkeZB/nl.fokkezb.form/tree/test) branch.

This way I can keep the `master` repo clean by having all `jsduck-*.json` files in the `gh-pages` repo, just like I do for [testing](#!/guide/testing). When I execute `$ jsduck` in the `gh-pages` branch it looks for code in `../master`, as the [jsduck.json](https://github.com/FokkeZB/nl.fokkezb.form/blob/gh-pages/jsduck.json) file shows:

	{
	    "--title": "Alloy Form Widget - Documentation",
	    "--": [
	        "../master"
	    ],
	    "--output": "docs",
	    "--welcome": "../master/README.md",
	    "--categories": "jsduck-categories.json",
	    "--guides": "jsduck-guides.json",
	    "--warnings": "-image_unused",
	    ..
	}

## Re-using README's

To stay DRY, I have re-used the `master` branch's [README](https://github.com/FokkeZB/nl.fokkezb.form/blob/master/README.md) as the welcome page as the [testing](#!/guide/testing) guide is the `test` branch's [README](https://github.com/FokkeZB/nl.fokkezb.form/blob/test/README.md). I did need to disable `image_unused` warnings for this to work.

	[{
	  "title": "Widget: nl.fokkezb.form",
	  "items": [
	  	..
	  {
	    "name": "testing",
	    "url": "../test",
	    "title": "Testing",
	    "description": "Information about the test-branch."
	  }, {
	    "name": "documentation",
	    "url": "guides/documentation",
	    "title": "Documentation",
	    "description": "Documenting the documentation."
	  }]
	}]

## Namespacing
I want to be able to also use JSDuck to generate documentation for an app, *including* this and other widgets it uses. This is why I namespaced the widget controllers and libraries as `Widgets.nlFokkezbForm.controllers.*` instead of just. `controllers.field`. In an app's documentation this will look like:

{@img namespacing.png}

> **NOTE:** I was in doubt between `nlFokkeZB` and `nl.fokkezb.form`. The last would also group different widgets under `nl.fokkezb.*`, but make the tree more difficult to navigate.

## Constructors
The code you're writing as Alloy controllers are ultimately [wrapped by Alloy](https://github.com/appcelerator/alloy/blob/master/Alloy/template/component.js#L16) in a `Controller` function exported as the CommonJS module.

	..
	
	function Controller() {
	
		..
		
		var $ = this;		
		
		// Your view XML compiled to JS
		 
		// Your controller JS
		
		..
		
		_.extend($, exports);
	}
	..
	module.exports = Controller;
	
Since I can't inject a docblock here, but also because I like to keep my controller code organized, I always wrap the controller's code to be executed at creation in a self-executing method like this:

	(function constructor(args) {
	
		// my controller 'constructor' code
		
	})(arguments[0] || {});
	
Now I can simply document this as:
	
	/**
	 * Constructor.
	 *
	 * @method Controller
	 * @param args Arguments passed to the controller.
	 
	 */
	(function constructor(args) {
	..

If I'd leave out `@method` then JSDuck would warn about finding an unnamed method, because it's self-executing. If I'd use `@constructor` instead, then JSDuck would use the class and show something like:

- new Widgets.nlFokkezbForm.controllers.widget( args ) : Widgets.nlFokkezbForm.controllers.widget

Instead I use `@method Controller` so that the documentation stays close to how it works in the compiled Alloy controller code.