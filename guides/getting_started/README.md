# Getting Started

You can create and intialize the widget in 2 different ways or a combination of.

## 1. Creating a widget instance

You can do this in a controller:

	var form = Alloy.createWidget('nl.fokkzb.form');
	
Or in a view:

	<Widget id="form" src="nl.fokkezb.form" />
	
## 2. Initializing the widget

### In the controller

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
	
Or later, e.g. after creating the instance in a view:

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
	
### In the view, using a configuration file

You can also choose to specify a configuration file when you create a widget instance in a view:

	<Widget id="form" src="nl.fokkezb.form" config="myForm.js" />

#### CommonJS

Or a CommonJS module using a path relative to `Resources` (not ending with `.js` of course):

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
	
#### JSON

The value of `config` can either point to a JSON file using a path absolute or relative to `Resources`:

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
	
**NOTE:** Using JSON does not allow you to use `L()` for legends and labels or specify custom validators.