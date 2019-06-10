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

var getRandomBool = function () {
  return Math.round() < 0.5;
};

var getRandomName = function () {
  return (getRandomBool() ? [HERO_NAMES, HERO_SURNAMES] : [HERO_SURNAMES, HERO_NAMES])
    .map(getRandomItem)
    .join(' ');
}

var makeHero = function () {
  return {
    name: getRandomName(),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYE_COLORS)
  }
}

var heroesNumber = 4;
var heroes = Array(heroesNumber).fill(null).map(makeHero);

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
  heroes.forEach(function (element) {
    fragment.appendChild(renderHero(element));
  });

  target.appendChild(fragment);
};

addHeroes(heroesList, heroes);

setupWindow.querySelector('.setup-similar').classList.remove('hidden');
