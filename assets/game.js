var WIDTH = 80;
var HEIGHT = 20;

var Game = {
  _display: null,
  _width: 80,
  _height: 24,

  _currentScreen: null,

  init: function() {
    this._display = new ROT.Display({width: this._width, height: this._height});
  },

  getDisplay: function() {
    return this._display;
  }
}

// make sure rot.js is supported
if (!ROT.isSupported()) {
  alert("sorry, you need a better browser");
} else {
  Game.init();
  document.body.appendChild(Game.getDisplay().getContainer());  
}