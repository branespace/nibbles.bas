var Snake = require('../snake/snake');
var animate = require('../animation/animate');

module.exports = exports = function(config, canvas, controller) {
  var lastUpdate = Date.now();
  var snake = new Snake(40, 25, 1, 0, 5);
  var statics = {};

  window.requestAnimationFrame(eventLoop);

  function eventLoop() {
    var now = Date.now();
    if (now - lastUpdate >= config.timeStep) {
      lastUpdate = now;
      snake.move(controller);
      animate(canvas, snake, statics, config);
      //check collisions
    }
    window.requestAnimationFrame(eventLoop);
  }
};

