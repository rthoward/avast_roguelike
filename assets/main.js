// make sure rot.js is supported
if (!ROT.isSupported()) {
  alert("sorry, you need a better browser");
} else {
  Game.init();
  document.body.appendChild(Game.getDisplay().getContainer());  
  Game.switchScreen(Game.Screen.startScreen);
}