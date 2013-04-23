Game.Mixins = {};

Game.Mixins.Moveable = {
  name: 'Moveable',

  tryMove: function(x, y, map) {
    var tile = map.getTile(x, y);

    // potential entity at desired location
    var target = map.getEntityAt(x, y);

    // entity is present at tile. cannot move to it
    if (target) {
      return false;
      // if tile can be walked on, simply walk to it
    } else if (tile.isWalkable()) {
      this._x = x;
      this._y = y;
      return true;
      // if tile is diggable, dig through it
    } else if (tile.isDiggable()) {      
      map.dig(x, y);
      return true;
    }

    // tile cannot be walked to or dug through
    return false;
  }
}

Game.Mixins.PlayerActor = {
  name: 'PlayerActor',
  groupName: 'Actor',

  act: function() {
    Game.refresh();
    this.getMap().getEngine().lock();
  }
}

Game.Mixins.FungusActor = {
  name: 'FungusActor',
  groupName: 'Actor',
  act: function() {}
}

// templates -----------------------------------------------

Game.PlayerTemplate = {
  character: '@',
  foreground: 'white',
  background: 'black',
  mixins: [Game.Mixins.Moveable, Game.Mixins.PlayerActor]
}

Game.FungusTemplate = {
  character: 'F',
  foreground: 'green',
  mixins: [Game.Mixins.FungusActor]
}