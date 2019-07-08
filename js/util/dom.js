'use strict';

(function () {
  var makeOnMouseDown = function (onMove, onUp) {
    return function (evt) {
      evt.preventDefault();

      var start = {x: evt.clientX, y: evt.clientY};

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        if (onMove) {
          onMove(
              start.x - moveEvt.clientX,
              start.y - moveEvt.clientY
          );
        }

        start.x = moveEvt.clientX;
        start.y = moveEvt.clientY;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        return onUp && onUp(upEvt);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

  var DOM = {
    Element: {
      show: function (element) {
        element.classList.remove('hidden');
      },

      hide: function (element) {
        element.classList.add('hidden');
      },

      removeChilds: function (element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      },
    },

    Style: {
      reset: function (element, props) {
        props.forEach(function (prop) {
          element.style[prop] = '';
        });
      },
    },

    Event: {
      isEnterKey: function (evt) {
        return evt.key === 'Enter';
      },

      isEscapeKey: function (evt) {
        return evt.key === 'Esc'
          || evt.key === 'Escape';
      },

      isNotTarget: function (evt, element) {
        return evt.target !== element;
      },

      make: {
        onMouseDown: makeOnMouseDown,
      },
    },
  };

  window.DOM = DOM;
})();
