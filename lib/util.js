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
 * @param  {Object} obj        Arguments in which the key can be found.
 * @param  {String} key        Property or property+id to find in obj
 * @param  {String} string     Property or property+id to set in properties
 * @return {Object}            Extracted properties
 */
function extractProperties(obj, key, string) {
  var properties;

  var keyId = key + 'id';

  if (typeof obj[key] === 'object') {
    properties = obj[key];
  } else {
    properties = {};

    if (obj[key]) {
      properties[string] = obj[key];

    } else if (obj[keyId]) {
      properties[string] = L(obj[keyId]);
    }
  }

  delete obj[key];
  delete obj[keyId];

  return properties;
}
