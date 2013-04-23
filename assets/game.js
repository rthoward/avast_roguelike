// make sure rot.js is supported
if (!ROT.isSupported()) {
  alert("sorry, you need a better browser");
}

// create game window
var display = new ROT.Display({width: 80, height: 20});
var container = display.getContainer();

// add container to the page
document.body.appendChild(container);