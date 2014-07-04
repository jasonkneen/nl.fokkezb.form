/**
 * Controller for the textarea field type.
 *
 * This type exposes a `Ti.UI.TextArea`.
 *
 * @class Widgets.nlFokkezbForm.controllers.textarea
 * @extends Widgets.nlFokkezbForm.controllers.field
 * @xtype text
 */

exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.TextArea`, e.g. keyboard type and toolbar.
 */
(function constructor(args) {

  // input properties to apply
  if (args.input) {
    $.input.applyProperties(args.input);
  }

  // add the input to the row
  $.setInput($.input);

})(arguments[0]);

function onChange(e) {
  $.changeValue(e.value);
}