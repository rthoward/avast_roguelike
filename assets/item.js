Game.Item = function(properties) {
  
  properties = properties || {};
  
  this._name = properties['name'] || '';
  this._type = properties['type'] || 'unknown';

  this._letter = '';  
  this._quantity = 1;
  
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

Game.Item.prototype.setLetter = function(letter) {
  this._letter = letter;
}

Game.Item.prototype.getLetter = function() {
  return this._letter;
}

Game.Item.prototype.modQuantity = function(amt) {
  this._quantity += amt;
}