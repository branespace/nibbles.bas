var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 13; i <= 39; i++) {
    obstacles.push(new Obstacle(21, i));
    obstacles.push(new Obstacle(59, i));
  }
  for (i = 23; i <= 57; i++) {
    obstacles.push(new Obstacle(i, 11));
    obstacles.push(new Obstacle(i, 41));
  }

  return new Level({
        id: 'Skinner Box',
        num: 4,
        obstacles: obstacles,
        startXPos: 50,
        startXVel: 1,
        startYPos: 30,
        startYVel: 0,
        startLength: 10
      });
};

