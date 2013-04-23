Game.Glyph = function(chr, foreground, background) {

  // members with default values
  this._char = chr || ' ';
  this._foreground = foreground || 'white';
  this._background = background || 'black';
}

Game.Glyph.prototype.getChar = function() {
  return this._char;
}

Game.Glyph.prototype.getBackground = function() {
  return this._background;
}

Game.Glyph.prototype.getForeground = function() {
  return this._foreground;
}