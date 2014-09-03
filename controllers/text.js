/**
 * Controller for the text field type.
 *
 * This type exposes a `Ti.UI.Textfield`.
 *
 * @class Widgets.nlFokkezbForm.controllers.text
 * @extends Widgets.nlFokkezbForm.controllers.field
 * @xtype text
 */

exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';

var format;

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {Object} [args.input]     Properties to apply to the `Ti.UI.TextField`, e.g. keyboard type and toolbar.
 * @param {String} [args.hinttext]  Hint text to set on the `Ti.UI.TextField`.
 * @param {String} [args.format]    A format triggers different behavior, properties etc, e.g. 'email'.
 */
(function constructor(args) {

  var inputProp;

  // user can pass input args
  inputProp = args.input || {};
  delete args.input;

  _.each(['hinttext'], function(property) {

    if (_.has(args, property)) {
      inputProp[property] = args[property];
      delete args[property];
    }

  });

  // a string format is given
  if (args.format) {
    format = args.format;
    delete args.format;

    switch (format) {

      case 'email':
        inputProp.keyboardType = inputProp.keyboardType || Ti.UI.KEYBOARD_EMAIL;
        inputProp.autocapitalization = inputProp.autocapitalization || Ti.UI.TEXT_AUTOCAPITALIZATION_NONE;
        inputProp.autocorrect = inputProp.autocorrect === true;
        break;

      case 'float':
        inputProp.keyboardType = inputProp.keyboardType || Ti.UI.KEYBOARD_DECIMAL_PAD;
        inputProp.autocapitalization = inputProp.autocapitalization || Ti.UI.TEXT_AUTOCAPITALIZATION_NONE;
        inputProp.autocorrect = inputProp.autocorrect === true;
        break;

      case 'password':
        inputProp.passwordMask = inputProp.passwordMask || true;
        inputProp.autocapitalization = inputProp.autocapitalization || Ti.UI.TEXT_AUTOCAPITALIZATION_NONE;
        inputProp.autocorrect = inputProp.autocorrect === true;
        break;
    }
  }

  // input properties to apply
  if (_.size(inputProp) > 0) {
    $.input.applyProperties(inputProp);
  }

  // add the input to the row
  $.setInput($.input);

})(arguments[0]);

function onChange(e) {
  $.change();

  // if (format === 'float') {
  //   var flt = parseFloat(e.value);

  //   $.setValue(_.isNaN(flt) ? null : flt.toString());
  // }
}
