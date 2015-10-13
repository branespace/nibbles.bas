var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 0; i < 30; i++) {
    obstacles.push(new Obstacle(20, i));
    obstacles.push(new Obstacle(60, 19 + i));
  }
  for (i = 0; i < 30; i++) {
    obstacles.push(new Obstacle(i, 38));
    obstacles.push(new Obstacle(50 + i, 12));
  }

  return new Level({
        id: 'Corners',
        num: 3,
        obstacles: obstacles,
        startXPos: 43,
        startXVel: 1,
        startYPos: 7,
        startYVel: 0,
        startLength: 10
      });
};

