/**
 * Controller for the switch field type.
 *
 * The switch field type is a `Ti.UI.Switch`.
 *
 * @class Widgets.nlFokkezbForm.controllers.switch
 * @extends Widgets.nlFokkezbForm.controllers.field
 * @xtype switch
 */

exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';

$.focus = focus;
$.showValue = showValue;
$.isValid = isValid;

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.Switch`.
 * @param {Boolean} [args.value=false] Set to `true` to turn the switch on.
 */
(function constructor(args) {

  // input properties to apply
  if (args.input) {
    $.input.applyProperties(args.input);
  }

  // add the input to the row
  $.setInput($.input);

})(arguments[0]);

/**
 * Toggles the switch.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on the row.
 */
function focus() {
  var val = !$.input.value;

  $.input.value = val;
}

function showValue(val) {
  $.input.value = !!val;
}

/**
 * A switch is always valid.
 *
 * @return {Boolean} Always `true`.
 */
function isValid() {
  return true;
}

function onChange(e) {
  $.changeValue(e.value);
}