var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 1; i <= 40; i++) {
    obstacles.push(new Obstacle(10, i));
    obstacles.push(new Obstacle(20, 49 - i));
    obstacles.push(new Obstacle(30, i));
    obstacles.push(new Obstacle(40, 49 - i));
    obstacles.push(new Obstacle(50, i));
    obstacles.push(new Obstacle(60, 49 - i));
    obstacles.push(new Obstacle(70, i));
  }

  return new Level({
        id: 'Snake on a Plane',
        num: 7,
        obstacles: obstacles,
        startXPos: 20,
        startXVel: 1,
        startYPos: 7,
        startYVel: 0,
        startLength: 10
      });
};

