Game.Mixins = {};

Game.Mixins.Moveable = {
  name: 'Moveable',

  tryMove: function(x, y, map) {
    var tile = map.getTile(x, y);

    // potential entity at desired location
    var target = map.getEntityAt(x, y);

    // entity is present at tile. try to attack it
    if (target) {
      if (this.hasMixin('Attacker')) {
        console.log("attacking " + target.getName());
        this.attack(target);
        return true;
      } else {
        return false;
      }      
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

Game.Mixins.Destructible = {
  name: 'Destructible',

  init: function() {
    this._hp = this._maxHP = 1;
  },

  takeDamage: function(attacker, damage) {
    this._hp -= damage;
    if (this._hp <= 0) {
      this.getMap().removeEntity(this);
    }
  },

  getHPMax: function() {
    return this._maxHP;
  },

  getHP: function() {
    return this._hp;
  }
}

Game.Mixins.SimpleAttacker = {
  name: 'SimpleAttacker',
  groupName: 'Attacker',

  attack: function(target) {
    // try to attack target for 1 damage
    if (target.hasMixin('Destructible')) {
      var message = this.getName() + " attacks the " + target.getName();
      Game.HUD.setMessage(message);  
      target.takeDamage(this, 1);
    } else {
      
    }
  }
}

// templates -----------------------------------------------

Game.PlayerTemplate = {
  name: 'Bobcat',
  character: '@',
  foreground: 'white',
  background: 'black',
  mixins: [Game.Mixins.Moveable, Game.Mixins.PlayerActor, 
           Game.Mixins.SimpleAttacker, Game.Mixins.Destructible]
}

Game.FungusTemplate = {
  name: 'Fungus',
  character: 'F',
  foreground: 'green',
  mixins: [Game.Mixins.FungusActor, Game.Mixins.Destructible]
}