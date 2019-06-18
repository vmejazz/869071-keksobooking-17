'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;

var mapStatus = document.querySelector('.map');
// mapStatus.classList.remove('map--faded'); // переводим блок карты в активное состояние

var mapOverlayWidth = document.querySelector('.map__overlay').offsetWidth;
// var mapOverlayHeight = document.querySelector('.map__overlay').offsetHeight;

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

var ARRAY_APARTAMENTS_STYLE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var getRandomApartamensStyle = function () {
  var keys = Object.keys(ARRAY_APARTAMENTS_STYLE);
  return ARRAY_APARTAMENTS_STYLE[keys[getRandomItem(keys)]];
};

var getArraySrc = function (arrayCount) {
  var array = [];
  for (var i = 0; i < arrayCount; i++) {
    array.push(i + 1);
  }
  return array;
};

var getShakeArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var tempRandom = getRandomArbitrary(0, i - 1);
    var tempProperty = array[tempRandom];
    array[tempRandom] = array[i];
    array[i] = tempProperty;
  }
  return array;
};

var arraySrc = getShakeArray(getArraySrc(PINS_COUNT));

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
        'x': getRandomArbitrary(0, mapOverlayWidth - (PIN_WIDTH * 2)),
        'y': getRandomArbitrary(130, 630)
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

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinLocationX = pin.location.x + (PIN_WIDTH / 2);
  var pinLocationY = pin.location.y + PIN_HEIGHT;

  pinElement.style = 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < arrayPins.length; k++) {
  fragment.appendChild(renderPin(arrayPins[k]));
}

// mapPinsElement.appendChild(fragment); // добавлем созданные пины на карту


// module4-task1  -------------------------------------------------------------


var userForm = document.querySelector('.ad-form');
var mapActivator = document.querySelector('.map__pin--main');
var inputAddress = userForm.querySelector('input[name=address]');
var formsElement = document.querySelectorAll('form');

var getCoordinatePin = function (element) {
  var x = Math.round(element.getBoundingClientRect().left + (element.offsetWidth / 2));
  var y = Math.round(element.getBoundingClientRect().top + element.offsetHeight);
  return (x + ',' + y);
};

var changeStateElementsForm = function (toggle) {
  for (var i = 0; i < formsElement.length; i++) {
    for (var j = 0; j < formsElement[i].children.length; j++) {
      formsElement[i].children[j].disabled = toggle;
    }
  }
};

mapActivator.addEventListener('click', function () {
  mapStatus.classList.remove('map--faded');
  mapActivator.removeEventListener('click', function () {});
  changeStateElementsForm(false);
  userForm.classList.remove('ad-form--disabled');
  mapPinsElement.appendChild(fragment);
});

changeStateElementsForm(true);
inputAddress.value = getCoordinatePin(mapActivator);
