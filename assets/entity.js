Game.Entity = function(properties) {
  properties = properties || {};  
  Game.Glyph.call(this, properties);
  
  this._name = properties['name'] || '';
  this._x = properties['x'] || 0;
  this._y = properties['y'] || 0;
}

Game.Entity.extend(Game.Glyph);

Game.Entity.prototype.setName = function(name) {
  this._name = name;
}
Game.Entity.prototype.setX = function(x) {
  this._x = x;
}
Game.Entity.prototype.setY = function(y) {
  this._y = y;
}
Game.Entity.prototype.getName = function() {
  return this._name;
}
Game.Entity.prototype.getX = function() {
  return this._x;
}
Game.Entity.prototype.getY   = function() {
  return this._y;
}