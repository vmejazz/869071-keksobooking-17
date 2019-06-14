'use strict';

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var mapStatus = document.querySelector('.map');
mapStatus.classList.remove('map--faded');

var mapPinsElement = document.querySelector('.map__pins');

var mapPinsTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRandom =  function () {
  return Math.random();
};

var getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

var arrayAvatarSrc = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];

var arrayApartamentStyle = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var getRandomAvatarSrc = function (i) {
  var
};

var getPinsProperty = function (pinsCount) {
  var arrayPinsProperties = [];
  var arrayAvatarSrc = getAvatarSrc(pinsCount)
  for (var i = 1; i <= pinsCount; i++) {
    var pinProperty = {
      author: ,
      offer: ,
      location:
    }
    arrayPinsProperties.push(pinProperty);
  }
  return arrayPinsProperties;
}

// arrayPins
