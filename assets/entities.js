Game.Mixins = {};

Game.Mixins.Moveable = {
  name: 'Moveable',

  tryMove: function(x, y, map) {
    var tile = map.getTile(x, y);

    // if tile can be walked on, simply walk to it
    if (tile.isWalkable()) {
      this._x = x;
      this._y = y;
      return true;
      // if tile is diggable, dig through it
    } else if (tile.isDiggable()) {
      console.log("digging through tile (" + x + "," + y + ")")
      map.dig(x, y);
      return true;
    }

    // tile cannot be walked to or dug through
    return false;
  }
}

Game.PlayerTemplate = {
  character: '@',
  foreground: 'white',
  background: 'black',
  mixins: [Game.Mixins.Moveable]
}