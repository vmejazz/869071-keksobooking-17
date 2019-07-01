'use strict';

(function () {
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

  window.util = {
    'getRandomArbitrary': getRandomArbitrary,
    'getRandomItem': getRandomItem,
    'getShakeArray': getShakeArray
  };
})();
