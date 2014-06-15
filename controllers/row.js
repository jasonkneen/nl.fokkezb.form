/**
 * Controller for the row wrapping (most of) the field types.
 *
 * @class Widgets.nlFokkezbForm.controllers.row
 */

$.init = init;

/**
 * Constructor for the row.
 *
 * @constructor
 * @method Controller
 * @param args Arguments passed to the controller.
 * @param {Object[]} [args.children] Child elements which this widget wraps. These will be added to the rows' input view.
 */
(function constructor(args) {

  _.each(args.children, function(child) {
    $.input.add(child);
  });

})(arguments[0]);

/**
 * Initialize the row.
 *
 * @param {Object} opts Options to initialize
 * @param {Object|String} [opts.label] Properties to apply to the `Ti.UI.Label` or value for the text property.
 */
function init(opts) {
  var label;

  // user can either pass label opts or just text
  label = (typeof opts.label === 'object') ? opts.label : {
    text: opts.label || ''
  };
  delete opts.label;

  // label properties to apply
  if (_.size(label) > 0) {
    $.label.applyProperties(label);
  }

  // position the input right of the label, whereever that is.
  $.input.left = $.label.width;
}