'use strict';

(function () {
  var mapStatus = document.querySelector('.map');

  var formsElement = document.querySelectorAll('form');
  var resetButton = document.querySelector('.ad-form__reset');

  // Адрес и активация центрального маркера  -------------------------------------------------------------

  var coordinatePinStart = {
    x: window.data.mapActivator.offsetLeft,
    y: window.data.mapActivator.offsetTop
  };

  var getCoordinatePin = function (element) {
    var x = Math.round(element.offsetLeft + window.data.PIN_WIDTH / 2);
    var y = Math.round(element.offsetTop);
    return (x + ',' + y);
  };

  var changeStateElementsForm = function (toggle) {
    for (var i = 0; i < formsElement.length; i++) {
      for (var j = 0; j < formsElement[i].children.length; j++) {
        formsElement[i].children[j].disabled = toggle;
      }
    }
  };

  changeStateElementsForm(true);

  var coordinatePinForInput = {
    x: Math.round(coordinatePinStart.x + (window.data.PIN_WIDTH / 2)),
    y: Math.round(coordinatePinStart.y + (window.data.PIN_HEIGHT / 2))
  };

  window.data.inputAddress.value = coordinatePinForInput.x + ',' + coordinatePinForInput.y;

  var getMapActiveStatus = function () {
    mapStatus.classList.remove('map--faded');
    window.data.mapActivator.removeEventListener('click', getMapActiveStatus);
    changeStateElementsForm(false);
    window.data.userForm.classList.remove('ad-form--disabled');
    window.backEnd.loadData(window.render.addPinsOnMap, window.render.onErrorLoad);
    window.data.inputAddress.value = getCoordinatePin(window.data.mapActivator);
    resetButton.addEventListener('click', onResetPageButtonClick);
  };

  window.data.mapActivator.addEventListener('click', getMapActiveStatus);

  var checkPinActivator = function (evt) {
    var pinButtonMain = evt.target.parentNode.classList.contains('map__pin--main');
    var pinButton = evt.target.parentNode.classList.contains('map__pin');
    if (pinButton && !pinButtonMain) {
      window.util.popupClose();
      window.render.addCardOnMap(evt.target);
    } else if (evt.target.classList.value === 'popup__close') {
      window.util.popupClose();
    }
  };

  window.data.mapPins.addEventListener('click', checkPinActivator, true);


  // --------- Сброс страницы

  var resetForms = function (forms) {
    for (var i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
    window.form.chooseTypeOfRoom();
  };

  var resetPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    pins[0].style.left = coordinatePinStart.x + 'px';
    pins[0].style.top = coordinatePinStart.y + 'px';
    document.querySelector('.map__pins').appendChild(pins[0]);
    window.data.inputAddress.value = coordinatePinStart.x + ',' + coordinatePinStart.y;
  };

  var resetPage = function () {
    resetForms(formsElement);
    resetPins();
  };

  // ---------- Деактивация страницы

  var getMapDeactiveStatus = function () {
    mapStatus.classList.add('map--faded');
    changeStateElementsForm(true);
    window.data.userForm.classList.add('ad-form--disabled');
    window.data.mapActivator.addEventListener('click', getMapActiveStatus);
    window.data.inputAddress.value = coordinatePinStart.x + ',' + coordinatePinStart.y;
    window.util.popupClose();
  };

  //  ----------- Ресет страницы

  var onResetPageButtonClick = function () {
    resetPage();
    getMapDeactiveStatus();
    resetButton.removeEventListener('click', onResetPageButtonClick);
  };

  // ------ Глобальные переменные

  window.main = {
    'getCoordinatePin': getCoordinatePin,
    'resetPage': resetPage,
    'mapStatus': mapStatus,
    'getMapDeactiveStatus': getMapDeactiveStatus,
    'resetPins': resetPins
  };
})();
