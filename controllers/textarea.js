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
 * @param {Object}  [args.input]  Properties to apply to the `Ti.UI.TextArea`, e.g. keyboard type and toolbar.
 * @param {Boolean} [args.next]   Set to false to disable the 'next' returnKeyType.
 */
(function constructor(args) {

  var inputProp;

  // user can pass input args
  inputProp = args.input || {};
  delete args.input;

  // unless the user tells us not to, we set returnKeyType to next
  if (args.next !== false) {
    inputProp.returnKeyType = Ti.UI.RETURNKEY_NEXT;
  }

  // input properties to apply
  if (_.size(inputProp) > 0) {

    if (inputProp.returnKeyType && inputProp.returnKeyType === Ti.UI.RETURNKEY_NEXT) {

      $.input.addEventListener('return', function(e) {
        $.next();
      });
    }

    $.input.applyProperties(inputProp);
  }

  // add the input to the row
  $.setInput($.input);

})(arguments[0]);

function onChange(e) {
  $.change();
}