Game.Inventory = function(owner) {
  this._owner = owner;
  this._items = [];
  this._currentLetter = 'a';
}

Game.Inventory.prototype.addItem = function(item) {

  if (this.nextLetter(this._currentLetter)) {    
    item.setLetter(this._currentLetter);
    this._items.push(item);
    console.log("pushing item " + item.getName() + " as " + item.getLetter());
    return true;
  } else {
    return false;
  }
}

Game.Inventory.prototype.nextLetter = function(letter) {
  
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
    if (this._items[i].getLetter() === 'letter') {
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