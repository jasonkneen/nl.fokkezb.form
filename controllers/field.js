/**
 * Base Controller for all field types.
 *
 * See the [Fields](#!/guide/types) guide.
 *
 * @class Widgets.nlFokkezbForm.controllers.field
 * @requires Widgets.nlFokkezbForm.lib.util
 */

var util = require(WPATH('util'));

/**
 * @event change
 * Fired when the value of the field changes.
 *
 * @param {Object} e Event
 * @param {Mixed} e.value The new value.
 */

/**
 * @type {Function} Function to use as validator, e.g.:
 *
 *     function(value) {
 *       return form.validator.isEmail(value) && !value.indexOf('hotmail.com');
 *     }
 */
$.validator = null;

/**
 * @type {Boolean} Whether the field is required.
 */
$.required = false;

$.setInput = setInput;

$.focus = focus;
$.blur = blur;

$.setValue = setValue;
$.getValue = getValue;

$.change = change;
$.onReturn = onReturn;

$.isValid = isValid;
$.showError = showError;

// keep a reference to our controllerParam for showError()
// when we are extended the original values will change to our child's.
var controllerParam = {
  widgetId: $.__widgetId,
  name: $.__controllerPath
};

// hold the value received via constructor until after setInput was called.
var value;

// hold the form object and field name
var form, name;

/**
 * Constructor for the row.
 *
 * @constructor
 * @method Controller
 * @param args                          Arguments passed to the controller.
 * @param {Object|String} [args.label]  Properties to apply to the `Ti.UI.Label` or value for the text property.
 * @param {String} [args.labelid]       String name to use with `L()` for the `Ti.UI.Label` text property.
 * @param {Object} [args.row]           Properties to apply to the `Ti.UI.TableViwRow`.
 */
(function constructor(args) {

  form = args.form;
  name = args.name;

  $.row.applyProperties(_.extend(args.row || {}, {

    // for the table's singletap event listener
    _name: name
  }));

  if (args.validator) {
    $.validator = args.validator;
  }

  $.required = args.required === true;

  // label properties to apply
  var label = util.extractProperties(args, 'label', 'text');
  if (_.size(label) > 0) {
    $.label.applyProperties(label);
  }

  if (args.value !== undefined) {
    value = args.value;
  }

  if (args.listener) {
    $.on('change', args.listener);
  }

  if (args.onreturn) {
    $.on('return', args.onreturn);
  }

})(arguments[0]);

/**
 * Set the input view in the control wrapper
 *
 * @param {Object} input Some kind of input, e.g. `Ti.UI.TextField`.
 * @private
 */
function setInput(input) {

  // if a custom type uses another id we make the ref ourselves
  if (!$.input) {
    $.input = input;
  }

  $.control.add($.input);

  if (value !== undefined) {
    $.setValue(value);
  }
}

/**
 * Visually mark the row as having an error.
 *
 * @param {Boolean} show   Show or hide the mark.
 * @private
 */
function showError(show) {

  if (show) {
    Alloy.addClass(controllerParam, $.row, 'errorRow');
    Alloy.addClass(controllerParam, $.label, 'errorLabel');

  } else {
    Alloy.removeClass(controllerParam, $.row, 'errorRow');
    Alloy.removeClass(controllerParam, $.label, 'errorLabel');
  }
}

/**
 * Sets the focus on the input.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on the row.
 *
 * @private
 */
function focus() {
  $.input.focus();
}

/**
 * Blurs the focus on the input.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on a different field.
 *
 * @private
 */
function blur() {
  $.input.blur();
}

/**
 * Get the value of the field.
 *
 * @return {String} Value of the field.
 */
function getValue() {
  return $.input.value;
}

/**
 * Set the value of the field.
 *
 * @param  {Mixed} [value] Value to set.
 */
function setValue(val) {
  $.input.value = val;
}

/**
 * Fires the #change event if it has changed.
 *
 * @private
 */
function change() {

  $.trigger('change', {
    form: form,
    field: name,
    value: $.getValue()
  });
}


/**
 * Fires the #return event if the user clicks return.
 *
 * @private
 */
function onReturn() {

  $.trigger('return', {
    form: form,
    field: name,
    value: $.getValue()
  });
}

/**
 * Validates the current value.
 *
 * @return {Boolean|String} Returns `true` if valid or an error message if not.
 */
function isValid() {

  var value = $.getValue();

  var valid = true;

  if ($.required && !value) {
    valid = false;

  } else if ($.validator) {
    valid = $.validator(value);
  }

  $.showError(!valid);

  return valid;
}
