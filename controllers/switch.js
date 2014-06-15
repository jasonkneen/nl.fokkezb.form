/**
 * Controller for the switch field type.
 *
 * The switch field type is a `Ti.UI.Switch`.
 * 
 * @class Widgets.nlFokkezbForm.controllers.switch
 * @xtype switch
 * @requires Widgets.nlFokkezbForm.controllers.row
 */

$.getValue = getValue;
$.setValue = setValue;

$.focus = focus;

/**
 * Constructor for the switch field type.
 *
 * @constructor
 * @method Controller
 * @param args Arguments for the controller, which it in turn will also use to call {@link Widgets.nlFokkezbForm.controllers.row#init}.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.Switch`.
 * @param {Boolean} [args.value=false] Set to `true` to turn the switch on.
 */
(function constructor(args) {
  var input;
  
  // user can pass input args
  input = args.input || {};
  delete args.input;

  _.each(['value'], function(property) {

    if (_.has(args, property)) {
      input[property] = args[property];
      delete args[property];
    }

  });

  // input properties to apply
  if (_.size(input) > 0) {
    $.input.applyProperties(input);
  }

  $.row.init(args);

})(arguments[0]);

/**
 * Get the value of the field.
 * 
 * @return {Boolean} Returns `true` if the switch is turned on or `false` otherwise.
 */
function getValue() {
  return !!$.input.value;
}

/**
 * Set the value of the field.
 * 
 * @param  {Boolean} [value] Set to `true` to turn on and `false` to turn off the switch.
 */
function setValue(value) {
  $.input.value = !!value;
}

/**
 * Toggles the switch.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on the row.
 */
function focus() {
  setValue(!getValue());
}