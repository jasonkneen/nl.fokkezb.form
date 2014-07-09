/**
 * Grays + HSV color spectrum:
 *
 * <img src="https://github.com/FokkeZB/nl.fokkezb.color/blob/master/assets/images/ghsv.png?raw=true" width="250" />
 *
 * @class Widgets.nlFokkezbColor.lib.ghsv
 * @xtype spectrum
 */

/**
 * The image displaying the spectrum.
 * 
 * @property {String}
 */
exports.image = 'images/ghsv.png';

/**
 * Convert percentage x and y to HSV
 * 
 * @param {Object} pc    Coordinates in percentages
 * @param {Number} pc.x  X-coordinate
 * @param {Number} pc.y  Y-coordinate
 * 
 * @return {Object}           Color in HSV
 * @return {Number} return.h  Hue (0 - 359)
 * @return {Number} return.s  Saturation (0 - 100)
 * @return {Number} return.v  Value (0 - 100)
 */
exports.pc2hsv = function pc2hsv(pc) {
  var third = 100 / 3;

  if (pc.y < third) {
    s = 0;
    v = Math.round(100 - (pc.y * 3));

  } else if (pc.y < (2 * third)) {
    s = 100;
    v = Math.round((pc.y - third) * 3);

  } else {
    s = Math.round(100 - ((pc.y - third - third) * 3));
    v = 100;
  }

  return {
    h: Math.round((pc.x / 100) * 359),
    s: s,
    v: v
  };
};

/**
 * Convert percentage x and y to HSV
 *
 * @param {Object} hsv    Color in HSV
 * @param {Number} hsv.h  Hue (0 - 359)
 * @param {Number} hsv.s  Saturation (0 - 100)
 * @param {Number} hsv.v  Value (0 - 100)
 * 
 * @return {Object}           Coordinates in percentages
 * @return {Number} return.x  X-coordinate
 * @return {Number} return.y  Y-coordinate
 */
exports.hsv2pc = function hsv2pc(hsv) {
  var y3p;

  if (hsv.s > 0) {

    if (hsv.b < 100) {
      y3p = 100 + hsv.b;

    } else {
      y3p = 300 - hsv.s;
    }

  } else {
    y3p = 100 - hsv.b;
  }

  return {
    x: Math.round((hsv.h * 100) / 359),
    y: Math.round((y3p * 100) / 300)
  };
};