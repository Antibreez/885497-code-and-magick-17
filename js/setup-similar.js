'use strict';

(function () {

  var HEROES_NUM = 4;

  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYE_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var getRandomName = function () {
    return (window.util.getRandomBool() ? [NAMES, SURNAMES] : [SURNAMES, NAMES])
      .map(window.util.getRandomItem)
      .join(' ');
  };

  var makeHero = function () {
    return {
      name: getRandomName(),
      coatColor: window.util.getRandomItem(COAT_COLORS),
      eyesColor: window.util.getRandomItem(EYE_COLORS)
    };
  };

  var heroesList = document.querySelector('.setup-similar-list');
  var heroTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderHero = function (hero) {
    var heroItem = heroTemplate.cloneNode(true);
    heroItem.querySelector('.setup-similar-label').textContent = hero.name;
    heroItem.querySelector('.wizard-coat').style.fill = hero.coatColor;
    heroItem.querySelector('.wizard-eyes').style.fill = hero.eyesColor;

    return heroItem;
  };

  var addHeroes = function (target, heroes) {
    var fragment = document.createDocumentFragment();
    heroes.forEach(function (hero) {
      fragment.appendChild(renderHero(hero));
    });

    target.appendChild(fragment);
  };

  var getHeroes = function (num) {
    return Array(num).fill(null).map(makeHero);
  };

  addHeroes(heroesList, getHeroes(HEROES_NUM));
  window.util.showElement(document.querySelector('.setup-similar'));
})();
