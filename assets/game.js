var Game = {
  _display: null,
  _width: 96,
  _height: 32,
  _hjkl: true,

  _currentScreen: null,

  init: function() {
    this._display = new ROT.Display({width: this._width, 
                                     height: this._height,
                                     fontFamily: "consolas",
                                     fontSize: 18});

    var game = this;

    Game.HUD.init();

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

  getDisplay: function()      { return this._display; },
  getScreenWidth: function()  { return this._width; },
  getScreenHeight: function() { return this._height; },

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
      this.refresh();
    }
  },

  refresh: function() {
    this._display.clear();
    this._currentScreen.render(this._display);
  },

  getKeyMap: function(action) {
    if (action == "up") {
      if (this._hjkl)       { return ROT.VK_K; }
      else                  { return ROT.VK_UP; }
    } else if (action == "down") {
      if (this._hjkl)       { return ROT.VK_J; }
      else                  { return ROT.VK_DOWN; }
    } else if (action == "left") {
      if (this._hjkl)       { return ROT.VK_H; }
      else                  { return ROT.VK_LEFT; }
    } else if (action == "right") {
      if (this._hjkl)       { return ROT.VK_L; }
      else                  { return ROT.VK_RIGHT; }
    } else if (action == "up_left") {
      if (this._hjkl)       { return ROT.VK_Y; }
      else                  { return 0; }
    } else if (action == "up_right") {
      if (this._hjkl)       { return ROT.VK_U; }
      else                  { return 0; }
    } else if (action == "down_left") {
      if (this._hjkl)       { return ROT.VK_B; }
      else                  { return 0; }
    } else if (action == "down_right") {
      if (this._hjkl)       { return ROT.VK_N; }
      else                  { return 0; }
    }
  }
}