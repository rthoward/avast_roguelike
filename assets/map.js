Game.Map = function(tiles, player, type, params) {
  this._tiles = tiles;
  this._width = tiles.length;
  this._height = tiles[0].length;

  this._params = params || {};
  this._rooms = this._params['rooms'] || '';
  this._corridors = this._params['corridors'] || '';

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

Game.Map.prototype.printStats = function() {
  console.log("map stats: ");
  console.log(this._rooms.length + " rooms");
  console.log(this._corridors.length + " corridors");
}

Game.Map.prototype.changeRooms = function(new_tile) {
  var coord = this.getRandomRoomCoord();

  this.setTile(coord['x'], coord['y'], new_tile); 
}

Game.Map.prototype.getRandomRoomCoord = function() {
  var random_room = Math.floor(Math.random() * this._rooms.length);
  var room_coords = this.getRoomCoords(this._rooms[random_room]);

  var random_coord = Math.floor(Math.random() * room_coords.length);

  return room_coords[random_coord];
}

Game.Map.prototype.getRoomCoords = function(room) {
  var cornerX = room.getLeft();
  var cornerY = room.getTop();
  var height = room.getBottom() - cornerY;
  var width = room.getRight() - cornerX;  

  var room_coords = [];

  for (var x = 0; x < width + 1; x++) {
    for (var y = 0; y < height + 1; y++) {        
      room_coords.push({x: cornerX + x, y: cornerY + y});
    }
  }

  return room_coords;
}

Game.Map.prototype.setDoorTiles = function() {
 
}