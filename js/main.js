'use strict';

(function (DOM, Setup, backend, errorMessage) {
  var setupOpen = document.querySelector('.setup-open');

  var SetupPopup = new Setup();

  SetupPopup.onOpen = function () {
    backend.load(SetupPopup.setHeroes, errorMessage);
  };

  var onSetupOpenClick = function () {
    SetupPopup.open();
  };

  var onSetupClosePress = function (evt) {
    return DOM.Event.isEnterKey(evt) && SetupPopup.open();
  };

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupClosePress);
})(window.DOM,
    window.Setup,
    window.backend,
    window.errorMessage
);
