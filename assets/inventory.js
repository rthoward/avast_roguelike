Game.Inventory = function(owner) {
  this._owner = owner;
  this._items = [];
  this._currentLetter = 'a';
}

Game.Inventory.prototype.addItem = function(item) {

  if (this.nextLetter()) {    
    item.setLetter(this._currentLetter);
    this._items.push(item);
    return true;
  } else {
    return false;
  }
}

Game.Inventory.prototype.hasItem = function(item) {
  for (var i = 0; i < this._items.length; i++) {
    if (this._items[i] === item) {
      return true;
    }
  }
  return false;
}

Game.Inventory.prototype.removeItem = function(item) {
  for (var i = 0; i < this._items.length; i++) {
    if (this._items[i] === item) {
      this._items.splice(i, 1);
    }
  }
}

Game.Inventory.prototype.nextLetter = function() {
  
  if (this._items.length >= 52) {
    return false;
  }

  while (this.isLetterTaken(this._currentLetter)) {
    if (this._currentLetter === 'z') { 
      this._currentLetter = 'A'; 
    }
    else if (this._currentLetter === 'Z') { 
      this._currentLetter = 'a';
    }
    else {
      this._currentLetter = String.fromCharCode(this._currentLetter.charCodeAt() + 1);
    }
    
  } 
  
  console.log("next letter computed as " + this._currentLetter);

  return true;
}

Game.Inventory.prototype.isLetterTaken = function(letter) {
  

  for (var i = 0; i < this._items.length; i++) {
    if (this._items[i].getLetter() === letter) {
      return true;
    }
  }

  return false;
}

Game.Inventory.prototype.show = function() {
  console.log("showing inventory [" + this._items.length + " items]");

  for (var i = 0; i < this._items.length; i++) {
    var str = this._items[i].getLetter() + " - ";
    str += this._items[i].getName();
    Game.getDisplay().drawText(10, i + 1, str);
  }
}

Game.Inventory.prototype.use = function(item, target) {
  item.use(this._owner, target);
  this.removeItem(item);
}

Game.Inventory.prototype.getAllType = function(type) {
  var ret = [];

  for (var i = 0; i < this._items.length; i++) {
    if (this._items[i].getItemType() == type) {
      ret.push(this._items[i]);
    }
  }

  return ret;
}

Game.Inventory.prototype.getAtLetter = function(letter) {
  for (var i = 0; i < this._items.length; i++) {
    if (this._items[i].getLetter() == letter) {
      return this._items[i];
    }
  }
  return null;
}

// make sure player can use item for given purpose or action
Game.Inventory.prototype.canUse = function(item, use) {
  return this.hasItem(item) && item.hasUse(use);
}