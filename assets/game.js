var WIDTH = 80;
var HEIGHT = 20;

var Game = {
  _display: null,
  _width: 80,
  _height: 24,

  _currentScreen: null,

  init: function() {
    this._display = new ROT.Display({width: this._width, height: this._height});

    var game = this;
    var bindEventToScreen = function(event) {
      window.addEventListener(event, function(e) {
        if (game._currentScreen !== null) {
          game._currentScreen.handleInput(event, e);
        }
      });
    }
    bindEventToScreen('keydown');
    bindEventToScreen('keyup');
    bindEventToScreen('keypress');
  },

  getDisplay: function() {
    return this._display;
  },

  switchScreen: function(newScreen) {
    
    // notify old screen of exit
    if (this._currentScreen !== null) {
      this._currentScreen.exit();
    }

    // clear display
    this.getDisplay().clear();

    // update screen, notify it, and render
    this._currentScreen = newScreen;
    if (!this._currentScreen !== null) {
      this._currentScreen.enter();
      this._currentScreen.render(this.getDisplay());
    }
  }
}