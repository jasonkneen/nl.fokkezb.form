/**
 * Exposes a view displaying the HSV color space that can have any size and works
 * with any default system unit. By tapping or dragging the user can #change the
 * selected color, which will be returned in HSV, RGB and HEX.
 *
 * Inspired by: [https://github.com/JigarM/TiColorPicker/]()
 *
 * # Built-in spectrums
 *
 * The default color spectrum is {@link Widgets.nlFokkezbColor.lib.ghsv ghsv},
 * but you can also set this to {@link Widgets.nlFokkezbColor.lib.hsvg hsvg}
 * or {@link Widgets.nlFokkezbColor.lib.hsv hsv}.
 *
 * # Custom spectrums
 *
 * You can also set the `spectrum` argument to a custom type. Just pass an
 * object exposing the required `image` property (start your path by `/` to
 * prevent the widget to prepend the widget asset path) and the `pc2hsv`
 * and `hsv2pc` methods as with the builtins.
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

$.applyProperties = applyProperties;

/**
 * Fired when the user changes the color.
 *
 * @event change
 *
 * @param {Object} e        Event
 * @param {Object} e.color  Current #color
 */

// private vars
var spectrum, rect, unit, color;

/**
 * Constructor for the widget.
 *
 * @method  Controller
 * @param {Object} args  Arguments passed to the controller, which will be applied to the main view.
 * @param {Object|String} [args.color]  The color to set.
 * @param {Object|String} [args.spectrum]  One of the built-in color spectrum names or an object exposing one.
 * @param {Array} [args.children]       Child views to overlay.
 */
(function constuctor(args) {

  if (args.children) {
    _.each(args.children, function(child) {
      $.image.add(child);
    });
  }

  args.spectrum = args.spectrum || 'ghsv';

  applyProperties(args);

})(arguments[0] || {});

/**
 * Set properties for the widget.
 *
 * @param {Object} prop                    Properties to apply to the main view.
 * @param {Object|String} [prop.color]     The color to set.
 * @param {Object|String} [prop.spectrum]  One of the built-in color spectrum names or an object exposing one.
 */
function applyProperties(prop) {

  if (prop.spectrum) {
    spectrum = _.isObject(prop.spectrum) ? prop.spectrum : require(WPATH(prop.spectrum));

    var image = spectrum.image;

    if (image.substr(0, 1) !== '/') {
      image = WPATH(image);
    }

    prop.backgroundImage = image;
  }

  var apply = _.omit(prop, 'id', '__parentSymbol', '__itemTemplate', '$model', 'children', 'color', 'spectrum');

  if (_.size(apply) > 0) {
    $.image.applyProperties(apply);
  }

  if (prop.color) {
    setColor(prop.color);

  } else if (prop.spectrum) {
    setCircle();
  }
}

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

  // convert px to pc
  var pc = {
    x: (x / rect.width) * 100,
    y: (y / rect.height) * 100
  };

  // convert pc to hsv
  var hsv = spectrum.pc2hsv(pc);

  // convert to other spectrums
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

  // position circle
  $.circle.applyProperties({
    center: {
      x: x,
      y: y
    },
    borderColor: bw
  });

  $.circle.show();

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

  } else if (_.isString(clr)) {
    hex = clr;
    rgb = $.convert.hex2rgb(hex);

    if (!rgb) {
      return;
    }

    hsv = $.convert.rgb2hsv(rgb);

  } else {
    return;
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

    // convert hsv to pc
    var pc = spectrum.hsv2pc(color.hsv);

    // convert pc to px
    var px = {
      x: rect.width * (pc.x / 100),
      y: rect.height * (pc.y / 100)
    };

    $.circle.applyProperties({
      center: px,
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