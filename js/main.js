'use strict';

var mapStatus = document.querySelector('.map');

var mapOverlay = document.querySelector('.map__overlay');

var mapPinsElement = document.querySelector('.map__pins');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var userForm = document.querySelector('.ad-form');
var mapActivator = document.querySelector('.map__pin--main');
var inputAddress = userForm.querySelector('input[name=address]');
var formsElement = document.querySelectorAll('form');

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_COUNT = 8;
var LIMIT_PIN_TOP = 130;
var LIMIT_PIN_BOTTOM = 630;
var LIMIT_PIN_LEFT = -(mapActivator.offsetWidth / 2);
var LIMIT_PIN_RIGHT = mapOverlay.offsetWidth - (mapActivator.offsetWidth / 2);


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
        'x': getRandomArbitrary(LIMIT_PIN_LEFT, LIMIT_PIN_RIGHT),
        'y': getRandomArbitrary(LIMIT_PIN_TOP, LIMIT_PIN_BOTTOM)
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


var coordinatePinStart = {
  x: Math.round((mapOverlay.offsetWidth / 2) + (mapActivator.offsetWidth / 2)),
  y: Math.round((mapOverlay.offsetHeight / 2) + (mapActivator.offsetHeight / 2))
};

var getCoordinatePin = function (element) {
  var x = Math.round(element.offsetLeft + mapActivator.offsetWidth / 2);
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

var getMapActiveStatus = function () {
  mapStatus.classList.remove('map--faded');
  mapActivator.removeEventListener('click', getMapActiveStatus);
  changeStateElementsForm(false);
  userForm.classList.remove('ad-form--disabled');
  mapPinsElement.appendChild(fragment);
  inputAddress.value = getCoordinatePin(mapActivator);
};

mapActivator.addEventListener('click', getMapActiveStatus);

changeStateElementsForm(true);
inputAddress.value = coordinatePinStart.x + ',' + coordinatePinStart.y;

// module5-task1 ------------------------------------------ module5-task1

var typeOfRoom = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var MIN_PRICE_FOR_ROOM = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var getMinPriceForRoom = function (selectedRoom) {
  return MIN_PRICE_FOR_ROOM[selectedRoom];
};

var chouseTypeOfRoom = function (evtItem) {
  var newMinValue = getMinPriceForRoom(evtItem.value);
  priceInput.setAttribute('min', newMinValue);
  priceInput.setAttribute('placeholder', newMinValue);
};

typeOfRoom.addEventListener('click', function (evt) {
  chouseTypeOfRoom(evt.target);
}, true);

// --------------------------------------------------------- замена время выезда/въезда

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var setSyncTimeInOut = function (target, timeEvn) {
  if (timeEvn === 'In') {
    timeOut.value = target.value;
  }
  timeIn.value = target.value;
};

timeIn.addEventListener('change', function (evt) {
  setSyncTimeInOut(evt.target, 'In');
});

timeOut.addEventListener('change', function (evt) {
  setSyncTimeInOut(evt.target, 'Out');
});

// ------------------------------------------------------------ Перетаскиваем маркер


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

      if (element.offsetTop - shift.y < LIMIT_PIN_TOP) {
        elementCoordinate.y = LIMIT_PIN_TOP;
      }
      if (element.offsetTop - shift.y > LIMIT_PIN_BOTTOM) {
        elementCoordinate.y = LIMIT_PIN_BOTTOM;
      }
      if (element.offsetLeft - shift.x < LIMIT_PIN_LEFT) {
        elementCoordinate.x = LIMIT_PIN_LEFT;
      }
      if (element.offsetLeft - shift.x > LIMIT_PIN_RIGHT) {
        elementCoordinate.x = LIMIT_PIN_RIGHT;
      }
      return elementCoordinate;
    };

    var moveElement = function () {
      mapActivator.style.cursor = 'pointer';
      var newCoordinate = checkLimitPin(mapActivator);
      mapActivator.style.left = newCoordinate.x + 'px';
      mapActivator.style.top = newCoordinate.y + 'px';
    };

    moveElement();
  };

  var onPinUpOnMap = function () {
    inputAddress.value = getCoordinatePin(mapActivator);
    document.removeEventListener('mousemove', onPinMoveOnMap);
    document.removeEventListener('mouseup', onPinUpOnMap);
  };

  document.addEventListener('mousemove', onPinMoveOnMap);
  document.addEventListener('mouseup', onPinUpOnMap);
};

mapActivator.addEventListener('mousedown', onPinDown, true);
