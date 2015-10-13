var animate = require('../animation/animate');
var collider = require('./collider');
var makeFood = require('../food/makeFood');
var text = require('../animation/text');
var loader = require('./loader');

module.exports = exports = function(config, canvas, controller, score,
    statics, snake, level, food, lives) {
  if (!level) {
    controller.pause = true;
    controller.restart = newGame;
    return text(canvas, score, lives, 'Victory!\nOm Nom Nom!\nScore: ' + score +
        '\nPress Space to Play Again', config);
  }
  var lastUpdate = Date.now();
  var queuedSegments = 0;
  var count = config.foodPerLevel;
  var timeStep = Math.max(config.minTimeStep,
      config.timeStep - (level.num * 5));

  text(canvas, score, lives, level.id + '\nPress Space', config, true);
  controller.restart = unPause;
  controller.pause = true;

  function eventLoop() {
    //Check pause control
    if (controller.pause) {
      text(canvas, score, lives, 'Paused\nPress Space to Resume', config);
      controller.restart = unPause;
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
      text(canvas, score, lives, null, config);
      //Check collisions
      var collision = collider(snake, statics, food, snake.head);
      //Collided with wall or obstacle
      if (collision === -1) {
        if (lives === 1) {
          text(canvas, score, lives, 'GAME OVER\nPress Space to Try Again',
              config);
          controller.pause = true;
          controller.restart = newGame;
          return false;
        } else {
          return require('./loader')(config, canvas, controller,
              level.num, score, lives - 1);
        }
      //Collided with food object
      } else if (collision === 1) {
        //Increase score
        score += (10 - count + 1) * (level.num + 1);
        //Increment level
        if (count === 1) {
          return require('./loader')(config, canvas, controller,
              level.num + 1, score, lives);
        }
        count--;
        //Increase game speed
        if (timeStep > config.minTimeStep) {
          timeStep -= 5;
        }
        //Make more food, queue segments
        food = makeFood(snake, statics);
        queuedSegments += config.eatAddLength;
      }
    }
    window.requestAnimationFrame(eventLoop);
  }

  function unPause() {
    window.requestAnimationFrame(eventLoop);
  }

  function newGame() {
    require('./loader')(config, canvas, controller, 0, 0, config.lives);
  }

};

