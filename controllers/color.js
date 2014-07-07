/**
 * Controller for the color field type.
 *
 * The color field type is a `Ti.UI.Label` to display current and the `nl.fokkezb.color` widget to change.
 *
 * **WARNING** For now this is an iPad-only type!
 *
 * @class Widgets.nlFokkezbForm.controllers.color
 * @extends Widgets.nlFokkezbForm.controllers.field
 * @xtype color
 */

exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';

$.focus = focus;
$.showValue = showValue;

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.Label`.
 * @param {String|Object} args.label Will be used for the dialog title as well.
 */
(function constructor(args) {

  if (Ti.Platform.osname !== 'ipad') {
    throw 'The color-field type only supports iPad for now.';
  }

  // display a hasChild marker
  $.row.applyProperties($.createStyle({
    classes: ['row']
  }));

  // input properties to apply
  if (args.input) {
    $.input.applyProperties(args.input);
  }

  // add the input to the row
  $.setInput($.input);

})(arguments[0]);

/**
 * Displays a modal window or popover (ipad) to change value using a color picker.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on the row.
 */
function focus() {

  $.picker.color = $.getValue();

  $.popover.show({
    view: $.input
  });
}

function showValue(val) {
  $.input.applyProperties({
    text: '  ' + val + '  ',
    backgroundColor: val,
    color: $.picker.convert.hsv2bw($.picker.convert.rgb2hsv($.picker.convert.hex2rgb(val)))
  });
}

function onColorChange(e) {
  var val = e.hex;

  $.showValue(val);
  $.changeValue(val);
}