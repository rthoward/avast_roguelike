var WIDTH = 80;
var HEIGHT = 20;

var centerX = function() {return WIDTH / 2;}
var centerY = function() {return HEIGHT / 2;}

var drawCenter = function(text) {
  display.drawText(centerX() - (text.length / 2), centerY(), text);
}


// make sure rot.js is supported
if (!ROT.isSupported()) {
  alert("sorry, you need a better browser");
}

// create game window
var display = new ROT.Display({width: WIDTH, height: HEIGHT});
var container = display.getContainer();

// add container to the page
document.body.appendChild(container);

drawCenter("Welcome!");