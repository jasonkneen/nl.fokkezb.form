/**
 * Main controller of the widget.
 *
 * See the [Getting Started](#!/guide/getting_started) guide.
 *
 * @class Widgets.nlFokkezbForm.controllers.widget
 * @requires Widgets.nlFokkezbForm.lib.validator
 */

var deepExtend = require(WPATH('deepExtend'));

_.mixin({
  deepExtend: deepExtend(_)
});

/**
 * @type {Object} Exposes {@link Widgets.nlFokkezbForm.lib.validator}
 */
$.validator = require(WPATH('validator'));

$.init = init;
$.getValues = getValues;
$.setValues = setValues;
$.isValid = isValid;
$.getField = getField;

/**
 * @type {Object} The args the widget was constructed with if auto-initialize couldn't be run.
 * @private
 */
var defaults;

/**
 * @type {Object} References to all field controllers by name.
 * @private
 */
var fieldCtrls = {};

/**
 * Constructor for the form.
 *
 * Automatically calls #init if it has `args.fieldsets`, `args.fields` or `args.config`.
 *
 * @method Controller
 * @param args Arguments passed to the controller.
 
 */
(function constructor(args) {

  // we don't want these
  delete args.id;
  delete args.classes;
  delete args.__parentSymbol;
  delete args['$model'];
  delete args.__itemTemplate;

  // if we have one of these we can auto-initialize
  if (args.config || args.fieldsets || args.fields) {
    init(args);
  }

  // else we save them as defaults for init()
  else {
    defaults = args;
  }

})(arguments[0] || {});

/**
 * Initialize the form.
 *
 * Called automatically by #Controller if it has `args.fieldsets` or `args.fields`.
 *
 * @param {Object} opts Options. Either `opts.fieldsets` or `opts.fields` is required.
 * @param {String} [opts.config] Path of a CommonJS or JSON file to extend `args` with.
 * @param {Object[]} [opts.table] Optional properties to apply to the `Ti.UI.TableView`.
 * @param {Object[]} [opts.fieldsets] Array of fieldsets.
 * @param {Object[]} [opts.fields] Array of fields.
 * @param {Object} [opts.values] Values as object with field names as keys.
 * @throws {Error} If the required options are missing.
 */
function init(opts) {

  // opts can be a string we handle like opts.config
  if (typeof opts === 'string') {
    opts = {
      config: opts
    };
  }

  // we have a config file to load
  if (opts.config) {

    if (opts.config.indexOf('.json')) {
      _.extend(opts, JSON.parse(Ti.Filesystem.getFile(opts.config).read().text));

    } else {
      _.extend(opts, require(opts.config));
    }
  }

  // use the constructor's args as defaults if init() was run later
  if (defaults) {
    opts = _.deepExtend({}, defaults, opts);
  }

  if (!opts.fieldsets && !opts.fields) {
    throw 'Either `opts.fieldsets` or `opts.fields` is required.';
  }

  // user can either pass an array or fieldsets or just fields we'll wrap it in one
  if (!opts.fieldsets) {
    opts = {
      fieldsets: _.omit(opts, 'values'),
      values: opts.values
    };
  }

  // values for the fields
  opts.values = opts.values || {};

  render(opts);
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
 * @param  {Object[]} opts  See #init
 */
function render(opts) {

  // user can pass custom table properties
  var tableProp = opts.table || {};

  // create array for sections unless user gave some
  tableProp.sections = tableProp.sections || [];

  // for each fieldset
  _.each(opts.fieldsets, function(fieldset) {

    // user can pass custom section properties
    var sectionProp = fieldset.section || {};

    // create array for rows unless user gave some
    sectionProp.rows = sectionProp.rows || [];

    // add class for styling unless user gave some
    sectionProp.classes = sectionProp.classes || ['section'];

    // user can pass legend or legendid we'll use as headerTitle
    if (fieldset.legend) {
      sectionProp.headerTitle = fieldset.legend;

    } else if (fieldset.legendid) {
      sectionProp.headerTitle = L(fieldset.legendid);
    }

    // for each field
    _.each(fieldset.fields, function(field) {

      // field can be a Ti.UI.TableViewRow
      // FIXME: apiName is Ti.View (https://jira.appcelerator.org/browse/TC-4278)
      if (field.apiName) {
        sectionProp.rows.push(field);

      } else {

        // user can either pass value in field or in separate 'values' arg
        if (opts.values[field.name]) {
          field.value = opts.values[field.name];
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
        sectionProp.rows.push(fieldCtrl.getViewEx({

          // makes sure we get an actual view and not the row controller
          recurse: true
        }));
      }

    });

    // create the section, extending TSS style by args
    var section = $.UI.create('TableViewSection', sectionProp);

    // push the section
    tableProp.sections.push(section);

  });

  // set the table
  $.table.applyProperties(tableProp);
}

/**
 * Get the controller of a field, e.g. to call its value, validation or focus methods.
 *
 * @param  {String} name        Name of the field to get.
 * @return {Object|undefined}   Controller of the field or `undefined` if not found.
 */
function getField(name) {
  return fieldCtrls[name];
}

/**
 * Validate all fields.
 *
 * @return {Boolean} Returns `true` if all fields are valid.
 */
function isValid() {
  var valid = true;

  _.each(fieldCtrls, function(fieldCtrl, name) {
    valid = valid && fieldCtrl.isValid();
  });

  return valid;
}

/**
 * Handles the table's `singletap` event.
 *
 * @private
 * @param  {Object} e Event dictionary.
 */
function onTableSingletap(e) {

  // click on a TableView headerView or custom row
  if (!e.row || !e.row._name) {
    return;
  }

  fieldCtrls[e.row._name].focus();
}