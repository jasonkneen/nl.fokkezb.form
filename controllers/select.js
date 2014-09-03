/**
 * Controller for the select field type.
 *
 * The select field type is a `Ti.UI.Label` to display current and a `Ti.UI.OptionDialog` to change the selected option.
 *
 * @class Widgets.nlFokkezbForm.controllers.select
 * @extends Widgets.nlFokkezbForm.controllers.field
 * @xtype select
 */

exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';

$.focus = focus;
$.getValue = getValue;
$.setValue = setValue;

var value;

var config = {
  options: [],
  iPadArrow: true,
  cancel: L('nlFokkezbForm_cancel', 'Cancel')
};

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {String|Object} args.label Will be used for the dialog title as well.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.Label`.
 * @param {Object} args.select Settings for the select.
 * @param {Array|Object} args.select.options An `Array` or `Object` in which values are keys and values are labels to display.
 * @param {Boolean} [args.select.iPadArrow=false] If `true` it will attach the dialog to the input on iPads.
 * @param {String} [args.select.cancel=L('nlFokkezbForm_cancel', 'Cancel')] Text for the cancel option.
 */
(function constructor(args) {

  if (args.select) {
    _.extend(config, args.select);
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
 * Displays an option dialog to change value.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on the row.
 */
function focus() {

  var labels = _.values(config.options);
  labels.push(config.cancel);
  var cancelIndex = labels.length - 1;

  var selectedIndex = _.isArray(config.options) ? value : _.indexOf(_.keys(config.options), value);

  var dialog = Ti.UI.createOptionDialog({
    cancel: cancelIndex,
    options: labels,
    selectedIndex: selectedIndex,
    title: $.label.text
  });

  dialog.addEventListener('click', function(e) {

    if (OS_ANDROID ? e.cancel : (e.index === e.cancel)) {
      return;
    }

    var val = _.isArray(config.options) ? e.index : _.keys(config.options)[e.index];

    $.setValue(val);
    $.change();

  });

  dialog.show(config.iPadArrow ? {
    view: $.input
  } : {});
}

function getValue() {
  return value;
}

function setValue(val) {
  value = val;

  $.input.text = config.options[value];
}