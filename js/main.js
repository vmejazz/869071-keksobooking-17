'use strict';

(function () {
  var mapStatus = document.querySelector('.map');

  var formsElement = document.querySelectorAll('form');

  // Адрес и активация центрального маркера  -------------------------------------------------------------

  var coordinatePinStart = {
    x: Math.round((window.data.mapOverlay.offsetWidth / 2) + (window.data.mapActivator.offsetWidth / 2)),
    y: Math.round((window.data.mapOverlay.offsetHeight / 2) + (window.data.mapActivator.offsetHeight / 2))
  };

  var getCoordinatePin = function (element) {
    var x = Math.round(element.offsetLeft + window.data.mapActivator.offsetWidth / 2);
    var y = Math.round(element.getBoundingClientRect().top);
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
  window.data.inputAddress.value = coordinatePinStart.x + ',' + coordinatePinStart.y;

  var getMapActiveStatus = function () {
    mapStatus.classList.remove('map--faded');
    window.data.mapActivator.removeEventListener('click', getMapActiveStatus);
    changeStateElementsForm(false);
    window.data.userForm.classList.remove('ad-form--disabled');
    window.backEnd.load(window.render.addPinsOnMap, window.render.onErrorLoad);
    window.data.inputAddress.value = getCoordinatePin(window.data.mapActivator);
  };

  window.data.mapActivator.addEventListener('click', getMapActiveStatus);

  window.main = {
    'getCoordinatePin': getCoordinatePin
  };
})();
