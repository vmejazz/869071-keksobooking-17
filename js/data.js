'use strict';

(function () {
  var mapActivator = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');
  var userForm = document.querySelector('.ad-form');
  var inputAddress = userForm.querySelector('input[name=address]');


  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var LIMIT_PIN_TOP = 130;
  var LIMIT_PIN_BOTTOM = 630;
  var LIMIT_PIN_LEFT = -(mapActivator.offsetWidth / 2);
  var LIMIT_PIN_RIGHT = mapOverlay.offsetWidth - (mapActivator.offsetWidth / 2);

  window.data = {
    'PIN_WIDTH': PIN_WIDTH,
    'PIN_HEIGHT': PIN_HEIGHT,
    'LIMIT_PIN_TOP': LIMIT_PIN_TOP,
    'LIMIT_PIN_BOTTOM': LIMIT_PIN_BOTTOM,
    'LIMIT_PIN_LEFT': LIMIT_PIN_LEFT,
    'LIMIT_PIN_RIGHT': LIMIT_PIN_RIGHT,
    'mapActivator': mapActivator,
    'mapOverlay': mapOverlay,
    'userForm': userForm,
    'inputAddress': inputAddress
  };
})();