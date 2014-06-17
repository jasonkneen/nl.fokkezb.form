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

	(function constructor(args) {

	  // input properties to apply
	  if (args.input) {
	    $.input.applyProperties(args.input);
	  }

	  $.setInput($.input);

	})(arguments[0]);
 
And a view not much more then:

	<Alloy>
	  <Slider id="input" />
	</Alloy>

### baseController
The strange `baseController` path is a workaround for [TC-4280](https://jira.appcelerator.org/browse/TC-4280) to cope with Alloy prepending `alloy/controllers/`.

### applyProperties
Please conform to how the built-ins work by allowing the user to apply properties to your type's (main) input view using the `input` property.

### setInput
You need to call {@link Widgets.nlFokkezbForm.controllers.field#setInput} to add your type's input view to the row.

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