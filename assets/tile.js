Game.Tile = function(properties) {
  properties = properties || {};
  Game.Glyph.call(this, properties);

  this._isWalkable = properties['isWalkable'] || false;
  this._isDiggable = properties['isDiggable'] || false;
};

Game.Tile.extend(Game.Glyph);

// getters
Game.Tile.prototype.isWalkable = function() {
  return this._isWalkable;
}

Game.Tile.prototype.isDiggable = function() {
  return this._isDiggable;
}

Game.Tile.nullTile = new Game.Tile({});

Game.Tile.floorTile = new Game.Tile({
  character: '.',
  isWalkable: true
});

Game.Tile.wallTile = new Game.Tile({
  character: '#',
  foreground: 'goldenrod',
  isDiggable: true
});

Game.Tile.upStairsTile = new Game.Tile({
  character: '<',
  foreground: 'white',
  isWalkable: true,
  isDiggable: false
});

Game.Tile.downStairsTile = new Game.Tile({
  character: '>',
  foreground: 'white',
  isWalkable: true,
  isDiggable: false
});

Game.Tile.goldTile = new Game.Tile({
  character: '$',
  foreground: 'yellow',
  isWalkable: true,
  isDiggable: false
});

Game.Tile.doorTile = new Game.Tile({
  character: '+',
  foreground: 'yellow',
  isWalkable: false,
  isDiggable: false
});