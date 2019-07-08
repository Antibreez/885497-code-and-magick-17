'use strict';

(function (DOM, Data, Colorize, backend, errorMessage) {
  var makeOnMouseDown = DOM.Event.make.onMouseDown;

  var setupList = document.querySelector('.setup-similar-list');
  var heroTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var setup = document.querySelector('.setup');
  var setupUpload = setup.querySelector('.upload');
  var setupClose = setup.querySelector('.setup-close');
  var setupSimilar = setup.querySelector('.setup-similar');
  var form = setup.querySelector('.setup-wizard-form');

  var userNameInput = setup.querySelector('.setup-user-name');
  var coatInput = setup.querySelector('input[name=coat-color]');
  var eyesInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  var coatColor = setup.querySelector('.setup-wizard .wizard-coat');
  var eyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireballColor = setup.querySelector('.setup-fireball-wrap');

  var Colorize = Colorize.make(Data.Color);

  var renderHero = function (hero) {
    var node = heroTemplate.cloneNode(true);
    node.querySelector('.setup-similar-label').textContent = hero.name;
    node.querySelector('.wizard-coat').style.fill = hero.colorCoat;
    node.querySelector('.wizard-eyes').style.fill = hero.colorEyes;

    return node;
  };

  var onCoatClick = function () {
    coatInput.value = coatColor.style.fill = Colorize.getNext('coat');
  };

  var onEyesClick = function () {
    eyesInput.value = eyesColor.style.fill = Colorize.getNext('eyes');
  };

  var onFireballClick = function () {
    fireballInput.value = fireballColor.style.backgroundColor = Colorize.getNext('fireball');
  };

  var onUploadMouseMove = function (x, y) {
    window.requestAnimationFrame(function () {
      setup.style.left = setup.offsetLeft - x + 'px';
      setup.style.top = setup.offsetTop - y + 'px';
    });
  };

  var onUploadMouseUp = function () {
    setupUpload.addEventListener('click', function (evt) {
      evt.preventDefault();
    }, { once: true });
  };

  var Setup = function () {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  };

  Setup.prototype.open = function () {
    this.onOpen();
    DOM.Element.show(setup);
    this._addListeners();
  };

  Setup.prototype.close = function () {
    DOM.Element.hide(setup);
    DOM.Style.reset(setup, ['position', 'top', 'left']);
    this._removeListeners();
  };

  Setup.prototype.setHeroes = function (heroes) {
    var fragment = document.createDocumentFragment();
    heroes.slice(0, 4).forEach(function (hero) {
      fragment.appendChild(renderHero(hero));
    });

    DOM.Element.removeChilds(setupList);
    setupList.appendChild(fragment);
    DOM.Element.show(setupSimilar);
  };

  Setup.prototype.onOpen = function () {};

  Setup.prototype._onEscPress = function (evt) {
    return DOM.Event.isEscapeKey(evt)
      && DOM.Event.isNotTarget(evt, userNameInput)
      && this.close();
  };

  Setup.prototype._onEnterPress = function (evt) {
    return DOM.Event.isEnterKey(evt) && this.close();
  };

  Setup.prototype._onMouseDown = makeOnMouseDown(
    onUploadMouseMove,
    onUploadMouseUp,
  );

  Setup.prototype._onSubmit = function (evt) {
    backend.save(
      new FormData(form),

      function (response) {
        DOM.Element.hide(setup);
      },

      errorMessage
    );
    evt.preventDefault();
  };

  Setup.prototype._addListeners = function () {
    document.addEventListener('keydown', this._onEscPress);

    setupUpload.addEventListener('mousedown', this._onMouseDown);
    setupClose.addEventListener('keydown', this._onEnterPress);
    setupClose.addEventListener('click', this.close);
    coatColor.addEventListener('click', onCoatClick);
    eyesColor.addEventListener('click', onEyesClick);
    fireballColor.addEventListener('click', onFireballClick);
    form.addEventListener('submit', this._onSubmit);
  };

  Setup.prototype._removeListeners = function () {
    document.removeEventListener('keydown', this._onEscPress);

    setupUpload.removeEventListener('mousedown', this._onMouseDown);
    setupClose.removeEventListener('keydown', this._onEnterPress);
    setupClose.removeEventListener('click', this.close);
    coatColor.removeEventListener('click', onCoatClick);
    eyesColor.removeEventListener('click', onEyesClick);
    fireballColor.removeEventListener('click', onFireballClick);
    form.removeEventListener('submit', this._onSubmit);
  };

  window.Setup = Setup;
})(window.DOM,
  window.Data,
  window.Colorize,
  window.backend,
  window.errorMessage
);
