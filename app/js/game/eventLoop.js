var Snake = require('../snake/snake');
var animate = require('../animation/animate');
var buildWall = require('../obstacle/wall');
var collider = require('./collider');
var makeFood = require('../food/makeFood');
var text = require('../animation/text');

module.exports = exports = function(config, canvas, controller) {
  var lastUpdate = Date.now();
  var snake = new Snake(40, 25, 1, 0, config.startLength);
  var queuedSegments = 0;
  var score = 0;
  var statics = [];
  buildWall(statics);
  var food = createFood(snake, statics);

  window.requestAnimationFrame(eventLoop);

  function eventLoop() {
    var now = Date.now();
    if (now - lastUpdate >= config.timeStep) {
      lastUpdate = now;
      snake.move(controller);
      if (queuedSegments) {
        snake.add();
        queuedSegments--;
      }
      animate(canvas, snake, statics, food, config);
      text(canvas, score, null, config);
      var collision = collider(snake, statics, food, snake.head);
      if (collision === -1) {
        text(canvas, score, 'GAME OVER', config);
        return false;
      } else if (collision === 1) {
        if (config.timeStep > config.minTimeStep) {
          config.timeStep -= 5;
        }
        food = createFood(snake, statics);
        queuedSegments += config.eatAddLength;
        score += 10;
      }
    }
    window.requestAnimationFrame(eventLoop);
  }
};

function createFood(snake, statics) {
  var food = makeFood();
  while (collider(snake, statics, food, food) !== 0) {
    food = makeFood();
  }
  return food;
}
