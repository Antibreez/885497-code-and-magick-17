'use strict';

(function (Random) {
  var Cloud = {
    X: 100,
    Y: 10,
    HEIGHT: 270,
    WIDTH: 420,
    COLOR: '#fff',
  };

  var CloudShadow = {
    OFFSET: 10,
    COLOR: 'rgba(0, 0, 0, 0.7)',
    RESET: 'rgba(0, 0, 0, 0)',
  };

  var CloudTitle = {
    X: 125,
    Y: 30,
    TEXT: 'Ура вы победили!\nСписок результатов:',
  };

  var Bar = {
    HEIGHT: 150,
    WIDTH: 40,
    GAP: 50,
  };

  var BarColumn = {
    HEIGHT: Bar.HEIGHT + Bar.GAP,
    WIDTH: Bar.WIDTH + Bar.GAP,
  };

  var Text = {
    COLOR: '#000',
    FONT: 'normal 16px PT Mono',
    BASELINE: 'hanging',
    PADDING: 10,
    LINE_HEIGHT: 20,
  };

  var renderCloud = function (ctx) {
    ctx.shadowColor = CloudShadow.COLOR;
    ctx.shadowOffsetX = CloudShadow.OFFSET;
    ctx.shadowOffsetY = CloudShadow.OFFSET;
    ctx.shadowBlur = 0;
    ctx.fillStyle = Cloud.COLOR;
    ctx.fillRect(Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);
    ctx.shadowColor = CloudShadow.RESET;
  };

  var renderCloudTitle = function (ctx) {
    var text = CloudTitle.TEXT;

    ctx.font = Text.FONT;
    ctx.fillStyle = Text.COLOR;
    ctx.textBaseline = Text.BASELINE;

    text.split('\n').forEach(function (line, i) {
      ctx.fillText(
          line,
          CloudTitle.X,
          CloudTitle.Y + Text.LINE_HEIGHT * i
      );
    });
  };

  var getPlayerColor = function (name) {
    return name === 'Вы'
      ? 'rgb(255, 0, 0)'
      : 'rgba(0, 0, 255, 0.' + Random.getNum(5, 9) + ')';
  };

  var renderBars = function (ctx, players, times) {
    var maxTime = Math.max.apply(null, times);
    var length = Math.min(players.length, times.length);

    for (var i = 0; i < length; i++) {
      var time = Math.floor(times[i]);
      var name = players[i];

      var x = Bar.HEIGHT + (BarColumn.WIDTH * i);
      var height = Math.floor(((Bar.HEIGHT - 10) * time) / maxTime);
      var padding = BarColumn.HEIGHT - height;

      ctx.fillStyle = getPlayerColor(name);
      ctx.fillRect(x, Bar.WIDTH + padding, Bar.WIDTH, height);
      ctx.fillStyle = Text.COLOR;
      ctx.fillText(time, x, Cloud.Y + padding + 10);
      ctx.fillText(name, x, Cloud.Y + Bar.HEIGHT + 90);
    }
  };

  var renderStatistics = function (ctx, players, times) {
    renderCloud(ctx);
    renderCloudTitle(ctx);
    renderBars(ctx, players, times);
  };

  window.Stat = {
    render: renderStatistics,
  };
})(window.Random);
