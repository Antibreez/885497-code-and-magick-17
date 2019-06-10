'use strict';

var Cloud = {
  x: 100,
  y: 10,
  height: 270,
  width: 420,
  color: '#fff',
};

var CloudShadow = {
  x: Cloud.x + 10,
  y: Cloud.y + 10,
  height: 270,
  width: 420,
  offset: 10,
  color: 'rgba(0, 0, 0, 0.7)',
};

var Bar = {
  height: 150,
  width: 40,
  gap: 50
};

var CloudText = {
  font: '16 px PT Mono',
  color: '#000'
};

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var renderCloud = function (ctx) {
  ctx.shadowColor = CloudShadow.color;
  ctx.shadowOffsetX = CloudShadow.offset;
  ctx.shadowOffsetY = CloudShadow.offset;
  ctx.shadowBlur = 0;
  ctx.fillStyle = Cloud.color;
  ctx.fillRect(Cloud.x, Cloud.y, Cloud.width, Cloud.height);
  ctx.shadowColor = 'rgba(0, 0, 0, 0)';
};

var renderCloudHeader = function (ctx) {
  var str = 'Ура вы победили!\nСписок результатов:';

  ctx.font = CloudText.font;
  ctx.fillStyle = CloudText.color;
  ctx.textBaseline = 'top';

  var lines = str.split('\n');
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], Cloud.x + 20, Cloud.y + 20 * (i + 1));
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx);
  renderCloudHeader(ctx);

  var timeMax = Math.max.apply(null, times);

  for (var i = 0; i < Math.min(players.length, times.length); i++) {
    var time = Math.floor(times[i]);
    var name = players[i];
    var barHeight = Math.floor((time * Bar.height) / timeMax);
    var playerX = Cloud.x + (Bar.width * (i + 1)) + Bar.gap * i;
    var playerY = Cloud.y + Cloud.height - barHeight - 30;

    ctx.fillStyle = (name === 'Вы')
      ? 'rgb(255, 0, 0)'
      : 'rgba(0, 0, 255, 0.' + getRandomNum(1, 9) + ')';

    ctx.fillRect(playerX, playerY, Bar.width, barHeight);

    ctx.fillStyle = CloudText.color;
    ctx.fillText(name, playerX, playerY + barHeight + 5);
    ctx.fillText(time, playerX, playerY - 20);
  }
};
