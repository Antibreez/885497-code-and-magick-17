'use strict';

(function (DOM, Mock, Setup) {
  var setupOpen = document.querySelector('.setup-open');

  var SetupPopup = new Setup();

  SetupPopup.onOpen = function () {
    SetupPopup.setHeroes(Mock.load(4));
  };

  var onSetupOpenClick = function () {
    SetupPopup.open();
  };

  var onSetupClosePress = function (evt) {
    return DOM.Event.isEnterKey(evt) && SetupPopup.open();
  };

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupClosePress);
})(window.DOM, window.Mock, window.Setup);
