# Types

At the moment the widget comes with these built-in types:

- {@link Widgets.nlFokkezbForm.controllers.text text}
- {@link Widgets.nlFokkezbForm.controllers.textarea textarea}
- {@link Widgets.nlFokkezbForm.controllers.switch switch}

## Using types
See [Fields](#!/guide/fields-section-type) to learn how to use a built-in or custom type.

## Adding types
By leaving most of the common views and logic in {@link Widgets.nlFokkezbForm.controllers.field} a new type's controller can be as simple as:

	exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';
	$.__widgetId = 'timewax.fields';

	(function constructor(args) {

	  // input properties to apply
	  if (args.input) {
	    $.input.applyProperties(args.input);
	  }

	  $.setInput($.input);

	})(arguments[0]);
	
	$.setValue = funciton (val) {
		$.input.value = val;
	}
	
	$.getValue = function () {
		return $.input.value;
	}
	
	function onChange(e) {
		$.change();
	}
 
And a view not much more then:

	<Alloy>
	  <Slider id="input" onChange="onChange" />
	</Alloy>

### baseController
The strange `baseController` path is a workaround for [TC-4280](https://jira.appcelerator.org/browse/TC-4280) to cope with Alloy prepending `alloy/controllers/`.

### __widgetId
If you have your custom type in a widget and need dynamic styling via `$.createStyle` or similar to read from your controller's TSS file, you need to manually set `$.__widgetId` to that of your widget. Else it will read from the form widget.

### applyProperties
Please conform to how the built-ins work by allowing the user to apply properties to your type's (main) input view using the `input` property.

### setInput
You need to call {@link Widgets.nlFokkezbForm.controllers.field#setInput} to add your type's input view to the row.

### setValue
To display the value set to the field via the type's input controller, you need to overload the `$.setValue` method and do what needs to be done there.

### change
The other way around you need to call `$.change` whenever the value of the control is changed by the user. The base controller will take care of the `change` events.

### Overloading controller methods
You can overload any of {@link Widgets.nlFokkezbForm.controllers.field}'s methods:

	/**
	 * A switch is always valid.
	 *
	 * @return {Boolean} Always `true`.
	 */
	$.isValid = function isValid() {
	  return true;
	}

### Overloading views
You can maninpulate any of {@link Widgets.nlFokkezbForm.controllers.field}'s [view elements](https://github.com/FokkeZB/nl.fokkezb.form/blob/master/views/field.xml) using the `$.row`, `$.label` and `$.control` references. You could even remove the label and control, but not the row since that will already be added to the table.

	(function constructor(args) {

	  // align our label to the top
	  $.label.top = 10;

	  // input properties to apply
	  if (args.input) {
	    $.input.applyProperties(args.input);
	  }

	  // add the input to the row
	  $.setInput($.input);

	})(arguments[0]);
