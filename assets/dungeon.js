Game.Dungeon = {};

Game.Dungeon.init = function(player) {
  this._player = player;
  this._maps = [];
  this._currentLevel = 0;  
}

Game.Dungeon.getPlayer = function() {
  return this._player;
}

Game.Dungeon.addMap = function(map) {
  this._maps.push(map);  
  this._currentLevel += 1;
}

Game.Dungeon.getMap = function() {  
  return this._maps[this._currentLevel - 1];
}

Game.Dungeon.getCurrentMap = function() {  
  return this._maps[this._currentLevel - 1];
}

Game.Dungeon.getCurrentLevel = function() {
  return this._currentLevel;
}

Game.Dungeon.modCurrentLevel = function(amt) {
  this._currentLevel += amt;
}