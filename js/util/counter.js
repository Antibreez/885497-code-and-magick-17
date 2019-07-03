'use strict';

(function () {
  var make = function (max) {
    var counter = 0;
    return {
      getNext: function () {
        counter = max > counter ? counter + 1 : 0;
        return counter;
      },
    };
  };

  window.Counter = {
    make: make,
  };
})();
