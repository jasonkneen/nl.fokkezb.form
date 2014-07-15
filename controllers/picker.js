/**
 * Controller for the date/time picker field type.
 *
 * The date/picker picker field type is a `Ti.UI.Label` to display current and a `Ti.UI.Picker` to change the value.
 *
 * *WARNING:* Only support iPad and Android date/time for now.
 *
 * @class Widgets.nlFokkezbForm.controllers.picker
 * @extends Widgets.nlFokkezbForm.controllers.field
 * @xtype picker
 */

var moment = require('alloy/moment');

exports.baseController = '../widgets/nl.fokkezb.form/controllers/field';

$.focus = focus;
$.setValue = setValue;
$.getValue = getValue;

var m;

var picker = {
  type: Ti.UI.PICKER_TYPE_DATE,
  valueFormat: 'YYYY-MM-DD'
};

/**
 * Constructor.
 *
 * @constructor
 * @method Controller
 * @param args Arguments which will also be used to call {@link Widgets.nlFokkezbForm.controllers.field#Controller}.
 * @param {Object} [args.input] Properties to apply to the `Ti.UI.Label`.
 * @param {Object} [args.picker] Properties to apply to the `Ti.UI.Picker`.
 * @param {Number} [args.picker.type=Ti.UI.PICKER_TYPE_DATE] On Android, if this is `Ti.UI.PICKER_TYPE_DATE` or `Ti.UI.PICKER_TYPE_TIME` this will trigger the related dialogs.
 * @param {String} [args.picker.valueFormat="YYYY-MM-DD"] Format in which the value is set and get.
 * @param {String} [args.picker.textFormat] Format in which the value is displayed (defaults to `valueFormat`).
 * @param {String|Object} args.label Will be used for the popover title as well.
 */
(function constructor(args) {

  // extend picker defaults
  picker = _.extend(picker, args.picker || {});
  $.picker.applyProperties(picker);

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

  // compose view
  if (Ti.Platform.osname === 'ipad') {
    $.popover.title = $.label.text;
    $.popover.add($.picker);
  }

})(arguments[0]);

/**
 * Displays an option dialog to change value.
 *
 * This method is called by {@link Widgets.nlFokkezbForm.controllers.widget} when the user clicks on the row.
 */
function focus() {

  var date;

  if (m) {

    // picker needs a year, also for time
    if (m.year() === 0) {

      date = moment(m).year(2000).toDate();
    } else {
      date = m.toDate();
    }
  }

  $.picker.value = date;

  if (Ti.Platform.osname === 'ipad') {
    $.popover.show({
      view: $.input
    });

  } else if (picker.type === Ti.UI.PICKER_TYPE_DATE) {
    $.picker.showDatePickerDialog({
      cancel: onDialogClose
    });

  } else if (picker.type === Ti.UI.PICKER_TYPE_TIME) {
    $.picker.showTimePickerDialog({
      cancel: onDialogClose
    });

  } else {
    throw 'Only support iPad and Android date/time for now.'
  }
}

function setValue(value) {
  var mom = moment(value, (typeof value === 'string') ? picker.valueFormat : undefined);

  if (!mom) {
    console.error('Invalid value: ' + JSON.stringify(value));
    return;
  }

  m = mom;

  $.input.text = m.format(picker.textFormat || picker.valueFormat);
}

function getValue() {
  return m ? m.format(picker.valueFormat) : null;
}

function onDoneClick(e) {

  onDialogClose({
    value: $.picker.value
  });

  onCancelClick(e);
}

function onCancelClick(e) {
  $.popover.hide();
}

function onDialogClose(e) {

  if (!e.cancel) {
    $.setValue(e.value);
    $.change();
  }
}