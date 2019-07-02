'use strict';

(function () {
  var getRandomBool = function () {
    return Math.round() < 0.5;
  };

  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.Random = {
    getBool: getRandomBool,
    getNum: getRandomNum,
    getItem: getRandomItem,
  };
})();
