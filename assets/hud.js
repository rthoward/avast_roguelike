Game.HUD = {};

Game.HUD.init = function() {
  this._lastMessage = "";
  this._messageHistory = [];
  this._messageQueue = [];
  this._turnCounter = 10;
  this._clearString = "                                                        ";
}

Game.HUD.queueMessage = function(msg) {
  this._messageQueue.push(msg);
}

Game.HUD.popMessage = function() {
  return this._messageQueue.shift();
}

Game.HUD.numMessages = function() {
  return this._messageQueue.length;
}

Game.HUD.printStatus = function(player) {
  var sep = " | ";
  var string = player.getName() + sep;
  string += "HP: " + player.getHP() + "/" + player.getHPMax() + sep;
  Game.getDisplay().drawText(0,Game.getScreenHeight() - 1, string);
}

Game.HUD.tickMessages = function() {
  if (this.numMessages() > 0) {
    this.renderMessage();
  }
}

Game.HUD.renderMessage = function(message) {  
  
  while (this.numMessages() > 0) {
    var message = this.popMessage();
    if (this.numMessages() > 0) {
      message += " MORE--";
    }    
    Game.getDisplay().drawText(0, 0, message);
  }  
}

Game.HUD.itemList = function(action, items) {
  var message = "What do you want to " + action;
  message += "? (";

  for (var i = 0; i < items.length; i++) {
    if (i == items.length - 1) {
      message += items[i].getLetter();
    } else {
      message += items[i].getLetter() + ",";
    }
  }

  message += ")";
  this.queueMessage(message);
}

Game.HUD.showMessageHistory = function() {
  
  var numMessages = this._messageHistory.length();  

  for (var i = 0; i < Game.getScreenHeight(); i++) {

  }
}