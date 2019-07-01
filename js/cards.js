'use strict';

(function () {
  var PINS_COUNT = 8;

  var ARRAY_APARTAMENTS_STYLE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var getRandomApartamensStyle = function () {
    var keys = Object.keys(ARRAY_APARTAMENTS_STYLE);
    return ARRAY_APARTAMENTS_STYLE[keys[window.util.getRandomItem(keys)]];
  };

  var getArraySrc = function (arrayCount) {
    var array = [];
    for (var i = 0; i < arrayCount; i++) {
      array.push(i + 1);
    }
    return array;
  };

  var arraySrc = window.util.getShakeArray(getArraySrc(PINS_COUNT));

  var getPinProperty = function (i) {
    var pinProperty = {
      'author':
        {
          'avatar': 'img/avatars/user0' + arraySrc[i] + '.png'
        },
      'offer':
        {
          'type': getRandomApartamensStyle()
        },
      'location':
        {
          'x': window.util.getRandomArbitrary(window.data.LIMIT_PIN_LEFT, window.data.LIMIT_PIN_RIGHT),
          'y': window.util.getRandomArbitrary(window.data.LIMIT_PIN_TOP, window.data.LIMIT_PIN_BOTTOM)
        }
    };
    return pinProperty;
  };

  var getArrayPins = function () {
    var arrayPins = [];
    for (var i = 0; i < PINS_COUNT; i++) {
      arrayPins.push(getPinProperty(i));
    }
    return arrayPins;
  };

  var arrayPins = getArrayPins();

  window.cards = {
    'arrayPins': arrayPins
  };
})();
