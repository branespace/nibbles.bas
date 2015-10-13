module.exports = exports = function(canvas, score, message, config, clear) {
  var ctx = canvas.getContext('2d');
  if (clear) {
    ctx.clearRect(0, 0, config.scale * 80, config.scale * 52);
  }
  if (message) {
    multiLine(ctx, canvas, message, config.scale * 5);
    return;
  }
  ctx.font = 'bold ' + (config.scale * 2) + 'px Courier New';
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.textAlign = 'right';
  ctx.fillText('Score: ' + score, 70 * config.scale, 52 * config.scale);

  function multiLine(ctx, canvas, text, px) {
    text = text.split('\n');
    ctx.font = 'bold ' + px + 'px Courier New';
    var top = canvas.height / 2 - (px * text.length + 5 * text.length - 5) / 2;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgb(255,255,255)';
    for (var i = 0; i < text.length; i++) {
      ctx.fillText(text[i], canvas.width / 2, top + (px + 5) * i);
    }
  }
};

