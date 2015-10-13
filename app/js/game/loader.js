var Snake = require('./../snake/snake');
var buildWall = require('../obstacle/wall');
var makeFood = require('../food/makeFood');
var eventLoop = require('./eventLoop');
var levels = [
              require('../levels/level0')(),
              require('../levels/level1')(),
              require('../levels/level2')(),
              require('../levels/level3')(),
              require('../levels/level4')(),
              require('../levels/level5')(),
              require('../levels/level6')(),
              require('../levels/level7')(),
              require('../levels/level8')(),
              require('../levels/level9')()
             ];

module.exports = exports = function(config, canvas, controller,
    levelnum, score) {
  if (levelnum === levels.length) {
    return eventLoop(config, canvas, controller, score, null, null, null, null);
  }
  var level = levels[levelnum];
  var snake = new Snake(level.startXPos, level.startYPos,
      level.startXVel, level.startYVel, level.startLength);
  var statics = level.obstacles.slice();
  buildWall(statics);
  var food = makeFood(snake, statics);
  eventLoop(config, canvas, controller, score, statics, snake, level, food);
};
