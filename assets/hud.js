Game.HUD = {};

Game.HUD.printStatus = function(player) {
  var sep = " | ";
  var string = player.getName() + sep;
  string += "HP: " + player.getHP() + "/" + player.getHPMax() + sep;
  Game.getDisplay().drawText(0,Game.getScreenHeight() - 1, string);
}

Game.HUD.printMessage = function(message) {

}