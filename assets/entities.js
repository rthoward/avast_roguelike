Game.Mixins = {};

Game.Mixins.Moveable = {
  name: 'Moveable',

  tryMove: function(x, y, map) {
    var tile = map.getTile(x, y);

    // potential entity at desired location
    var target = map.getEntityAt(x, y);

    if (target) {

      if (target.isActor() && this.hasMixin('Attacker')) {
        this.attack(target);
        return true;
      }
      else if (target.isItem()) {
        this.setX(x);
        this.setY(y);
        if (this.hasMixin('PlayerInventory')) {
          this.touchItem(target);
        }
        return true;        
      } else {
        return false;
      }      
    } else if (tile.isWalkable()) {
      this.setX(x);
      this.setY(y);
      return true;
    } else if (tile.isDiggable()) {
      map.dig(x, y);
      return true;
    }
      
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

Game.Mixins.PlayerInventory = {
  name: 'PlayerInventory',
  groupName: 'Inventory',

  init: function() {
    this._inventory = new Game.Inventory(this);
  },

  getInventory: function() {
    return this._inventory;
  },

  touchItem: function(item) {
    Game.HUD.setMessage("You see here a " + item.getName());
  }
}

Game.Mixins.FungusActor = {
  name: 'FungusActor',
  groupName: 'Actor',
  act: function() {}
}

Game.Mixins.Destructible = {
  name: 'Destructible',
  
  takeDamage: function(attacker, damage) {
    this.modHP(-1);
    if (this.getHP() <= 0) {
      this.die(attacker);
      Game.HUD.setMessage("The " + this.getName() + " is killed!");
    }      
  },  

  die: function(attacker) {
    this.getMap().removeEntity(this);
  }
}

Game.Mixins.SimpleAttacker = {
  name: 'SimpleAttacker',
  groupName: 'Attacker',

  attack: function(target) {
    // try to attack target for 1 damage
    if (target.hasMixin('Destructible')) {
      var message = this.getName() + " attacks the " + target.getName()
                    + " for " + "%c{red}1" + "%c{} point of damage.";
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
           Game.Mixins.SimpleAttacker, Game.Mixins.Destructible,
           Game.Mixins.PlayerInventory]
}

Game.FungusTemplate = {
  name: 'Fungus',
  character: 'F',
  foreground: 'green',
  mixins: [Game.Mixins.FungusActor, Game.Mixins.Destructible],
  hp: 1
}