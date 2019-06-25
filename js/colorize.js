'use strict';

(function () {

  var HeroColor = {
    fireball: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    eyes: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    coat: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  var setup = document.querySelector('.setup');

  var coatColor = setup.querySelector('.setup-wizard .wizard-coat');
  var eyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireballColor = setup.querySelector('.setup-fireball-wrap');

  var coatInput = setup.querySelector('input[name=coat-color]');
  var eyesInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  var makeCounter = function (max) {
    var counter = 0;
    return {
      next: function () {
        counter = max > counter ? counter + 1 : 0;
        return counter;
      },
   };
  };

  var makeColorize = function (colors) {
    var index = {};
    Object.keys(colors).forEach(function (color) {
      index[color] = makeCounter(colors[color].length - 1);
    });

    return {
      next: function (name) {
        return colors[name][index[name].next()];
      },
    };
  };

  var Colorize = makeColorize(HeroColor);

  var onCoatClick = function () {
    coatInput.value = coatColor.style.fill = Colorize.next('coat');
  };

  var onEyesClick = function () {
    eyesInput.value = eyesColor.style.fill = Colorize.next('eyes');
  };

  var onFireballClick = function () {
    fireballInput.value = fireballColor.style.backgroundColor = Colorize.next('fireball');
  };

  coatColor.addEventListener('click', onCoatClick);
  eyesColor.addEventListener('click', onEyesClick);
  fireballColor.addEventListener('click', onFireballClick);
})();
