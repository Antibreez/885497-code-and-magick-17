'use strict';

(function (Stat) {
  window.wizardSpeed = 3;
  window.wizardWidth = 70;
  window.fireballSize = 22;

  window.getFireballSpeed = function (left) {
    return left ? 5 : 2;
  };

  window.getWizardHeight = function (width) {
    return width * 1.337;
  };

  window.getWizardX = function (width) {
    return Math.floor((width - window.wizardWidth) / 2);
  };

  window.getWizardY = function (height) {
    return Math.floor(height / 3);
  };

  window.renderStatistics = Stat.render;
})(window.Stat);
