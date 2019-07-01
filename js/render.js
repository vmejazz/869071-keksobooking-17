'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinLocationX = pin.location.x;
    var pinLocationY = pin.location.y;

    pinElement.style = 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  var fragment = document.createDocumentFragment();
  for (var k = 0; k < window.cards.arrayPins.length; k++) {
    fragment.appendChild(renderPin(window.cards.arrayPins[k]));
  }

  window.render = {
    'fragment': fragment
  };
})();
