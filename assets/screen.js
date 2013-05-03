Game.Screen = {};

// Define our initial start screen
Game.Screen.startScreen = {
	enter: function() {    
    var player = new Game.Actor(Game.PlayerTemplate);    
    Game.Dungeon.init(player);
    var map = Game.MapHelper.firstCave(50, 50);
    Game.Dungeon.addMap(map);
  },

	exit: function() {

  },
	render: function(display) {
		// Render our prompt to the screen
		display.drawText(1,1, "%c{yellow}Avast!");
		display.drawText(1,2, "Press [Enter] to start!");
  },

  handleInput: function(inputType, inputData) {
    // When [Enter] is pressed, go to the play screen
    if (inputType === 'keydown') {
      if (inputData.keyCode === ROT.VK_RETURN) {
      Game.switchScreen(Game.Screen.playScreen);
      }
    }
  }
}

// Define our playing screen
Game.Screen.playScreen = {  

  _itemAction: null,
  _usingItem: null,

  enter: function() {    
    var potion = new Game.Item(Game.Items.PotionHealNormal);
    var potionBad = new Game.Item(Game.Items.PotionAcidNormal);

    Game.Dungeon.getMap().getEngine().start();    
    Game.Dungeon.getMap().addEntityAtRandomPosition(potion);  
    Game.Dungeon.getMap().addEntityAtRandomPosition(potionBad);
  },

  exit: function() {},
  
  render: function(display) { 
    var player = Game.Dungeon.getPlayer();
    var map = Game.Dungeon.getMap();

    var screenWidth = Game.getScreenWidth();
    var screenHeight = Game.getScreenHeight();
    
    var topLeftX = Math.max(0, player.getX() - (screenWidth / 2));   
    topLeftX = Math.min(topLeftX, map.getWidth() - screenWidth);    
    var topLeftY = Math.max(0, player.getY() - (screenHeight / 2));   
    topLeftY = Math.min(topLeftY, map.getHeight() - screenHeight);
   
    for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
        // grab glyph for tile and render it at proper position
        var tile = map.getTile(x, y);
        display.draw(
        x - topLeftX,
        y - topLeftY,
        tile.getChar(), 
        tile.getForeground(), 
        tile.getBackground())
      }
    }
    
    var entities = map.getEntities();
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      // Only render the entitiy if they would show up on the screen
      if (entity.getX() >= topLeftX && entity.getY() >= topLeftY &&
          entity.getX() < topLeftX + screenWidth &&
          entity.getY() < topLeftY + screenHeight) {
        display.draw(
          entity.getX() - topLeftX, 
          entity.getY() - topLeftY,    
          entity.getChar(), 
          entity.getForeground(), 
          entity.getBackground()
        );
      }
    }

    display.draw(
          player.getX() - topLeftX, 
          player.getY() - topLeftY,    
          player.getChar(), 
          player.getForeground(), 
          player.getBackground()
        );
    
    Game.HUD.renderMessage();    
    Game.HUD.printStatus(player);    
  },

  handleInput: function(inputType, inputData) {
    if (inputType === 'keydown') {

      Game.HUD.tickMessages();

      // if currently selecting item, grab its letter and attempt to use it
      if (this._itemAction !== null) {
        var player = Game.Dungeon.getPlayer();
        var inventory = player.getInventory();        
        this._usingItem = String.fromCharCode(inputData.keyCode + 32);        
        console.log("selecting item at " + this._usingItem);
        var item = inventory.getAtLetter(this._usingItem);
        if (inventory.canUse(item, this._itemAction)) {
          inventory.use(item, player);
        } else {
          console.log("can't use item for that action");
        }
        
        // clear out item selection for next attemtp
        this._itemAction = null;
        this._usingItem = null;
      }

      if (inputData.keyCode === ROT.VK_RETURN) {
        Game.switchScreen(Game.Screen.winScreen);
      } else if (inputData.keyCode === ROT.VK_ESCAPE) {
        Game.switchScreen(Game.Screen.loseScreen);
      }
      // movement
      if (inputData.keyCode === ROT.VK_LEFT) {
        this.move(-1, 0);
      } else if (inputData.keyCode === ROT.VK_RIGHT) {
        this.move(1, 0);
      } else if (inputData.keyCode === ROT.VK_UP) {
        this.move(0, -1);
      } else if (inputData.keyCode === ROT.VK_DOWN) {
        this.move(0, 1);
      // item management
      } else if (inputData.keyCode === ROT.VK_I) {        
        Game.switchScreen(Game.Screen.inventoryScreen);
      } else if (inputData.keyCode === ROT.VK_COMMA) {
        Game.Dungeon.getPlayer().pickUp();
      } else if (inputData.keyCode === ROT.VK_Q) {
        Game.Dungeon.getPlayer().tryQuaff();
        this._itemAction = 'quaff';
      }

      Game.Dungeon.getMap().getEngine().unlock();
    }        
  },

  move: function (dX, dY) {
    var player = Game.Dungeon.getPlayer();

    var newX = player.getX() + dX;
    var newY = player.getY() + dY;
    player.tryMove(newX, newY, Game.Dungeon.getMap());
  }
}

Game.Screen.inventoryScreen = {
  _player: null,

  enter: function() {
    this._player = Game.Dungeon.getPlayer();
  },
  exit: function() {

  },
  render: function(display) {
    this._player.getInventory().show(); 
  },
  
  handleInput: function(inputType, inputData) {
    if (inputData.keyCode === ROT.VK_ESCAPE) {
        Game.switchScreen(Game.Screen.playScreen);
    }    
  }
}

// Define our winning screen
Game.Screen.winScreen = {
  enter: function() {    console.log("Entered win screen."); },
  exit: function() { console.log("Exited win screen."); },
  render: function(display) {
    // Render our prompt to the screen
    for (var i = 0; i < 22; i++) {
      // Generate random background colors
      var r = Math.round(Math.random() * 255);
      var g = Math.round(Math.random() * 255);
      var b = Math.round(Math.random() * 255);
      var background = ROT.Color.toRGB([r, g, b]);
      display.drawText(2, i + 1, "%b{" + background + "}You win!");
    }
  },
  
  handleInput: function(inputType, inputData) {
    
  }
}

// Define our winning screen
Game.Screen.loseScreen = {
  enter: function() {    console.log("Entered lose screen."); },
  exit: function() { console.log("Exited lose screen."); },
  
  render: function(display) {
    // Render our prompt to the screen
    for (var i = 0; i < 22; i++) {
      
    }
  },
  
  handleInput: function(inputType, inputData) {
       
  }
}