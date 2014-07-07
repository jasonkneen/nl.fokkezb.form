/**
 * Converts from once color space to an other.
 *
 * Also exposed via Widgets.nlFokkezbColor.controllers.widget#convert.
 *
 * @class Widgets.nlFokkezbColor.lib.convert
 */

/**
 * Converts HSV to RGB.
 *
 * Adapted from: [https://www.npmjs.org/package/color-convert]().
 *
 * @param {Object} hsv    Color in HSV
 * @param {Number} hsv.h  Hue (0 - 359)
 * @param {Number} hsv.s  Saturation (0 - 100)
 * @param {Number} hsv.v  Value (0 - 100)
 *
 * @return {Object}           Color in RGB
 * @return {Number} return.r  Red (0 - 255)
 * @return {Number} return.g  Green (0 - 255)
 * @return {Number} return.b  Blue (0 - 255)
 */
exports.hsv2rgb = function hsv2rgb(hsv) {
    var h = hsv.h / 60,
        s = hsv.s / 100,
        v = hsv.v / 100,
        hi = Math.floor(h) % 6;

    var f = h - Math.floor(h),
        p = Math.round(255 * v * (1 - s)),
        q = Math.round(255 * v * (1 - (s * f))),
        t = Math.round(255 * v * (1 - (s * (1 - f))));

    v = Math.round(255 * v);

    switch (hi) {
        case 0:
            return {
                r: v,
                g: t,
                b: p
            };
        case 1:
            return {
                r: q,
                g: v,
                b: p
            };
        case 2:
            return {
                r: p,
                g: v,
                b: t
            };
        case 3:
            return {
                r: p,
                g: q,
                b: v
            };
        case 4:
            return {
                r: t,
                g: p,
                b: v
            };
        case 5:
            return {
                r: v,
                g: p,
                b: q
            };
    }
};

/**
 * Converts RGB to HSV.
 *
 * Adapted from: [https://www.npmjs.org/package/color-convert]().
 *
 * @param {Object} rgb    Color in RGB
 * @param {Number} rgb.r  Red (0 - 255)
 * @param {Number} rgb.g  Green (0 - 255)
 * @param {Number} rgb.b  Blue (0 - 255)
 *
 * @return {Object}           Color in HSV
 * @return {Number} return.h  Hue (0 - 359)
 * @return {Number} return.s  Saturation (0 - 100)
 * @return {Number} return.v  Value (0 - 100)
 */
exports.rgb2hsv = function rgb2hsv(rgb) {
    var r = rgb.r,
        g = rgb.g,
        b = rgb.b,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h, s, v;

    if (max === 0) {
        s = 0;
    } else {
        s = (delta / max * 1000) / 10;
    }

    if (max === min) {
        h = 0;
    } else if (r === max) {
        h = (g - b) / delta;
    } else if (g === max) {
        h = 2 + (b - r) / delta;
    } else if (b === max) {
        h = 4 + (r - g) / delta;
    }

    h = Math.min(h * 60, 360);

    if (h < 0) {
        h += 360;
    }

    v = ((max / 255) * 1000) / 10;

    return {
        h: h,
        s: s,
        v: v
    };
};

/**
 * Converts RGB to HEX.
 *
 * @param {Object} rgb    Color in RGB
 * @param {Number} rgb.r  Red (0 - 255)
 * @param {Number} rgb.g  Green (0 - 255)
 * @param {Number} rgb.b  Blue (0 - 255)
 *
 * @return {String}  Color in HEX
 */
exports.rgb2hex = function rgb2hex(rgb) {
    var hex = '#';

    ['r', 'g', 'b'].forEach(function(c) {

        var h = parseInt(rgb[c], 10).toString(16);

        if (h.length === 1) {
            h = '0' + h;
        }

        hex += h;
    });

    return hex;
};

/**
 * Converts HEX to RGB.
 *
 * Adapted from: [http://stackoverflow.com/a/5624139]().
 *
 * @param {String} hex  Color in HEX (as #FF0000, FF0000, #F00 or F00)
 *
 * @return {Object}           Color in RGB
 * @return {Number} return.r  Red (0 - 255)
 * @return {Number} return.g  Green (0 - 255)
 * @return {Number} return.b  Blue (0 - 255)
 */
exports.hex2rgb = function hex2rgb(hex) {

    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/**
 * Converts HSV to BW.
 *
 * Returns `white` or `black`, depending on HSV's Value.
 *
 * @param {Object} hsv    Color in HSV
 * @param {Number} hsv.h  Hue (0 - 359)
 * @param {Number} hsv.s  Saturation (0 - 100)
 * @param {Number} hsv.v  Value (0 - 100)
 *
 * @return {String}  Either `white` or `black`.
 */
exports.hsv2bw = function(hsv) {
    return (hsv.v < 75) ? 'white' : 'black';
};