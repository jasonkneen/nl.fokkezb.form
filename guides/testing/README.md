# Testing
The [test](https://github.com/FokkeZB/nl.fokkezb.form/tree/test) branch has an app that can be used for testing the widget. This guide explains how to use it.

### Preparing [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

The repo has a `Gruntfile.js` for [Grunt](http://gruntjs.com/getting-started) to replace the app's `app/widgets/nl.fokkezb.form` with a copy from the `master` branch. The configuration assumes to find this branch at `../master`.

Install Grunt and the dependencies via:

	$ sudo npm i -g grunt
	$ sudo npm install

### Running
To replace the app's copy of the widget and build the app for the simulator simply execute:

	$ grunt

### Automated tests
This branch is simply an Alloy project using as much of the options. At some point I probably should add automated tests using e.g. [ti-mocha](https://github.com/tonylukasavage/ti-mocha), but for now this will do.