var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var dialogHandle = setup.querySelector('.upload');

var isEscapeKey = function (evt) {
  return evt.key === 'Esc' || evt.key === 'Escape';
};

var isEnterKey = function (evt) {
  return evt.key === 'Enter';
};

var onEscPress = function (evt) {
  return isEscapeKey(evt) && closePopup();
};

var openPopup = function () {
  showElement(setup);
  document.addEventListener('keydown', onEscPress);
};

var closePopup = function () {
  hideElement(setup);
  document.removeEventListener('keydown', onEscPress);
  setup.style.left = '';
  setup.style.top = '';
};

var onPopupOpenClick = function () {
  openPopup();
};

var onPopupOpenPress = function (evt) {
  return isEnterKey(evt) && openPopup();
};

var onPopupCloseClick = function () {
  closePopup();
};

var onPopupClosePress = function (evt) {
  return isEnterKey(evt) && closePopup();
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

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        dialogHandle.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
