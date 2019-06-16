'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;

var mapStatus = document.querySelector('.map');
mapStatus.classList.remove('map--faded');

var mapOverlayWidth = document.querySelector('.map__overlay').offsetWidth;

var mapPinsElement = document.querySelector('.map__pins');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRandomArbitrary = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomItem = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomArray = function (a,b) {
  return Math.random() - 0.5;
}

var ARRAY_AVATARS_SRC = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];

var ARRAY_APARTAMENTS_STYLE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

ARRAY_AVATARS_SRC.sort(getRandomArray);

var getArrayPins = function () {
  var arrayPins = [];
  for (var i = 0; i < PINS_COUNT; i++) {
    var pinProperty = {
      "author":
        {
          "avatar": ARRAY_AVATARS_SRC[i]
        },
      "offer":
        {
          "type": ARRAY_APARTAMENTS_STYLE[getRandomItem(ARRAY_APARTAMENTS_STYLE)]
        },
      "location":
        {
          "x": getRandomArbitrary(0, mapOverlayWidth),
          "y": getRandomArbitrary(130, 630)
        }
    }
    arrayPins.push(pinProperty);
  }
  return arrayPins;
};

var arrayPins = getArrayPins();

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinLocationX = pin.location.x - (PIN_WIDTH / 2);
  var pinLocationY = pin.location.y + PIN_HEIGHT;

  pinElement.style = 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;';
  pinElement.querySelector('img').src = 'img/avatars/user0' + pin.author.avatar + '.png';
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < arrayPins.length; i++) {
  fragment.appendChild(renderPin(arrayPins[i]));
}

mapPinsElement.appendChild(fragment);
