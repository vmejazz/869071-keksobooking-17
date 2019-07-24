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

  var pinsRendered = [];

  //    -----   Рисуем карточки объявлений

  var writeFeaturesToCard = function (features) {
    var featuresForCard = '';
    features.forEach(function (item) {
      featuresForCard += '<li class="popup__feature popup__feature--' + item + '"></li>';
    });
    return featuresForCard;
  };

  var writePhotosToCard = function (photos) {
    var offerPhotos = '';
    photos.forEach(function (item) {
      offerPhotos += '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    });
    return offerPhotos;
  };

  var writePropertyToCard = function (elem, title, address, price, rooms, guests, checkIn, checkOut, features, photos, description, avatar) {
    elem.querySelector('.popup__title').innerHTML = title;
    elem.querySelector('.popup__text--address').innerHTML = address;
    elem.querySelector('.popup__text--price').innerHTML = price + '₽/ночь';
    elem.querySelector('.popup__text--capacity').innerHTML = rooms + ' комнаты для ' + guests + ' гостей';
    elem.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + checkIn + ', выезд до ' + checkOut;
    elem.querySelector('.popup__features').innerHTML = writeFeaturesToCard(features);
    elem.querySelector('.popup__photos').innerHTML = writePhotosToCard(photos);
    elem.querySelector('.popup__description').innerHTML = description;
    elem.querySelector('.popup__avatar ').src = avatar;
  };

  var renderCard = function (cardId) {
    var cardNumberFromID = cardId.slice(cardId.length - 1, cardId.length);
    var cardElement = mapCardTemplate.cloneNode(true);
    var cardProperty = pinsRendered[cardNumberFromID];
    writePropertyToCard(
        cardElement,
        cardProperty.offer.title,
        cardProperty.offer.address,
        cardProperty.offer.price,
        cardProperty.offer.rooms,
        cardProperty.offer.guests,
        cardProperty.offer.checkin,
        cardProperty.offer.checkout,
        cardProperty.offer.features,
        cardProperty.offer.photos,
        cardProperty.offer.description,
        cardProperty.author.avatar
    );

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

  var addPinsOnMap = function (arrayPins) {
    pinsRendered = [];
    var fragment = document.createDocumentFragment();
    var maxPinsRender = PIN_MAX_ELEMENT > arrayPins.length ? arrayPins.length : PIN_MAX_ELEMENT;
    for (var k = 0; k < maxPinsRender; k++) {
      k = (arrayPins[k].hasOwnProperty('offer')) ? k : k + 1;
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
