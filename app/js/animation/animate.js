module.exports = function(canvas, snake, statics, config) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 80 * config.scale, 50 * config.scale);
  ctx.fillStyle = 'rgb(255,255,0)';
  var head = snake.head;
  while (head.next) {
    ctx.fillRect(config.scale * head.xPos, config.scale * head.yPos,
        config.scale, config.scale);
    head = head.next;
  }
  ctx.fillRect(config.scale * head.xPos, config.scale * head.yPos,
      config.scale, config.scale);
};
