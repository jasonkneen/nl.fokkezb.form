# Forms
The form is a `Ti.UI.TableView` holding a `Ti.UI.TableViewSection` for each fieldset and a `Ti.UI.TableViewRow` for each field. 

## Create
See [Getting Started](#!/guide/getting_started) to learn how to create a form.

## Values
You can pass initial values when you [initialize](#!/guide/getting_started-section-2.-initializing-the-widget) the widget using the `values` property on the field and/or form level. The latter will overwrite the first, so you can use the field values as defaults.

	var form = Alloy.createWidget('nl.fokkezb.nl', {
		fieldsets: [{
			legend: 'My form',			
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text',
				value: 'John'
			}]
		}],
		values: {
			name: 'Jeff'
		}
	});

After init you can set them like this:

	form.setValues({
		name: 'Jeff'
	});

	var values = form.getValues();

	console.debug(values.name); // will show 'Jeff';

To set or get the value of an individual field:

	var fieldCtrl = form.getField('name');

	fieldCtrl.setValue('Jeff');

	var value = fieldCtrl.getValue();

	console.debug(value); // will show 'Jeff';
	
### Filters
You can set a filter to run the values through before returning them with `getValues()`:

	{
		filter: function(values) {
			if (values.name === 'Jeff') {
				values.name = 'Haynie';
			}
		}
		fields: [{
			name: 'name',
			label: 'Your name',
			type: 'text'
		}]
	}	
	
## Events
The form fires a `change` and `change:[field]` event whenever a field's value changes.

You can add a listener via the `listener` property:

	{
		listener: function(e) {
			if (e.field === 'name') {
				e.form.getField('email').required = (e.value === 'Jeff');
			}
		}
		fields: [{
			name: 'name',
			label: 'Your name',
			type: 'text'
		}, {
			email: 'email',
			label: 'Your email',
			type: 'text',
			format: 'email'
		}]
	}
	
Or using the BackBoneJS `on` method of the form:

	form.on('change', myListener);

## Validate
You can validate all fields by calling {@link Widgets.nlFokkezbForm.controllers.widget#isValid}. This will call {@link Widgets.nlFokkezbForm.controllers.field#isValid} on all fields and return either `true` or `false`. The rows of invalid fields will get a reddish `backgroundColor`.

	if (form.isValid() === false) {
		alert('Correct the red fields please!');
	}

To validate an individual field:

	var fieldCtrl = form.getField('name');

	if (fieldCtrl.isValid() === false) {
		alert('Your name please!');
	}
	
## Vertical align labels and input
Since 1.1.1 you can vertical align a single field, fieldset or the full form via the `row` property that can exist at any of these 3 levels:

	{
		row: {
			layout: 'vertical'
		},
		fieldsets: [{
			row: {
				layout: 'horizontal'
			},
			fields: [{
				name: 'name',
				row: {
					layout: 'vertical'
				}
			}]
		}]
	}

## Customize
You can customize the `Ti.UI.TableView` in 2 ways:

### Apply properties
Set any `Ti.UI.TableView` properties via the `table` property in either JS or TSS:

	{
		table: {
			top: 100,
			headerView: Ti.UI.createView( .. ),
			footerTitle: 'Some text after all fieldsets'
		},
		fieldsets: [{
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			}]
		}]
	}
	
### Override style
The `Ti.UI.TableView` is created using a `.table` class. As of Alloy 1.4.0 you can use this class to [override the style using a theme](https://jira.appcelerator.org/browse/ALOY-378) for the widget's `widget.tss` file.