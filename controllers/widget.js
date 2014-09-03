/**
 * Main controller of the widget.
 *
 * See the [Getting Started](#!/guide/getting_started) guide.
 *
 * @class Widgets.nlFokkezbForm.controllers.widget
 * @requires Widgets.nlFokkezbForm.lib.validator
 */

var deepExtend = require(WPATH('deepExtend'));

/**
 * @event change
 * Fired when the value of the field changes.
 *
 * @param {Object} e Event
 * @param {String} e.field The name of the field that has changed.
 * @param {Mixed} e.value The new value.
 * @param {Object} e.form The form controller.
 */

/**
 * @type {Object} Exposes {@link Widgets.nlFokkezbForm.lib.validator}
 */
$.validator = require(WPATH('validator'));

$.init = init;
$.getValues = getValues;
$.setValues = setValues;
$.isValid = isValid;
$.getField = getField;

/*
 * @type {Object} The args the widget was constructed with if auto-initialize couldn't be run.
 * @private
 */
var defaults;

/*
 * @type {Object} References to all field controllers by name.
 * @private
 */
var fieldCtrls = {};

/*
 * @type {Function} Form-wide listener added via #init.
 */
var listener;

/*
 * @type {Function} Filters values before returning them.
 */
var filter;

/*
 * @type {Object} Values set the form (only updated when calling getValues!)
 */
var values = {};

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
 * @param {Object} opts                Options. Either `opts.fieldsets` or `opts.fields` is required.
 * @param {String} [opts.config]       Path of a CommonJS or JSON file to extend `args` with.
 * @param {Object[]} [opts.table]      Optional properties to apply to the `Ti.UI.TableView`.
 * @param {Object[]} [opts.fieldsets]  Array of fieldsets.
 * @param {Object[]} [opts.fields]     Array of fields.
 * @param {Object} [opts.values]       Values as object with field names as keys.
 * @param {Function} [opts.listener]   Listener for the form's #change event.
 * @param {Function} [opts.filter]     Function to filter values before returning them.
 *
 * @throws {Error} If the required options are missing.
 */
function init(opts) {

  // opts can be a string we handle like opts.config
  if (typeof opts === 'string') {
    opts = {
      config: opts
    };
  }

  // clone input opts and apply defaults set in constructor
  opts = deepExtend({}, defaults || {}, opts);

  // we have a config file to load
  if (opts.config) {

    // JSON
    if (opts.config.indexOf('.json') !== -1) {
      opts = deepExtend(opts, JSON.parse(Ti.Filesystem.getFile(opts.config).read().text));
    }

    // CommonJS
    else {
      var cjs = require(opts.config);
      var config;

      // Function
      if (_.isFunction(cjs)) {

        // can be either sync or async
        config = cjs($, opts, function(config) {
          opts = deepExtend(opts, config);

          render(opts);
        });

        // Async
        if (!config) {
          return;
        }
      }

      // Object
      else {
        config = cjs;
      }

      opts = deepExtend(opts, config);
    }
  }

  render(opts);
}

/*
 * Continue init after config has been loaded
 *
 * @private
 * @param {Object} Options from constructor, init and config files merged.
 */
function render(opts) {

  if (!opts.fieldsets && !opts.fields) {
    throw 'Either `opts.fieldsets` or `opts.fields` is required.';
  }

  // user can either pass an array or fieldsets or just fields we'll wrap it in one
  if (!opts.fieldsets && opts.fields) {
    opts.fieldsets = [{
      fields: opts.fields,
      section: opts.section,
      legend: opts.legend,
      legendid: opts.legendid
    }];
    delete opts.fields;
  }

  // values for the fields
  values = opts.values || {};

  // clean-up listeners
  _.each(fieldCtrls, function(fieldCtrl, name) {
    fieldCtrl.off();
  });

  // user can pass custom table properties
  var tableProp = opts.table || {};

  // create array for sections unless user gave some
  tableProp.sections = tableProp.sections || [];

  // for each fieldset
  _.each(opts.fieldsets, function(fieldset) {
    var section;

    // user can pass section properties
    var sectionProp = fieldset.section || {};

    // user can pass Ti.UI.TableViewSection
    if (sectionProp.apiName === 'Ti.UI.TableViewSection') {
      section = sectionProp;

    } else {

      // user or default classesƒ
      sectionProp.classes = sectionProp.classes || ['section'];

      // create the section, extending TSS style by args
      section = $.UI.create('TableViewSection', sectionProp);
    }

    // user can pass legend or legendid we'll use as headerTitle
    if (fieldset.legend) {
      section.headerTitle = fieldset.legend;

    } else if (fieldset.legendid) {
      section.headerTitle = L(fieldset.legendid);
    }

    // cascade form-wide row properties
    if (opts.row) {
      fieldset.row = _.defaults(fieldset.row || {}, opts.row);
    }

    // for each field
    _.each(fieldset.fields, function(field) {

      // allow for `null` or `undefined` values
      if (!field) {
        return;
      }

      // field can be a Ti.UI.TableViewRow
      // FIXME: apiName is Ti.View (https://jira.appcelerator.org/browse/TC-4278)
      if (field.apiName) {
        section.add(field);

      } else {

        // user can either pass value in field or in separate 'values' arg
        // set both to use the field's value as default
        if (values[field.name]) {
          field.value = values[field.name];
        }

        // cascade fieldset-wide row properties
        if (fieldset.row) {
          field.row = _.defaults(field.row || {}, fieldset.row);
        }

        field.form = $;

        var fieldCtrl;

        // user can specify a controller to deliver the row
        if (field.controller) {
          fieldCtrl = Alloy.createController(field.controller, field);

        } else {

          // user can specify a widget and or widget view (type) to deliver the row
          fieldCtrl = Alloy.createWidget(field.widget || 'nl.fokkezb.form', field.type || 'text', field);
        }

        // pass field events on to the form listeners
        fieldCtrl.on('change', function(e) {
          $.trigger('change change:' + e.field, e);

          // form-wide listener set via init
          if (listener) {
            listener(e);
          }

        });

        // keep a reference to the widget
        fieldCtrls[field.name] = fieldCtrl;

        var row = fieldCtrl.getViewEx({

          // makes sure we get an actual view and not the row controller
          recurse: true
        });

        //Manually pass the options and name for Android
        if(OS_ANDROID) {
            row.options = field.options
            row._name = field.name;
        }

        // push the views of the controller as row
        section.add(row);
      }

    });

    // push the section
    tableProp.sections.push(section);

  });

  // set the table
  $.table.applyProperties(tableProp);

  // Set the section manually for Android
  if(OS_ANDROID) $.table.setSections(tableProp.sections);

  // add listener
  if (opts.listener) {
    listener = opts.listener;
  }

  // add filter
  if (opts.filter) {
    filter = opts.filter;
  }
}

/**
 * Get all field values.
 *
 * @return {Object} Values as object with field names as keys.
 */
function getValues() {

  _.each(fieldCtrls, function(fieldCtrl, name) {
    values[name] = fieldCtrl.getValue();
  });

  if (filter) {
    values = filter(values);
  }

  return values;
}

/**
 * Set field values.
 *
 * @param {Object} Values as object with field names as keys.
 */
function setValues(values) {

  _.each(values, function(value, name) {

    // values could contain properties for which we don't have a field
    if (fieldCtrls[name]) {
      fieldCtrls[name].setValue(value);
    }
  });
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

/*
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
