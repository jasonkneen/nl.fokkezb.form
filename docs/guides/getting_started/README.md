# Getting Started

You can create and intialize the widget in many different ways or a combination of.

## 1. Creating a widget instance

You can do this in a controller:

	var form = Alloy.createWidget('nl.fokkzb.form');
	
Or in a view:

	<Widget id="form" src="nl.fokkezb.form" />
	
## 2. Initializing the widget
There are different moments and ways to initialize the widget.

If the arguments for the {@link Widgets.nlFokkezbForm.controllers.widget#Controller constructor} of the widget has a `fieldsets`, `fields` or `config` property, then it will automatically call {@link Widgets.nlFokkezbForm.controllers.widget#init init}. If it doesn't, then the arguments will saved to be {@link Widgets.nlFokkezbForm.lib.deepExtend deep-extended} as defaults when you call {@link Widgets.nlFokkezbForm.controllers.widget#init init} manually later. Would you happen to call {@link Widgets.nlFokkezbForm.controllers.widget#init init} again after the constructor or yourself did so already, the last call will set the form.

This logic makes that you can use a combination of the the following ways to set the properties for the intialisation from different files:

### In JS

When you create a widget instance:

	var form = Alloy.createWidget('nl.fokkezb.nl', {
		fieldsets: [{
			legend: 'My form',			
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	});
	
Or later, e.g. after creating the instance in `XML`:

	$.form.init({
		fieldsets: [{
			legend: 'My form',			
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	});
	
And of course you could also set other properties then the 3 triggering {@link Widgets.nlFokkezbForm.controllers.widget#init init} via `createWidget` and set the rest via a manual {@link Widgets.nlFokkezbForm.controllers.widget#init init} call, but why one earth would you want to do that?!
	
### In TSS

Only if you create the widget instance in `XML` you can set some or all initialisation properties in `TSS`:

	"#form": {
		fieldsets: [{
			legend: 'My form',			
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	}	

**NOTE:** Using TSS does not allow you to specify custom validators.
	
### In XML

When you create the widget instance in `XML` you can set some initialisation properties there as well:

	<Widget id="form" src="nl.fokkezb.form" legend="My form" config="myForm.js" />
	
Of course you can't specify arrays of fieldset and field objects, let alone custom validators.

But you *can* use the `config` attribute to load a configuration file:

### In a configuration file

If via any of the above ways you set the `config` property, the widget will extend whatever else properties you have set with the ones found in the specified CommonJS or JSON configuration file:

#### JSON

If `config` ends with `.json`, it will assume it to be a path absolute or relative to `Resources` and read and parse the contents of the file as JSON:

	{
		fieldsets: [{
			legend: 'My form',			
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	}
	
**NOTE:** Using JSON does not allow you to specify custom validators. Instead of `L()` you can still use `labelid` and `legendid`.

#### CommonJS

If not, it will assume it to be a relative path to a CommonJS module. This can in turn be used in 2, or even 3 ways.

##### Export an object
It can export the properties themselve:

	module.exports = {
		fieldsets: [{
			legend: 'My form',			
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	};
	
##### Export a function (sync)
Or export function to be called with te existing properties. This way you can return different properties depending on e.g. the values:

	module.exports = function(form, opts) {
	
		return {
			listener: function(e) {
				
				if (e.field === 'name') {
					form.getField('email').required = (e.value === 'Jeff');
				}
			
			},
			fieldsets: [{
				legend: 'My form',			
				fields: [{
					name: 'name',
					label: 'Your name',
					type: 'text'
				}, {
					email: 'email',
					label: 'Your email',
					type: 'text',
					format: 'email'
					required: (opts.values && opts.values.name === 'Jeff')
				}]
			}]
		};
	
	};

##### Export a function (async)
If you need to request data to determine the fields, you can also return nothing and call the second argument when you're done:

	module.exports = function(form, opts, callback) {
	
		require('xhr').request('http://my.back.end', function(res) {
		
			callback({
				listener: function(e) {
					
					if (e.field === 'name') {
						form.getField('email').required = (e.value === 'Jeff');
					}
				
				},
				fieldsets: [{
					legend: res.legend,			
					fields: [{
						name: 'name',
						label: 'Your name',
						type: 'text'
					}, {
						email: 'email',
						label: 'Your email',
						type: 'text',
						format: 'email'
						required: (opts.values && opts.values.name === 'Jeff')
					}]
				}]
			});
		});
	};