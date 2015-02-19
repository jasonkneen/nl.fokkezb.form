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
$.blur = blur;
$.setValue = setValue;
$.getValue = getValue;

var value;
var showHex = true;
var spectrums;
var spectrum;

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {Object} [args.input]        Properties to apply to the `Ti.UI.Label`.
 * @param {Boolean} [args.input.text]  A static string (can also be empty) to display instead of the current hex value.
 * @param {String|Object} args.label   Will be used for the dialog title as well.
 * @param {Object} [args.color]        Settings to apply to the color picker.
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

    // always show static text
    if (_.has(args.input, 'text')) {
      showHex = false;
    }

    $.input.applyProperties(args.input);
  }

  // properties to apply to picker
  if (args.color) {

    // multiple spectrums to toggle between
    if (args.color.spectrums) {
      spectrums = args.color.spectrums
      spectrum = args.color.spectrum = args.color.spectrum || spectrums[0];

      $.toolbar.show();
      $.win.layout = 'vertical';
    }

    // hide toolbar
    else {
      $.toolbar.hide();
      $.win.layout = 'composite';
    }

    $.picker.applyProperties(args.color);
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

function blur() {
  $.popover.hide();
}

function setValue(val) {
  value = val;

  var prop = {
    backgroundColor: 'white',
    color: 'black'
  };

  // find text color
  if (value) {
    prop.backgroundColor = value;

    if (showHex) {
      prop.text = '  ' + value + '  ';

      var rgb = $.picker.convert.hex2rgb(value);

      if (rgb) {
        prop.color = $.picker.convert.hsv2bw($.picker.convert.rgb2hsv(rgb));
      }
    }
  }

  $.input.applyProperties(prop);
}

function getValue() {
  return value;
}

function onColorChange(e) {
  var val = e.hex;

  $.setValue(val);
  $.change();
}

function onToggleClick() {

  var i = _.indexOf(spectrums, spectrum) + 1;

  if (i === spectrums.length) {
    i = 0;
  }

  spectrum = spectrums[i];

  $.picker.applyProperties({
    spectrum: spectrum
  });
}