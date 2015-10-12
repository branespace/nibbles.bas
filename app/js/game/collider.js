module.exports = function(snake, statics, food, head) {
  for (var i = 0; i < statics.length; i++) {
    if (head.xPos === statics[i].xPos && head.yPos === statics[i].yPos) {
      return -1;
    }
  }
  var temp = snake.head.next;
  while (temp) {
    if (head.xPos === temp.xPos && head.yPos === temp.yPos) {
      return -1;
    }
    temp = temp.next;
  }
  if (snake.head.xPos === food.xPos && snake.head.yPos === food.yPos) {
    return 1;
  }
  return 0;
};
