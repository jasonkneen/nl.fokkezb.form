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
$.setValue = setValue;
$.getValue = getValue;

var options;
var value;
var iPadArrow = false;
var cancel = L('nlFokkezbForm_cancel', 'Cancel');

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.Label`.
 * @param {Array|Object} options An `Array` or `Object` in which values are keys and values are labels to display.
 * @param {String|Object} args.label Will be used for the dialog title as well.
 * @param {Boolean} [iPadArrow=false] If `true` it will attach the dialog to the input on iPads.
 */
(function constructor(args) {

  options = args.options || [];
  iPadArrow = args.iPadArrow === true;
  
  if (_.has(args, 'cancel')) {
    cancel = args.cancel;
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

  var labels = _.values(options);
  labels.push(cancel);
  var cancelIndex = labels.length - 1;

  var selectedIndex = _.isArray(options) ? value : _.indexOf(_.keys(options), value);

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

    var val = _.isArray(options) ? e.index : _.keys(options)[e.index];

    setValue(val);

  });

  dialog.show(iPadArrow ? {
    view: $.input
  } : {});
}

function setValue(val) {
  value = val;

  $.input.text = options[value];
}

function getValue() {
  return value;
}