'use strict';

(function () {
  var PIN_MAX_ELEMENT = 5;

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
    arrayPins.splice(PIN_MAX_ELEMENT, arrayPins.length);
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

  var createModal = function (elem) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(elem);
    document.querySelector('main').appendChild(fragment);
  };

  var onModal = function (elem) {
    elem.addEventListener('click', function () {
      closeModal(elem);
    });
  };

  var closeModal = function (elem) {
    elem.remove();
  };

  var escEventClose = function (elem) {
    window.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeModal, elem);
    });
  };

  var onSuccessSend = function () {
    window.main.resetPage();
    createModal(successTemplate);
    var successModal = document.querySelector('.success');

    onModal(successModal);
    document.activeElement.blur();
    escEventClose(successModal);
    window.main.getMapDeactiveStatus();
  };

  // var acceptEditForm = function (button, closeElem) {
  //   var replayButton = closeElem.querySelector(button);
  //   replayButton.addEventListener('click', function () {
  //     closeModal(closeElem);
  //   });
  // };

  var onErrorSend = function () {
    createModal(errorTemplate);
    var errorModal = document.querySelector('.error');

    // acceptEditForm('.error__button', errorModal);

    onModal(errorModal);
    escEventClose(errorModal);
  };

  window.render = {
    'addPinsOnMap': addPinsOnMap,
    'onErrorLoad': onErrorLoad,
    'onSuccessSend': onSuccessSend,
    'onErrorSend': onErrorSend
  };
})();
