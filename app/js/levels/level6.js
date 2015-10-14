var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var i = 1; i <= 49; i += 2) {
    obstacles.push(new Obstacle(40, i));
  }

  return new Level({
        id: 'Dash to the End',
        num: 6,
        obstacles: obstacles,
        startXPos: 20,
        startXVel: 1,
        startYPos: 7,
        startYVel: 0,
        startLength: 10
      });
};

