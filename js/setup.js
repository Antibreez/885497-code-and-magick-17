'use strict';

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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var HEROES_NUM = 4;

var setup = document.querySelector('.setup');
var setupCoatColor = setup.querySelector('.setup-wizard .wizard-coat');
var setupEyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireballColor = setup.querySelector('.setup-fireball-wrap');
var coatColorInput = setup.querySelector('input[name=coat-color]');
var eyesColorInput = setup.querySelector('input[name=eyes-color]');
var fireballColorInput = setup.querySelector('input[name=fireball-color]');

var showElement = function (element) {
  element.classList.remove('hidden');
};

var hideElement = function (element) {
  element.classList.add('hidden');
};

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

var excludeValue = function (array, value) {
  return array.filter(function (it) {
    return it !== value;
  });
};

setupCoatColor.addEventListener('click', function (evt) {
  var colors = excludeValue(COAT_COLORS, evt.target.style.fill);
  var color = getRandomItem(colors);
  setupCoatColor.style.fill = color;
  coatColorInput.value = color;
});

setupEyesColor.addEventListener('click', function (evt) {
  var colors = excludeValue(EYE_COLORS, evt.target.style.fill);
  var color = getRandomItem(colors);
  setupEyesColor.style.fill = color;
  eyesColorInput.value = color;
});

setupFireballColor.addEventListener('click', function (evt) {
  var colors = excludeValue(FIREBALL_COLORS, evt.target.style.fill);
  var color = getRandomItem(colors);
  setupFireballColor.style.backgroundColor = color;
  fireballColorInput.value = color;
});

addHeroes(heroesList, getHeroes(HEROES_NUM));

showElement(document.querySelector('.setup-similar'));
