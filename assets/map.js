Game.Map = function(tiles, player) {
  this._tiles = tiles;
  this._width = tiles.length;
  this._height = tiles[0].length;

  // list to hold all entities
  this._entities = [];

  this._scheduler = new ROT.Scheduler.Simple();
  this._engine = new ROT.Engine(this._scheduler);

  this.addEntityAtRandomPosition(player);

  // add some random fungi
  // for (var i = 0; i < 1000; i++) {
  //   this.addEntityAtRandomPosition(new Game.Entity(Game.FungusTemplate));
  // }

}

Game.Map.prototype.addEntity = function(entity) {

  // check that entity's position is within bounds
  if (entity.getX() < 0 || entity.getX() >= this._width ||
      entity.getY() < 0 || entity.getY() >= this._height) {
    throw new Error('adding entity out of bounds');
  }

  entity.setMap(this);
  this._entities.push(entity);

  // if entity is an actor, add them to the scheduler
  if (entity.hasMixin('Actor')) {
    this._scheduler.add(entity, true);
  }
}

Game.Map.prototype.removeEntity = function(entity) {
  for (var i = 0; i < this._entities.length; i++) {
    if (this._entities[i] == entity) {
      this._entities.splice(i, 1);
      break;
    }
  }

  // if actor, remove entity from scheduler
  if (entity.hasMixin('Actor')) {
    this._scheduler.remove(entity);
  }
}

Game.Map.prototype.addEntityAtRandomPosition = function(entity) {
  var position = this.getRandomFloorPosition();
  entity.setX(position.x);
  entity.setY(position.y);
  this.addEntity(entity);
}

Game.Map.prototype.isEmptyFloor = function(x, y) {
  return (this.getTile(x, y) == Game.Tile.floorTile && !this.getEntityAt(x, y));
}

Game.Map.prototype.getWidth = function() {
    return this._width;
}

Game.Map.prototype.getHeight = function() {
  return this._height;
}

// returns the tile at the given coordinate
Game.Map.prototype.getTile = function(x, y) {
  // make sure requested coord is in bounds
  if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
    return Game.Tile.nullTile;
  } else {
    return this._tiles[x][y] || Game.Tile.nullTile;
  }
}

Game.Map.prototype.getEngine = function()     { return this._engine; }
Game.Map.prototype.getEntities = function()   { return this._entities; }

// returns the entity at the given coordinate
Game.Map.prototype.getEntityAt = function(x, y) {
  for (var i = 0; i < this._entities.length; i++) {
    if (this._entities[i].getX() == x && this._entities[i].getY() == y) {
      return this._entities[i];
    }
  }

  return false;
}

Game.Map.prototype.getItemsAt = function(x, y) {
  var ret = [];

  for (var i = 0; i < this._entities.length; i++) {
    if (this._entities[i].getX() == x && this._entities[i].getY() == y 
        && this._entities[i] !== Game.Dungeon.getPlayer()) {
      ret.push(this._entities[i]);
    }
  }

  return ret;
}

// digs through the entity at the given coordinate, but does not move there
Game.Map.prototype.dig = function(x, y) {
  if (this.getTile(x, y).isDiggable()) {
    this.setTile(x, y, Game.Tile.floorTile);
  }
}

Game.Map.prototype.setTile = function(x, y, tile) {
  this._tiles[x][y] = tile;
}

// returns valid random floor position
Game.Map.prototype.getRandomFloorPosition = function() {
  var x, y;
  do {
    x = Math.floor(Math.random() * this._width);
    y = Math.floor(Math.random() * this._width);
  } while (!this.isEmptyFloor(x, y));

  return {x: x, y: y};
}