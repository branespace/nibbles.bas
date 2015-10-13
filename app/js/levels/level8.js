var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 2; i <= 47; i++) {
    obstacles.push(new Obstacle(i, i));
    obstacles.push(new Obstacle(i + 30, i));
  }

  return new Level({
        id: 'What the..',
        num: 8,
        obstacles: obstacles,
        startXPos: 20,
        startXVel: 1,
        startYPos: 7,
        startYVel: 0,
        startLength: 10
      });
};

