var Level = require('./level');
var Obstacle = require('../obstacle/obstacle');

module.exports = exports = function() {
  var obstacles = [];
  for (var r = 2; r < 78; r += 2) {
    for (var i = 2; i < 48; i += 2) {
      obstacles.push(new Obstacle(r, i));
    }
  }
  return new Level({
        id: 'Sweet Embrace of Death',
        num: 0,
        obstacles: obstacles,
        startXPos: 21,
        startXVel: 0,
        startYPos: 20,
        startYVel: 1,
        startLength: 0
      });
};
