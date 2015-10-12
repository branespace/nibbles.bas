module.exports = exports = function(canvas, score, message, config) {
  var ctx = canvas.getContext('2d');
  if (message) {
    ctx.font = 'bold ' + (config.scale * 5) + 'px Courier New';
    ctx.fillStyle = 'rgb(0,255,0)';
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    return;
  }
  ctx.font = 'bold ' + (config.scale * 2) + 'px Courier New';
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.textAlign = 'right';
  ctx.fillText('Score: ' + score, 70 * config.scale, 52 * config.scale);
};
