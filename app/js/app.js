var config = require('./config');
var controller = require('./controller/controller');
var keyboard = require('./controller/keyboard');

var canvas = document.getElementById('canvas');
canvas.width *= config.scale;
canvas.height *= config.scale;

document.onkeydown = function(event) {
  keyboard(event, controller);
};

require('./game/cheats')(newGame);

newGame();

function newGame(level) {
  level = level || 0;
  require('./game/loader')(config, canvas, controller, level, 0, config.lives);
}
