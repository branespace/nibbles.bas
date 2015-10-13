var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 10; i <= 40; i++) {
    obstacles.push(new Obstacle(20, i));
    obstacles.push(new Obstacle(60, i));
  }

  return new Level({
        id: 'Double Slit Experiment',
        num: 2,
        obstacles: obstacles,
        startXPos: 20,
        startXVel: 1,
        startYPos: 7,
        startYVel: 0,
        startLength: 10
      });
};

