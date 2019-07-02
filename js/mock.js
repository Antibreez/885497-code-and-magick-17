'use strict';

(function (Random, Data) {
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];

  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];

  var Color = Data.Color;

  var getRandomName = function () {
    return (Random.getBool() ? [NAMES, SURNAMES] : [SURNAMES, NAMES])
      .map(Random.getItem)
      .join(' ');
  };

  var makeHero = function () {
    return {
      name: getRandomName(),
      coatColor: Random.getItem(Color.coat),
      eyesColor: Random.getItem(Color.eyes),
    };
  };

  var getHeroes = function (num) {
    return Array(num).fill(null).map(makeHero);
  };

  window.Mock = {
    load: getHeroes,
  };
})(window.Random, window.Data);
