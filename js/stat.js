'use strict';

var CloudParam = {
  x: 100,
  y: 10,
  height: 270,
  width: 420,
  color: '#fff',
};

var CloudShadowParam = {
  x: CloudParam.x + 10,
  y: CloudParam.y + 10,
  height: 270,
  width: 420,
  offset: 10,
  color: 'rgba(0, 0, 0, 0.7)',
};

var HistogramParam = {
  height: 150,
  width: 40,
  gap: 50
};

var CloudText = {
  font: '16 px PT Mono',
  color: '#000'
};

var getRandomNum = function (min, max) {
  var check = Math.floor(Math.random() * (max - min + 1)) + min;
  return (check) ? check : getRandomNum(min, max);
};

var renderCloud = function (ctx) {
  ctx.shadowColor = CloudShadowParam.color;
  ctx.shadowOffsetX = CloudShadowParam.offset;
  ctx.shadowOffsetY = CloudShadowParam.offset;
  ctx.shadowBlur = 0;
  ctx.fillStyle = CloudParam.color;
  ctx.fillRect(CloudParam.x, CloudParam.y, CloudParam.width, CloudParam.height);
  ctx.shadowColor = 'rgba(0, 0, 0, 0)';
};

var renderCloudHeader = function (ctx) {
  var str = 'Ура вы победили!\nСписок результатов:';
  var lines = str.split('\n');

  ctx.font = CloudText.font;
  ctx.fillStyle = CloudText.color;
  ctx.textBaseline = 'top';

  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], CloudParam.x + 20, CloudParam.y + 20 * (i + 1));
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx);
  renderCloudHeader(ctx);

  var timeMax = Math.max.apply(null, times);

  for (var i = 0; i < Math.min(players.length, times.length); i++) {
    var time = Math.floor(times[i]);
    var name = players[i];
    var barHeight = Math.floor((time * HistogramParam.height) / timeMax);
    var playerX = CloudParam.x + (HistogramParam.width * (i + 1)) + HistogramParam.gap * i;
    var playerY = CloudParam.y + CloudParam.height - barHeight - 30;

    if (name === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, 0.' + getRandomNum(0, 9) + ')';
    }

    ctx.fillRect(playerX, playerY, HistogramParam.width, barHeight);

    ctx.fillStyle = CloudText.color;
    ctx.fillText(name, playerX, playerY + barHeight + 5);
    ctx.fillText(time, playerX, playerY - 20);
  }
};
