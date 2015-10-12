var Obstacle = require('./obstacle');

module.exports = function(statics) {
  var height = 50;
  var width = 80;
  for (var i = 0; i < width; i++) {
    statics.push(new Obstacle(i, 0));
  }
  for (i = 1; i < height - 1; i++) {
    statics.push(new Obstacle(0, i));
    statics.push(new Obstacle(width - 1, i));
  }
  for (i = 0; i < width; i++) {
    statics.push(new Obstacle(i, height - 1));
  }
};
