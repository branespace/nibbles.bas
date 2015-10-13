var Food = require('./food');
var collider = require('./../game/collider');

function makeFood() {
  var x = Math.round(Math.random() * (78 - 1) + 1);
  var y = Math.round(Math.random() * (48 - 1) + 1);
  return {xPos: x, yPos: y};
}

module.exports = exports = function(snake, statics) {
  var food = makeFood();
  while (collider(snake, statics, food, food) !== 0) {
    food = makeFood();
  }
  return food;
};
