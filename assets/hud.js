Game.HUD = {};

Game.HUD.init = function() {
  this._lastMessage = "";
  this._messageHistory = [];
  this._turnCounter = 10;
}

Game.HUD.printStatus = function(player) {
  var sep = " | ";
  var string = player.getName() + sep;
  string += "HP: " + player.getHP() + "/" + player.getHPMax() + sep;
  Game.getDisplay().drawText(0,Game.getScreenHeight() - 1, string);
}

Game.HUD.clearMessage = function() {
  this._turnCounter -= 1;

  if (this._turnCounter <= 0) {
    Game.getDisplay().drawText(0, 0, "");
    this._turnCounter = 10;
  }
}

Game.HUD.setMessage = function(message) {
   if ( (this._lastMessage.length + message.length) <= Game.getScreenWidth() ) {
    this._messageHistory.push(this._lastMessage);
    this._lastMessage += message;    
  } else {
    this._messageHistory.push(this._lastMessage)
    this._lastMessage = message;        
  }
}

Game.HUD.renderMessage = function(message) {
  Game.getDisplay().drawText(0, 0, this._lastMessage); 
}

Game.HUD.showMessageHistory = function() {
  
  var numMessages = this._messageHistory.length();  

  for (var i = 0; i < Game.getScreenHeight(); i++) {

  }
}