var Food = require('./food');

module.exports = exports = function() {
  var x = Math.round(Math.random() * (80 - 1) + 1);
  var y = Math.round(Math.random() * (50 - 1) + 1);
  return {xPos: x, yPos: y};
};
