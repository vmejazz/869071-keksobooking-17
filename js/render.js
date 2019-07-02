'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var mapPinsElement = document.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinLocationX = pin.location.x;
    var pinLocationY = pin.location.y;

    pinElement.style = 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;

    return pinElement;
  };

  var addPinsOnMap = function (arrayPins) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < arrayPins.length; k++) {
      fragment.appendChild(renderPin(arrayPins[k]));
    }

    mapPinsElement.appendChild(fragment);
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    var hideElement = function () {
      node.style.display = 'none';
    };

    setTimeout(hideElement, 1500);
  };

  var onSuccessSend = function () {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(successTemplate);
    document.querySelector('main').appendChild(fragment);
  };

  var onErrorSend = function () {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(errorTemplate);
    document.querySelector('main').appendChild(fragment);
  };


  window.render = {
    'addPinsOnMap': addPinsOnMap,
    'onErrorLoad': onErrorLoad,
    'onSuccessSend': onSuccessSend,
    'onErrorSend': onErrorSend
  };
})();
