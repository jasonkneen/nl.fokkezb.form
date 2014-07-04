# Fields

Fields extend {@link Widgets.nlFokkezbForm.controllers.field}, which takes care of the `Ti.UI.TableViewRow` and default value and validation methods. A field adds his input control and can override the methods.
	
## Label

Set any the `Ti.UI.Label`'s properties via field's `label` or `labelid` property. The `label` property can also be a set of properties to apply:

	{
		fieldsets: [{
			fields: [{
				name: 'name',
				label: 'Your name',
				type: 'text'
			},{
				name: 'email',
				labelid: 'form_email',
				type: 'text',
				format: 'email'
			}, {
				name: 'city',
				label: {
					text: 'Your city',
					color: 'red'
				},
				type: 'text'
			}]
		}]
	}

## Type

There are different options for determining the input type or even provide a custom `Ti.UI.TableViewRow`:

### Built-in types

Use the `type` property to specify one of the widget's controllers to use:

	fields: [{
		name: 'name',
		label: 'Your name',
		type: 'text'
	}]

	// equals: Alloy.createWidget('nl.fokkezb.form', 'text');

### Custom type by a widget

Use the `widget` property to load the controller set by `type` form a different widget:

	fields: [{
		name: 'name',
		label: 'Your name',
		widget: 'my.form',
		type: 'text'
	}]

	// equals: Alloy.createWidget('my.form', 'text');

### Custom type by a controller

Use the `controller` property to load an app controller:

	fields: [{
		name: 'name',
		label: 'Your name',
		controller: 'fields/myField'
	}]

	// equals: Alloy.createController('fields/myField');

### Custom row

Or even insert a custom `Ti.UI.TableViewRow`:

	fields: [{
		name: 'name',
		label: 'Your name',
		type: 'text'
	}, Ti.UI.createTableView({
		title: 'Some row in between fields!'
	}), {
		name: 'email',
		labelid: 'form_email',
		type: 'text',
		format: 'email'
	}]

## Values

See [Forms](#!/guide/forms-section-values) for how to set and get values, also on a individual field.

## Events
The field fires a `change` and `change:[field]` event whenever the value changes.

You can add a listener via the `listener` property:

	{
		fields: [{
			name: 'name',
			label: 'Your name',
			type: 'text',
			listener: function(e) {
				e.form.getField('email').required = (e.value === 'Jeff');
			}
		}, {
			email: 'email',
			label: 'Your email',
			type: 'text',
			format: 'email'
		}]
	}
	
Or using the BackBoneJS `on` method of the form:

	form.getField('name').on('change', myListener);
	
**NOTE**: Using the last method you don't have `e.form` and `e.field`.

## Validate

See [Forms](#!/guide/forms-section-validate) for how to set and get values, also on a individual field.

### Required

Unless a type overrides the default behavior, you can make a field required using the `required` property:

	fields: [{
		name: 'name',
		label: 'Your name',
		type: 'text',
		required: true
	}]

### Validator

You can provide a function to perform validation (if `required` didn't fail) via the `validator` property:

	fields: [{
		name: 'creditcard',
		label: 'Credit Card',
		type: 'text',
		validator: function(value) {
			return form.validator.isEmail(value) && !value.indexOf('hotmail.com');
		}
	}]

You can use the NPM {@link Widgets.nlFokkezbForm.lib.validator} library exposed via {@link Widgets.nlFokkezbForm.controllers.widget#validator} or any custom validation as long as it returns a `Boolean`.
	
### Override style
The `Ti.UI.TableViewSection` is created using a `.section` class, unless you have set it to something else. As of Alloy 1.4.0 you can use this class to [override the style using a theme](https://jira.appcelerator.org/browse/ALOY-378) for the widget's `widget.tss` file.