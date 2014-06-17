/**
 * Utilities.
 *
 * @class Widgets.nlFokkezbForm.lib.util
 * @private
 */

exports.extractProperties = extractProperties;

/**
 * Extracts properties out of arguments. Best understood by example:
 *
 *     @example
 *     extractProperties({ label:'foo' }, 'label', 'text');
 *     // { text:'foo' }
 *     
 *     extractProperties({ labelid:'foo' }, 'label', 'text');
 *     // { text: L('foo') }
 *     
 *     extractProperties({ label:{ text:'foo', color:'red' } }, 'label', 'text');
 *     // { text:'foo', color:'red' }
 *
 * @param  {Object} arguments  Arguments in which the key can be found.
 * @param  {String} key        Property or property+id to find in arguments
 * @param  {String} string     Property or property+id to set in properties
 * @return {Object}            Extracted properties
 */
function extractProperties(arguments, key, string) {
  var properties;

  var keyId = key + 'id';

  if (typeof arguments[key] === 'object') {
    properties = arguments[key];
  } else {
    properties = {};

    if (arguments[key]) {
      properties[string] = arguments[key];

    } else if (arguments[keyId]) {
      properties[string] = L(arguments[keyId]);
    }
  }

  delete arguments[key];
  delete arguments[keyId];

  return properties;
};