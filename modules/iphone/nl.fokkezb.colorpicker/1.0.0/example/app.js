var colorpicker = require('nl.fokkezb.colorpicker');

var win = Ti.UI.createWindow({
  backgroundColor: '#ddd'
});

var btn = Ti.UI.createButton({
  top: 25,
  title: 'Get color'
});

var view = colorpicker.createView({
  top: 60,

  // initial color (default: black)
  color: '#f00'
});

view.addEventListener('colorChange', function(e) {
  console.debug('Color changed to: ' + e.color);
});

btn.addEventListener('click', function(e) {
  alert('The color is: ' + view.getColor());
});

win.add(view);
win.add(btn);
win.open();