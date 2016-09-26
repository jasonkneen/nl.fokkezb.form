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

/**
 * @type {Object} Reference to the form.
 */
$.form = null;

/**
 * @type {String} Field name.
 */
$.name = null;

$.setInput = setInput;

$.focus = focus;
$.blur = blur;
$.next = next;

$.setValue = setValue;
$.getValue = getValue;

$.change = change;

$.isValid = isValid;
$.showError = showError;

$.hide = hide;
$.show = show;

// keep a reference to our controllerParam for showError()
// when we are extended the original values will change to our child's.
var controllerParam = {
  widgetId: $.__widgetId,
  name: $.__controllerPath
};

// hold the value received via constructor until after setInput was called.
var value;

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

  $.form = args.form;
  $.name = args.name;

  if (args.visible === false) {
    _.defer(function (hide) {
      hide();
    }, hide);
  }

  if (args.row){
    $.row.applyProperties(args.row);
  }

  // Android can't ser custom properties with applyProperties
  // for the table's singletap event listener
  $.row._name = $.name;

  // Overwrite layout value from args.row
  if (args.row && args.row.layout) {
    $.container.layout = args.row.layout;
  }

  // Fit control view into the row, label.width + label.left + control.left + control.right
  if ($.container.layout === 'horizontal') {
    var platformWidth = OS_ANDROID ? require('alloy/measurement').pxToDP(Ti.Platform.displayCaps.platformWidth) : Ti.Platform.displayCaps.platformWidth;
    $.control.width = platformWidth - $.label.left - $.label.width - $.control.left - 15;
  }

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
    Alloy.addClass(controllerParam, $.container, 'errorRow');
    Alloy.addClass(controllerParam, $.label, 'errorLabel');

  } else {
    Alloy.removeClass(controllerParam, $.container, 'errorRow');
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
 * Removes the focus from the input
 */
function blur() {
  $.input.blur();
}

/**
 * Set focus on the next field and blur this one
 */
function next() {
  var nextField = $.form.getNextField($.name);

  if (nextField) {
    nextField.focus();
  }

  $.blur();
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
  $.input.value = '' + val;
}

/**
 * Fires the #change event if it has changed.
 *
 * @private
 */
function change() {
  $.trigger('change', {
    form: $.form,
    field: $.name,
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

/**
 * Remove this TableViwRow from the table
 */
function hide(){
  $.args.form.table.deleteRow($.row, {
    animated: true
  });
}

/**
 * Adding this row to the table, Using Ti.UI.TableView.insertRowAfter()
 * @param  {Integer} index Index of the previous row to show this row after
 */
function show(index){
  $.args.form.table.insertRowAfter(index, $.row, {
    animated: true
  });
}
