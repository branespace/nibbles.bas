var Snake = require('./../snake/snake');
var buildWall = require('../obstacle/wall');
var makeFood = require('../food/makeFood');
var eventLoop = require('./eventLoop');
var level = {
  id: 'test',
  obstacles: [],
  startXPos: 40,
  startYPos: 25,
  startXVel: 1,
  startYVel: 0,
  startLength: 10
};

module.exports = function(config, canvas, controller, levelnum, score) {
  var snake = new Snake(level.startXPos, level.startYPos,
      level.startXVel, level.startYVel, level.startLength);
  var statics = level.obstacles.slice();
  buildWall(statics);
  var food = makeFood(snake, statics);
  eventLoop(config, canvas, controller, score, statics, snake, level.id, food);
};
