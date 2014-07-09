/**
 * HSV + Grays color spectrum:
 *
 * <img src="https://github.com/FokkeZB/nl.fokkezb.color/blob/master/assets/images/hsvg.png?raw=true" width="250" />
 *
 * @class Widgets.nlFokkezbColor.lib.hsvg
 * @xtype spectrum
 */

/**
 * @inheritDoc Widgets.nlFokkezbColor.lib.ghsv#image
 */
exports.image = 'images/hsvg.png';

/**
 * @inheritDoc Widgets.nlFokkezbColor.lib.ghsv#pc2hsv
 */
exports.pc2hsv = function pc2hsv(pc) {
  var third = 100 / 3;

  return {
    h: Math.round((pc.x / 100) * 359),
    s: (pc.y < third) ? 100 : Math.max(0, Math.round(100 - (((pc.y - third) * 100) / third))),
    v: (pc.y < third) ? Math.round((pc.y * 100) / third) : ((pc.y > (third * 2)) ? Math.round(100 - (((pc.y - (2 * third)) * 100) / third)) : 100)
  };
};

/**
 * @inheritDoc Widgets.nlFokkezbColor.lib.ghsv#hsv2pc
 */
exports.hsv2pc = function hsv2pc(hsv) {
  var y3p;

  if (hsv.s > 0) {

    if (hsv.b < 100) {
      y3p = hsv.b;

    } else {
      y3p = 200 - hsv.s;
    }

  } else {
    y3p = 300 - hsv.b;
  }

  return {
    x: Math.round((hsv.h * 100) / 359),
    y: Math.round((y3p * 100) / 300)
  };
};