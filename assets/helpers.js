var RLHelper = {

  _width: Game._width,
  _height: Game._height,

  centerX: function() {return WIDTH / 2;},
  centerY: function() {return HEIGHT / 2;},

  drawCenter: function(display, text) {
  display.drawText(centerX() - (text.length / 2), centerY(), text);
  },

  drawStatus: function(display, text) {   
    display.drawText(0, this._height - 1, text);    
  }
}