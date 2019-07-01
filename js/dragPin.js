'use strict';

(function () {
  var onPinDown = function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMoveOnMap = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var checkLimitPin = function (element) {
        var elementCoordinate = {
          x: element.offsetLeft - shift.x,
          y: element.offsetTop - shift.y
        };

        if (element.offsetTop - shift.y < window.data.LIMIT_PIN_TOP) {
          elementCoordinate.y = window.data.LIMIT_PIN_TOP;
        }
        if (element.offsetTop - shift.y > window.data.LIMIT_PIN_BOTTOM) {
          elementCoordinate.y = window.data.LIMIT_PIN_BOTTOM;
        }
        if (element.offsetLeft - shift.x < window.data.LIMIT_PIN_LEFT) {
          elementCoordinate.x = window.data.LIMIT_PIN_LEFT;
        }
        if (element.offsetLeft - shift.x > window.data.LIMIT_PIN_RIGHT) {
          elementCoordinate.x = window.data.LIMIT_PIN_RIGHT;
        }
        return elementCoordinate;
      };

      var moveElement = function () {
        window.data.mapActivator.style.cursor = 'pointer';
        var newCoordinate = checkLimitPin(window.data.mapActivator);
        window.data.mapActivator.style.left = newCoordinate.x + 'px';
        window.data.mapActivator.style.top = newCoordinate.y + 'px';
      };

      moveElement();
    };

    var onPinUpOnMap = function () {
      window.data.inputAddress.value = window.main.getCoordinatePin(window.data.mapActivator);
      document.removeEventListener('mousemove', onPinMoveOnMap);
      document.removeEventListener('mouseup', onPinUpOnMap);
    };

    document.addEventListener('mousemove', onPinMoveOnMap);
    document.addEventListener('mouseup', onPinUpOnMap);
  };

  window.data.mapActivator.addEventListener('mousedown', onPinDown, true);
})();
