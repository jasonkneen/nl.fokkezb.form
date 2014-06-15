/**
 * Main controller of the widget
 *
 *     @example
 *     Alloy.createWidget('nl.fokkezb.form', {
 *       fieldsets: [{
 *         legend: L('form_common_general'),
 *         fields: [{
 *           name: 'code',
 *           label: L('form_common_code'),
 *           type: 'text'
 *         }, {
 *           name: 'employeeNumber',
 *           label: L('form_resource_employeeNumber'),
 *           type: 'text'
 *         }, {
 *           name: 'firstNames',
 *           label: L('form_resource_firstNames'),
 *           type: 'text'
 *         }, {
 *           name: 'lastName',
 *           label: L('form_resource_lastName'),
 *           type: 'text'
 *         }]
 *       }]
 *     });
 *
 * @class Widgets.nlFokkezbForm.controllers.widget
 */

$.getValues = getValues;
$.setValues = setValues;

/**
 * @type {Object} References to all field controllers by name.
 * @private
 */
var fieldCtrls = {};

/**
 * Constructor for the form.
 *
 * Automatically calls #init if it has `args.fieldsets` or `args.fields`.
 *
 * @constructor
 * @method Controller
 * @param args Arguments passed to the controller.
 * @param {String} [args.config] Path of a CommonJS or JSON file to extend `args` with.
 */
(function constructor(args) {

  if (args.config) {

    if (args.config.indexOf('.json')) {
      _.extend(args, JSON.parse(Ti.Filesystem.getFile(args.config).read().text));

    } else {
      _.extend(args, require(args.config));
    }
  }

  // these are required, but we
  if (args.fieldsets || args.fields) {
    init(args);
    return;
  }

})(arguments[0] || {});

/**
 * Initialize the form.
 *
 * Called automatically by #Controller if it has `args.fieldsets` or `args.fields`.
 *
 * @param opts Options. Either `opts.fieldsets` or `opts.fields` is required.
 * @param {Object[]} [opts.fieldsets] Array of fieldsets.
 * @param {Object[]} [opts.fields] Array of fields.
 * @param {Object} [opts.values] Values as object with field names as keys.
 * @throws {Error} If the required options are missing.
 */
function init(opts) {
  var fieldsets, values;

  if (!opts.fieldsets && !opts.fields) {
    throw 'Either `opts.fieldsets` or `opts.fields` is required.';
  }

  // user can either pass an array or fieldsets or just fields we'll wrap in one
  fieldsets = opts.fieldsets || [{
    fields: opts.fields
  }];

  // values for the fields
  values = opts.values || {};

  render(fieldsets, values);
}

/**
 * Get all field values.
 *
 * @return {Object} Values as object with field names as keys.
 */
function getValues() {

  var values = {};

  _.each(fieldCtrls, function(fieldCtrl, name) {
    values[name] = fieldCtrl.getValue();
  });

  return values;
}

/**
 * Set field values.
 *
 * @param {Object} Values as object with field names as keys.
 */
function setValues(values) {

  _.each(values, function(value, name) {
    fieldCtrls[name].setValue(value);
  });
}

/**
 * Renders the form.
 *
 * @private
 * @param  {Object[]} fieldsets  Array of fieldset Objects
 * @param  {Object} values       Object containing values
 */
function render(fieldsets, values) {

  // keeps a section for each fieldset
  var sections = [];

  // for each fieldset
  _.each(fieldsets, function(fieldset) {

    // user can pass custom section args
    var sectionArgs = fieldset.section || {};

    // keeps a row for each field
    sectionArgs.rows = sectionArgs.rows || [];

    // user can pass legend we'll use as headerTitle
    if (fieldset.legend) {
      sectionArgs.headerTitle = fieldset.legend;
    }

    // for each field
    _.each(fieldset.fields, function(field) {

      // user can either pass value in field or in separate 'values' arg
      if (values[field.name]) {
        field.value = values[field.name];
      }

      var fieldCtrl;

      // user can specify a controller to deliver the row
      if (field.controller) {
        fieldCtrl = Alloy.createController(field.controller, field);

      } else {

        // user can specify a widget and or widget view (type) to deliver the row
        fieldCtrl = Alloy.createWidget(field.widget || 'nl.fokkezb.form', field.type || 'text', field);
      }

      // keep a reference to the widget
      fieldCtrls[field.name] = fieldCtrl;

      // push the views of the controller as row
      sectionArgs.rows.push(fieldCtrl.getViewEx({

        // makes sure we get an actual view and not the row controller
        recurse: true
      }));

    });

    // create the section, extending TSS style by args
    var section = $.UI.create('TableViewSection', sectionArgs);

    // push the section
    sections.push(section);

  });

  // set the table
  $.table.data = sections;
}

function onTableClick(e) {

  var name = _.keys(fieldCtrls)[e.index];

  fieldCtrls[name].focus();
}