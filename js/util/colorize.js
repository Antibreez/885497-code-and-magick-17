'use strict';

(function (Counter) {
  var make = function (colors) {
    var index = {};
    Object.keys(colors).forEach(function (color) {
      index[color] = Counter.make(colors[color].length - 1);
    });

    return {
      getNext: function (name) {
        return colors[name][index[name].getNext()];
      },
    };
  };

  window.Colorize = {
    make: make,
  };
})(window.Counter);
