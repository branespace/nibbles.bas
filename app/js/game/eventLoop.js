var animate = require('../animation/animate');
var collider = require('./collider');
var makeFood = require('../food/makeFood');
var text = require('../animation/text');

module.exports = exports = function(config, canvas, controller, score,
    statics, snake, level, food) {
  var lastUpdate = Date.now();
  var queuedSegments = 0;

  window.requestAnimationFrame(eventLoop);

  function eventLoop() {
    //Check pause control
    if (controller.pause) {
      text(canvas, score, 'Paused', config);
      controller.restart = eventLoop;
      return;
    }
    var now = Date.now();
    if (now - lastUpdate >= config.timeStep) {
      //Set new interval
      lastUpdate = now;
      //Move snake
      snake.move(controller);
      //Add queued segments
      if (queuedSegments) {
        snake.add();
        queuedSegments--;
      }
      //Draw objects
      animate(canvas, snake, statics, food, config);
      //Draw score
      text(canvas, score, null, config);
      //Check collisions
      var collision = collider(snake, statics, food, snake.head);
      //Collided with wall or obstacle
      if (collision === -1) {
        text(canvas, score, 'GAME OVER', config);
        return false;
      //Collided with food object
      } else if (collision === 1) {
        //Increase game speed
        if (config.timeStep > config.minTimeStep) {
          config.timeStep -= 5;
        }
        //Make more food, queue segments, increase score
        food = makeFood(snake, statics);
        queuedSegments += config.eatAddLength;
        score += 10;
      }
    }
    window.requestAnimationFrame(eventLoop);
  }
};

