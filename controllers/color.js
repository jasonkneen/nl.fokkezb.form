/**
 * Controller for the color field type.
 *
 * The color field type is a `Ti.UI.Label` to display current and the `nl.fokkezb.colorpicker` module to change.
 *
 * **WARNING** For now this is an iPad-only type!
 *
 * @class Widgets.nlFokkezbForm.controllers.color
 * @extends Widgets.nlFokkezbForm.controllers.field
 * @xtype color
 */

exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';

$.focus = focus;
$.getValue = getValue;
$.setValue = setValue;

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

function getValue() {
  return $.input.text;
}

function setValue(val) {
  $.input.text = '  ' + val + '  ';
  $.input.backgroundColor = val;
  $.input.color = getContrastColor(val);
}

function onDoneClick(e) {
  $.setValue($.picker.color);

  onCancelClick(e);
}

function onCancelClick(e) {
  $.popover.hide();
}

function getContrastColor(hexcolor) {

  if (!hexcolor) {
    return 'black';
  }

  // we don't want the #
  if (hexcolor.substr(0, 1) === '#') {
    hexcolor = hexcolor.substr(1);
  }

  // sorry we don't do alpha
  if (hexcolor.length === 4 || hexcolor.length === 7) {
    hexcolor = hexcolor.substr(1);
  }

  // translate F00 to FF0000
  if (hexcolor.length === 3) {
    hexcolor = hexcolor.substr(0, 1) + hexcolor.substr(0, 1) + hexcolor.substr(1, 1) + hexcolor.substr(1, 1) + hexcolor.substr(2, 1) + hexcolor.substr(2, 1);
  }

  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  return (yiq >= 128) ? 'black' : 'white';
}