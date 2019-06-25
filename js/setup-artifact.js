'use strict';

(function () {
  var artifactShop = document.querySelector('.setup-artifacts-shop');
  var artifactShopImages = artifactShop.querySelectorAll('img');
  var artifactBag = document.querySelector('.setup-artifacts');
  var artifactBagElements = artifactBag.querySelectorAll('.setup-artifacts-cell');

  var artifactHandle = function (image) {
    image.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      evt.target.style.position = 'absolute';

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;

        image.style.top = (image.offsetTop - shift.y) + 'px';
        image.style.left = (image.offsetLeft - shift.x) + 'px';
      };

      var isOnBagClick = false;

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        if (isOnBagClick) {
          var artifactItem = image.cloneNode(true);
          window.util.hideElement(image);
          upEvt.target.appendChild(artifactItem);
          window.util.resetPosition(artifactItem);
        }

        window.util.resetPosition(image);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      artifactBag.addEventListener('mouseup', function () {
        isOnBagClick = true;
      });

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  for (var i = 0; i < artifactShopImages.length; i++) {
    artifactHandle(artifactShopImages[i]);
  }
})();
