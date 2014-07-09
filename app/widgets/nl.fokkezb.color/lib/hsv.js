/**
 * HSV color spectrum:
 *
 * <img src="https://github.com/FokkeZB/nl.fokkezb.color/blob/master/assets/images/hsv.png?raw=true" width="250" />
 *
 * @class Widgets.nlFokkezbColor.lib.hsv
 * @xtype spectrum
 */

/**
 * @inheritDoc Widgets.nlFokkezbColor.lib.ghsv#image
 */
exports.image = 'images/hsv.png';

/**
 * @inheritDoc Widgets.nlFokkezbColor.lib.ghsv#pc2hsv
 */
exports.pc2hsv = function pc2hsv(pc) {
  return {
    h: Math.round((pc.x / 100) * 359),
    s: (pc.y < 50) ? 100 : Math.round((100 - pc.y) * 2),
    v: (pc.y > 50) ? 100 : Math.round(pc.y * 2)
  };
};

/**
 * @inheritDoc Widgets.nlFokkezbColor.lib.ghsv#hsv2pc
 */
exports.hsv2pc = function hsv2pc(hsv) {
  return {
    x: Math.round((hsv.h * 100) / 359),
    y: Math.round((hsv.s < 100) ? (100 - (hsv.s / 2)) : (hsv.b / 2))
  };
};