var config = require('./config');
var controller = require('./controller/controller');
var keyboard = require('./controller/keyboard');

var canvas = document.getElementById('canvas');
canvas.width *= config.scale;
canvas.height *= config.scale;

document.onkeydown = function(event) {
  keyboard(event, controller);
};

require('./game/loader')(config, canvas, controller, 0, 0);
