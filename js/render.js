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

  var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  //    -----   Рисуем карточки объявлений

  var renderCard = function (cardId) {
    var cardNumberFromID = cardId.slice(cardId.length - 1, cardId.length);
    var cardElement = mapCardTemplate.cloneNode(true);
    var cardProperty = pinsRendered[cardNumberFromID];
    cardElement.querySelector('.popup__title').innerHTML = cardProperty.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = cardProperty.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = cardProperty.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').innerHTML = cardProperty.offer.rooms + ' комнаты для ' + cardProperty.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + cardProperty.offer.checkin + ', выезд до ' + cardProperty.offer.checkout;
    var featuresForCard = '';
    cardProperty.offer.features.forEach(function (item) {
      featuresForCard += '<li class="popup__feature popup__feature--' + item + '"></li>';
    });
    cardElement.querySelector('.popup__features').innerHTML = featuresForCard;
    cardElement.querySelector('.popup__description').innerHTML = cardProperty.offer.description;
    var offerPhotos = '';
    cardProperty.offer.photos.forEach(function (item) {
      offerPhotos += '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    });
    cardElement.querySelector('.popup__photos').innerHTML = offerPhotos;
    cardElement.querySelector('.popup__avatar ').src = cardProperty.author.avatar;

    return cardElement;
  };

  var addCardOnMap = function (evtPin) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(renderCard(evtPin.id));
    mapPinsElement.appendChild(fragment);
  };

  //    -----   Рисуем Пины на карте

  var renderPin = function (pin, pinIndex) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinLocationX = pin.location.x;
    var pinLocationY = pin.location.y;

    pinElement.style = 'left: ' + pinLocationX + 'px; top: ' + pinLocationY + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;
    pinElement.querySelector('img').id = 'cardId ' + pinIndex;

    return pinElement;
  };

  var pinsRendered = [];

  var addPinsOnMap = function (arrayPins) {
    pinsRendered = [];
    var fragment = document.createDocumentFragment();
    var maxPinsRender = PIN_MAX_ELEMENT > arrayPins.length ? arrayPins.length : PIN_MAX_ELEMENT;
    for (var k = 0; k < maxPinsRender; k++) {
      pinsRendered.push(arrayPins[k]);
      fragment.appendChild(renderPin(arrayPins[k], k));
    }

    mapPinsElement.appendChild(fragment);
  };

  //    -----   Модальные окна

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

  var onModalClick = function (elem) {
    elem.addEventListener('click', function () {
      closeModal(elem);
    });
  };

  var closeModal = function (elem) {
    elem.remove();
  };

  var escEventClose = function (elem) {
    window.addEventListener('keydown', function (evt) {
      window.util.isEscEventPress(evt, closeModal, elem);
    });
  };

  var onSuccessSend = function () {
    window.main.resetPage();
    createModal(successTemplate);
    var successModal = document.querySelector('.success');

    onModalClick(successModal);
    document.activeElement.blur();
    escEventClose(successModal);
    window.main.getMapDeactiveStatus();
  };

  var onErrorSend = function () {
    createModal(errorTemplate);
    var errorModal = document.querySelector('.error');

    onModalClick(errorModal);
    escEventClose(errorModal);
  };

  window.addEventListener('keydown', function (evt) {
    window.util.isEscEventPress(evt, window.util.popupClose);
  });

  window.render = {
    'addPinsOnMap': addPinsOnMap,
    'onErrorLoad': onErrorLoad,
    'onSuccessSend': onSuccessSend,
    'onErrorSend': onErrorSend,
    'addCardOnMap': addCardOnMap,
  };
})();
