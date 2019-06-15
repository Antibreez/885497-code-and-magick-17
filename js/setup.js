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

showElement(document.querySelector('.setup-similar'));

var Keys = {
  ESC: 27,
  ENTER: 13
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupCoatColor = setup.querySelector('.setup-wizard .wizard-coat');
var setupEyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireballColor = setup.querySelector('.setup-fireball-wrap');

var onEscPress = function (evt) {
  if (evt.keyCode === Keys.ESC) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
};

var onPopupOpenClick = function () {
  openPopup();
};

var onPopupOpenPress = function (evt) {
  if (evt.keyCode === Keys.ENTER) {
    openPopup();
  }
};

var onPopupCloseClick = function () {
  closePopup();
};

var onPopupClosePress = function (evt) {
  if (evt.keyCode === Keys.ENTER) {
    closePopup();
  }
};

setupOpen.addEventListener('click', onPopupOpenClick);
setupOpen.addEventListener('keydown', onPopupOpenPress);

setupClose.addEventListener('click', onPopupCloseClick);
setupClose.addEventListener('keydown', onPopupClosePress);

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEscPress);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onEscPress);
});

setupCoatColor.addEventListener('click', function () {
  var color = getRandomItem(COAT_COLORS);
  setupCoatColor.style.fill = color;
  setup.querySelector('input[name=coat-color]').value = color;
});

setupEyesColor.addEventListener('click', function () {
  var color = getRandomItem(EYE_COLORS);
  setupEyesColor.style.fill = color;
  setup.querySelector('input[name=eyes-color').value = color;
});

setupFireballColor.addEventListener('click', function () {
  var color = getRandomItem(FIREBALL_COLORS);
  setupFireballColor.style.backgroundColor = color;
  setup.querySelector('input[name=fireball-color]').value = color;
});
