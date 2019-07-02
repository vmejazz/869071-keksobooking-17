'use strict';

(function () {
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

  typeOfRoom.addEventListener('change', function (evt) {
    chouseTypeOfRoom(evt.target);
  }, true);

  priceInput.setAttribute('min', getMinPriceForRoom(typeOfRoom.value));

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

  // ---------------------------------------------------------- Валидация количества комнат

  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');


  // -------------------------------- Валидация количества гостей

  var onFormSubmitButton = document.querySelector('.ad-form__submit');

  var messageOfRoomsNumbers = function (roomsValue) {
    var message = 'Неверное количество мест для гостей! Максимальное количество гостей выбранного размещения - ';
    switch (roomsValue) {
      case 1:
        return message + roomsValue + ' гость';
      case 2:
      case 3:
        return message + roomsValue + ' гостей';
      default:
        return 'Неверное количество мест для гостей! Выберите \'не для гостей\'';
    }
  };

  var getErrorInputGuest = function (num) {
    inputCapacity.setCustomValidity(messageOfRoomsNumbers(num));
    inputCapacity.style.background = '#ffd7cf';
  };

  var getValidatedInputGuest = function () {
    inputCapacity.setCustomValidity('');
    inputCapacity.style.background = '';
  };

  var checkInputCapacity = function (guestNumber, roomNumberOne, roomNumberTwo, roomNumberTree) {
    if (Number(inputCapacity.value) === roomNumberOne || Number(inputCapacity.value) === roomNumberTwo || Number(inputCapacity.value) === roomNumberTree) {
      getValidatedInputGuest();
    } else {
      getErrorInputGuest(guestNumber);
    }
  };

  var validateInputGuest = function () {
    switch (Number(inputRoomNumber.value)) {
      case 1:
        checkInputCapacity(1, 1);
        break;
      case 2:
        checkInputCapacity(2, 2, 1);
        break;
      case 3:
        checkInputCapacity(3, 3, 2, 1);
        break;
      case 100:
        checkInputCapacity(0, 0);
        break;
      default:
        getValidatedInputGuest();
    }
  };

  inputCapacity.addEventListener('change', validateInputGuest);
  onFormSubmitButton.addEventListener('click', validateInputGuest);

  // ------------------ отсыл формы

  var submitForm = document.querySelector('.ad-form');

  submitForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backEnd.sendForm(new FormData(submitForm), window.render.onSuccessSend, window.render.onErrorSend);
  });

})();


