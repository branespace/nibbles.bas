var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 1; i <= 49; i++) {
    if (i > 30 || i < 20) {
      obstacles.push(new Obstacle(10, i));
      obstacles.push(new Obstacle(20, i));
      obstacles.push(new Obstacle(30, i));
      obstacles.push(new Obstacle(40, i));
      obstacles.push(new Obstacle(50, i));
      obstacles.push(new Obstacle(60, i));
      obstacles.push(new Obstacle(70, i));
    }
  }

  return new Level({
        id: 'Backgammon',
        num: 5,
        obstacles: obstacles,
        startXPos: 43,
        startXVel: 0,
        startYPos: 39,
        startYVel: -1,
        startLength: 10
      });
};

