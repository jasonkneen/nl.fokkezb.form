/**
 * Controller for the text field type.
 *
 * The text field type is a `Ti.UI.Textfield`.
 *
 * @class Widgets.nlFokkezbForm.controllers.text
 * @xtype text
 * @requires Widgets.nlFokkezbForm.controllers.row
 */

$.getValue = getValue;
$.setValue = setValue;

$.focus = focus;

/**
 * Constructor for the text field type.
 *
 * @constructor
 * @method Controller
 * @param args Arguments for the controller, which it in turn will also use to call {@link Widgets.nlFokkezbForm.controllers.row#init}.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.TextField`, e.g. keyboard type and toolbar.
 * @param {String} [args.value] Value to set for the field.
 */
(function constructor(args) {
  var input;

  // user can pass input args
  input = args.input || {};
  delete args.input;

  _.each(['value', 'hinttext'], function(property) {

    if (_.has(args, property)) {
      input[property] = args[property];
      delete args[property];
    }

  });

  if (args.format) {

    switch (args.format) {
      case 'email':
        input.keyboardType = Ti.UI.KEYBOARD_EMAIL;
        break;
    }

    delete args.format;
  }

  // input properties to apply
  if (_.size(input) > 0) {
    $.input.applyProperties(input);
  }

  $.row.init(args);

})(arguments[0]);

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
 * @param  {String} [value] Value to set or `undefined` to unset.
 */
function setValue(value) {
  $.input.value = value;
}

/**
 * Sets the focus on the input.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on the row.
 */
function focus() {
  $.input.focus();
}