var Level = require('./level');

module.exports = exports = function() {
  return new Level({
    id: 'Wide Open Space',
    num: 0,
    obstacles: [],
    startXPos: 40,
    startXVel: 1,
    startYPos: 25,
    startYVel: 0,
    startLength: 10
  });
};
