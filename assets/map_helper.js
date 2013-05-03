Game.MapHelper = {};

// create 'normal' map with square rooms, hallways, etc
Game.MapHelper.genNormalMap = function(sizeX, sizeY) {
	var map = [];

  // create empty map of nullTiles
  for (var x = 0; x < sizeX; x++) {
    map.push([]);
    for (var y = 0; y < sizeY; y++) {
      map[x].push(Game.Tile.nullTile);
    }
  }

	var genMap = new ROT.Map.Digger(sizeX, sizeY);
  genMap.create(function(x, y, value) {
    if (value === 0) {
      map[x][y] = Game.Tile.floorTile;
    } else {
      map[x][y] = Game.Tile.nullTile;
    }
  }); 

  var finalMap = new Game.Map(map, Game.Dungeon.getPlayer());

  return finalMap;
}

// create cave map
Game.MapHelper.genCaveMap = function(sizeX, sizeY) {
	var map = [];

    // create empty map of nullTiles
    for (var x = 0; x < sizeX; x++) {
      map.push([]);
      for (var y = 0; y < sizeY; y++) {
        map[x].push(Game.Tile.nullTile);
      }
    }

    // randomize map
    var generator = new ROT.Map.Cellular(sizeX, sizeY);
    generator.randomize(0.5);
    var totalIterations = 3;

    // smooth map
    for (var i = 0; i < totalIterations - 1; i++) {
      generator.create();
    }

    generator.create(function(x, y, v) {
      if (v === 1) {
        map[x][y] = Game.Tile.floorTile;
      } else {
        map[x][y] = Game.Tile.wallTile;
      }
    });

    var finalMap = new Game.Map(map, Game.Dungeon.getPlayer());

    return finalMap;
}

Game.MapHelper.normalCave = function(sizeX, sizeY) {
  var map = this.genCaveMap(sizeX, sizeY);

  var upstairsPosition = map.getRandomFloorPosition();
  map.setTile(upstairsPosition.x, upstairsPosition.y, Game.Tile.upStairsTile);
  var downstairsPosition = map.getRandomFloorPosition();
  map.setTile(downstairsPosition.x, downstairsPosition.y, Game.Tile.downStairsTile);

  return map;
}


Game.MapHelper.firstCave = function(sizeX, sizeY) {
  var map = this.genCaveMap(sizeX, sizeY);

  var upstairsPosition = map.getRandomFloorPosition();
  map.setTile(upstairsPosition.x, upstairsPosition.y, Game.Tile.upStairsTile);
  var downstairsPosition = map.getRandomFloorPosition();
  map.setTile(downstairsPosition.x, downstairsPosition.y, Game.Tile.downStairsTile);

  Game.Dungeon.getPlayer().setX(upstairsPosition.x);
  Game.Dungeon.getPlayer().setY(upstairsPosition.y);

  return map;
}