'use strict';

(function () {
  var PINS_COUNT = 8;

  var apartamentsStyleMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var getRandomApartamensStyle = function () {
    var keys = Object.keys(apartamentsStyleMap);
    return apartamentsStyleMap[keys[window.util.getRandomItem(keys)]];
  };

  var getArrayAvatarSources = function (arrayCount) {
    var array = [];
    for (var i = 0; i < arrayCount; i++) {
      array.push(i + 1);
    }
    return array;
  };

  var arrayAvatarSources = window.util.getShakeArray(getArrayAvatarSources(PINS_COUNT));

  var getPinProperty = function (i) {
    var pinProperty = {
      'author':
        {
          'avatar': 'img/avatars/user0' + arrayAvatarSources[i] + '.png'
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

  //    -----     Карточки

  window.cards = {
    'arrayPins': arrayPins
  };
})();
