'use strict';

var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

var HERO_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var HERO_SURNAMES = [
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

var heroesNumber = 4;
var heroes = [];

for (var i = 0; i < heroesNumber; i++) {
  heroes[i] = {};
  heroes[i].name = (Math.floor(Math.random() * 2) === 0)
    ? (getRandomItem(HERO_NAMES) + ' ' + getRandomItem(HERO_SURNAMES))
    : (getRandomItem(HERO_SURNAMES) + ' ' + getRandomItem(HERO_NAMES));

  heroes[i].coatColor = getRandomItem(COAT_COLORS);
  heroes[i].eyesColor = getRandomItem(EYE_COLORS);
}

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

var addHeroes = function (array, target) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (element) {
    fragment.appendChild(renderHero(element));
  });

  target.appendChild(fragment);
};

addHeroes(heroes, heroesList);

setupWindow.querySelector('.setup-similar').classList.remove('hidden');
