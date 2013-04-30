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

	return map;
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

    return map;
}