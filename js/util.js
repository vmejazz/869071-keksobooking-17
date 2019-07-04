'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArbitrary = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomItem = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var getShakeArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var tempRandom = window.util.getRandomArbitrary(0, i - 1);
      var tempProperty = array[tempRandom];
      array[tempRandom] = array[i];
      array[i] = tempProperty;
    }
    return array;
  };

  var isEscEvent = function (evt, action, modal) {
    if (evt.keyCode === ESC_KEYCODE || evt.which === ESC_KEYCODE) {
      action(modal);
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE || evt.which === ENTER_KEYCODE) {
      action();
    }
  };

  window.util = {
    'getRandomArbitrary': getRandomArbitrary,
    'getRandomItem': getRandomItem,
    'getShakeArray': getShakeArray,
    'isEscEvent': isEscEvent,
    'isEnterEvent': isEnterEvent
  };
})();
