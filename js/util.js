'use strict';

(function () {
  window.util = {
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    },
    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomBool: function () {
      return Math.round() < 0.5;
    },
    resetPosition: function (element) {
      element.style.position = '';
      element.style.top = '';
      element.style.left = '';
    },
    isDialogOpen: false,
  };
})();
