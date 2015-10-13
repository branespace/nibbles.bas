module.exports = function(canvas, snake, statics, food, config) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 80 * config.scale, 52 * config.scale);

  ctx.fillStyle = 'rgb(255,255,0)';
  var head = snake.head;
  while (head.next) {
    drawRect(ctx, head.xPos, head.yPos, config.scale);
    head = head.next;
  }
  drawRect(ctx, head.xPos, head.yPos, config.scale);

  ctx.fillStyle = 'rgb(255,0,0)';
  for (var i = 0; i < statics.length; i++) {
    drawRect(ctx, statics[i].xPos, statics[i].yPos, config.scale);
  }

  ctx.fillStyle = 'rgb(0,255,0)';
  drawRect(ctx, food.xPos, food.yPos, config.scale);
};

function drawRect(context, x, y, scale) {
  context.fillRect(scale * x, scale * y, scale, scale);
}

