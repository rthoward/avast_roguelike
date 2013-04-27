Game.Screen = {};

// Define our initial start screen
Game.Screen.startScreen = {
	enter: function() {    console.log("Entered start screen."); },
	exit: function() { console.log("Exited start screen."); },
	render: function(display) {
		// Render our prompt to the screen
		display.drawText(1,1, "%c{yellow}Javascript Roguelike");
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
  _map: null, 
  _player: null,


  enter: function() {
    
    var map = Game.MapHelper.genCaveMap(500, 500);


    this._player = new Game.Entity(Game.PlayerTemplate);
    this._map = new Game.Map(map, this._player);
    this._map.getEngine().start();    
    
  },

  exit: function() { console.log("Exited play screen."); },
  
  render: function(display) { 
    var screenWidth = Game.getScreenWidth();
    var screenHeight = Game.getScreenHeight();
    
    var topLeftX = Math.max(0, this._player.getX() - (screenWidth / 2));   
    topLeftX = Math.min(topLeftX, this._map.getWidth() - screenWidth);    
    var topLeftY = Math.max(0, this._player.getY() - (screenHeight / 2));   
    topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);
   
    for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
        // grab glyph for tile and render it at proper position
        var tile = this._map.getTile(x, y);
        display.draw(
        x - topLeftX,
        y - topLeftY,
        tile.getChar(), 
        tile.getForeground(), 
        tile.getBackground())
      }
    }
    
    var entities = this._map.getEntities();
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
    
  },

  handleInput: function(inputType, inputData) {
    if (inputType === 'keydown') {
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
      }

      this._map.getEngine().unlock();
    }        
  },

  move: function (dX, dY) {
    var newX = this._player.getX() + dX;
    var newY = this._player.getY() + dY;
    this._player.tryMove(newX, newY, this._map);
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