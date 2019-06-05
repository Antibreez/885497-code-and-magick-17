'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var GAP = 10;
var TEXT_GAP = 30;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';

  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 1.7);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var playersGapX = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i;
    var playersGapY = CLOUD_Y + CLOUD_HEIGHT;
    var playerBarHeight = (times[i] * BAR_HEIGHT) / maxTime;

    ctx.fillText(players[i], playersGapX, playersGapY - TEXT_GAP * 0.4);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = `rgba(
        0,
        0,
        255,
        ${Math.random()})`;
    }

    ctx.fillRect(playersGapX, playersGapY - TEXT_GAP - playerBarHeight, BAR_WIDTH, playerBarHeight);

    ctx.fillStyle = '#000';

    ctx.fillText(Math.floor(times[i]), playersGapX, playersGapY - (TEXT_GAP * 1.5) - playerBarHeight);
  }
}
