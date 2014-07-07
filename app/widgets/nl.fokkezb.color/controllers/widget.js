/**
 * Exposes a view displaying the HSV color space that can have any size and works
 * with any default system unit. By tapping or dragging the user can #change the
 * selected color, which will be returned in HSV, RGB and HEX.
 *
 * Inspired by: [https://github.com/JigarM/TiColorPicker/]()
 *
 * @class Widgets.nlFokkezbColor.controllers.widget
 * @requires Widgets.nlFokkezbColor.lib.convert
 */

/* exported onPostlayout, onColorChange */

/** @property {Object} convert  The Widgets.nlFokkezbColor.lib.convert library. */
$.convert = require(WPATH('convert'));

/**
 * @property {Object} color  Current color
 *
 * @property {Object} color.hsv    Color in HSV
 * @property {Number} color.hsv.h  Hue (0 - 359)
 * @property {Number} color.hsv.s  Saturation (0 - 100)
 * @property {Number} color.hsv.v  Value (0 - 100)
 *
 * @property {Object} color.rgb    Color in RGB
 * @property {Number} color.rgb.r  Red (0 - 255)
 * @property {Number} color.rgb.g  Green (0 - 255)
 * @property {Number} color.rgb.b  Blue (0 - 255)
 *
 * @property {String} color.hex  Color in HEX
 *
 * @property {String} color.bw  Either `white` or `black` depending on contrast.
 */
Object.defineProperty($, 'color', {
  get: getColor,
  set: setColor
});

/**
 * Set the current color.
 *
 * This can be formatted as #color or any of it's properties.
 *
 * @param {Object|String} clr  Color to set
 */
$.setColor = setColor;

/**
 * Get the current color.
 *
 * @return {Object}  Current #color
 */
$.getColor = getColor;

/**
 * Fired when the user changes the color.
 *
 * @event change
 *
 * @param {Object} e        Event
 * @param {Object} e.color  Current #color
 */

// private vars
var rect, unit, color;

/**
 * Constructor for the widget.
 *
 * @method  Controller
 * @param {Object} args  Arguments passed to the controller, which will be applied to the main view.
 * @param {Object|String} [args.color]  The color to set.
 * @param {Array} [args.children]       Child views to overlay.
 */
(function constuctor(args) {

  if (args.color) {
    setColor(args.color);
    delete args.color;
  }

  if (args.children) {
    _.each(args.children, function(child) {
      $.image.add(child);
    });
  }

  $.image.applyProperties(_.omit(args, 'id', '__parentSymbol', '__itemTemplate', '$model', 'children'));

})(arguments[0] || {});

function setColor(clr) {

  parseColor(clr);

  setCircle();
}

function getColor() {
  return color;
}

function onPostlayout(e) { // jshint unused:false

  $.image.removeEventListener('postlayout', onPostlayout);

  rect = $.image.rect;

  setCircle();
}

function onColorChange(e) {
  var x = e.x,
    y = e.y;

  // Android doesn't return these in system unit, but always in px
  if (OS_ANDROID) {

    var def = getDefaultUnit();

    if (def !== Ti.UI.UNIT_PX) {
      x = Ti.UI.convertUnits(x.toString() + 'px', def);
      y = Ti.UI.convertUnits(y.toString() + 'px', def);
    }
  }

  x = Math.max(0, Math.min(rect.width, x));
  y = Math.max(0, Math.min(rect.height, y));

  // position circle
  $.circle.applyProperties({
    center: {
      x: x,
      y: y
    },
    borderColor: color.bw
  });

  $.circle.show();

  var imageThird = (rect.height / 3);

  var hsv = {
    h: Math.round((x / rect.width) * 359),
    s: (y < imageThird) ? 100 : Math.max(0, Math.round(100 - (((y - imageThird) * 100) / imageThird))),
    v: (y < imageThird) ? Math.round((y * 100) / imageThird) : ((y > (imageThird * 2)) ? Math.round(100 - (((y - (2 * imageThird)) * 100) / imageThird)) : 100)
  };

  var rgb = $.convert.hsv2rgb(hsv);
  var hex = $.convert.rgb2hex(rgb);
  var bw = $.convert.hsv2bw(hsv);

  // save as current color 
  color = {
    hsv: hsv,
    rgb: rgb,
    hex: hex,
    bw: bw
  };

  // broadcast change
  $.trigger('change', color);
}

function parseColor(clr) {
  var hsv, rgb, hex, bw;

  if (_.isObject(clr)) {

    if (clr.h) {
      hsv = clr;
      rgb = $.convert.hsv2rgb(hsv);
      hex = $.convert.rgb2hex(rgb);

    } else if (clr.r) {
      rgb = clr;
      hex = $.convert.rgb2hex(rgb);
      hsv = $.convert.rgb2hsv(rgb);

    } else {
      color = clr;

      return;
    }

  } else {
    hex = clr;
    rgb = $.convert.hex2rgb(hex);
    hsv = $.convert.rgb2hsv(rgb);
  }

  bw = $.convert.hsv2bw(hsv);

  color = {
    hsv: hsv,
    rgb: rgb,
    hex: hex,
    bw: bw
  };
}

function setCircle() {

  if (rect && color) {

    var yP;

    if (color.hsv.s > 0) {

      if (color.hsv.b < 100) {
        yP = color.hsv.b;

      } else {
        yP = 200 - color.hsv.s;
      }

    } else {
      yP = 300 - color.hsv.b;
    }

    $.circle.applyProperties({
      center: {
        x: Math.round((color.hsv.h * rect.width) / 359),
        y: Math.round((yP * rect.height) / 300)
      },
      borderColor: color.bw
    });

    $.circle.show();

  } else {
    $.circle.hide();
  }
}

function getDefaultUnit() {

  if (!unit) {

    var defaultUnit = Ti.App.Properties.getString('ti.ui.defaultunit');

    var units = {
      'dp': Ti.UI.UNIT_DIP,
      'dip': Ti.UI.UNIT_DIP,
      'in': Ti.UI.UNIT_IN,
      'cm': Ti.UI.UNIT_CM,
      'mm': Ti.UI.UNIT_MM,
      'px': Ti.UI.UNIT_PX
    };

    if (!units[defaultUnit]) {
      throw 'Unknown ti.ui.defaultunit: ' + defaultUnit;
    }

    unit = units[defaultUnit];
  }

  return unit;
}