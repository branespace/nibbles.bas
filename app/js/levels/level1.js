var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 20; i <= 60; i++) {
    obstacles.push(new Obstacle(i, 25));
  }

  return new Level({
      id: 'The Grass is Bluer',
      num: 1,
      obstacles: obstacles,
      startXPos: 20,
      startXVel: 1,
      startYPos: 7,
      startYVel: 0,
      startLength: 10
    });
};
