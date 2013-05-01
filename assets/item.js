Game.Item = function(properties) {
  
  properties = properties || {};
  
  this._name = properties['name'] || '';
  this._type = properties['type'] || 'unknown';
  this._letter = '';  
  this._quantity = 1;

  this._x = properties['x'] || 0;
  this._y = properties['y'] || 0;
  this._map = null;
  
  Game.Glyph.call(this, properties);  

  this.use = properties['use'] || function(user, target) {
    Game.HUD.setMessage(user.getName() + " uses" + this.getName()
                        + " on " + target.getName());
  }
  this.numUses = properties['numUses'] || 0;
}

Game.Item.extend(Game.Glyph);

Game.Item.prototype.getName = function() {
  return this._name;
}

Game.Item.prototype.setName = function(name) {
  this._name = name;
}

Game.Item.prototype.setX = function(x) {
  this._x = x;
}
Game.Item.prototype.setY = function(y) {
  this._y = y;
}

Game.Item.prototype.getX = function() {
  return this._x;
}
Game.Item.prototype.getY = function() {
  return this._y;
}

Game.Item.prototype.setMap = function(map) {
  this._map = map;
}

Game.Item.prototype.getMap = function() {
  return this._map;
}

Game.Item.prototype.hasMixin = function(param) {
  return false;
}

Game.Item.prototype.setLetter = function(letter) {
  this._letter = letter;
}

Game.Item.prototype.getLetter = function() {
  return this._letter;
}

Game.Item.prototype.modQuantity = function(amt) {
  this._quantity += amt;
}