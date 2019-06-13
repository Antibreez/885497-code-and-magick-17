'use strict';

var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

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

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomBool = function () {
  return Math.round() < 0.5;
};

var getRandomName = function () {
  return (getRandomBool() ? [NAMES, SURNAMES] : [SURNAMES, NAMES])
    .map(getRandomItem)
    .join(' ');
};

var makeHero = function () {
  return {
    name: getRandomName(),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYE_COLORS)
  };
};

var HEROES_NUM = 4;

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

var showElement = function (element) {
  element.classList.remove('hidden');
};

showElement(document.querySelector('.setup'));
showElement(document.querySelector('.setup-similar'));
