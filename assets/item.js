Game.Item = function(properties) {
  
  properties = properties || {};
  Game.Entity.call(this, properties);  
  
  this._type = 'item';
  this._itemType = properties['type'] || 'unknown';
  this._itemUses = properties['uses'] || 'none';
  this._letter = '';  
  this._quantity = 1; 
  this._numUses = properties['numUses'] || 0;
  this._stackable = properties['stackable'] || false;

  this.use = properties['use'] || function(user, target) {
    Game.HUD.setMessage(user.getName() + " uses" + this.getName()
                        + " on " + target.getName());
  }  
}

Game.Item.extend(Game.Entity);

Game.Item.prototype.setLetter = function(letter) {
  this._letter = letter;
}

Game.Item.prototype.getLetter = function() {
  return this._letter;
}

Game.Item.prototype.modQuantity = function(amt) {
  this._quantity += amt;
}

Game.Item.prototype.getItemType = function() {
  return this._itemType;
}

Game.Item.prototype.hasUse = function(use) {
  for (var i = 0; i < this._itemUses.length; i++) {
    if (this._itemUses[i] == use) 
      return true;
  }
  return false;
}