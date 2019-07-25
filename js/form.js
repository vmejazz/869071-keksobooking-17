'use strict';

(function () {
  var typeOfRoom = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var priceMinForTypeRoomMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var NumberOfRooms = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    HUNDRED: 100
  };

  var getMinPriceForRoom = function (selectedRoom) {
    return priceMinForTypeRoomMap[selectedRoom];
  };

  var chooseTypeOfRoom = function () {
    var newMinValue = getMinPriceForRoom(typeOfRoom.value);
    priceInput.setAttribute('min', newMinValue);
    priceInput.setAttribute('placeholder', newMinValue);
  };

  typeOfRoom.addEventListener('change', function () {
    chooseTypeOfRoom();
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
      case NumberOfRooms.ONE:
        return message + roomsValue + ' гость';
      case NumberOfRooms.TWO:
      case NumberOfRooms.THREE:
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
      case NumberOfRooms.ONE:
        checkInputCapacity(1, 1);
        break;
      case NumberOfRooms.TWO:
        checkInputCapacity(2, 2, 1);
        break;
      case NumberOfRooms.THREE:
        checkInputCapacity(3, 3, 2, 1);
        break;
      case NumberOfRooms.HUNDRED:
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
    window.backEnd.sendData(new FormData(submitForm), window.render.onSuccessSend, window.render.onErrorSend);
  });

  window.form = {
    'chooseTypeOfRoom': chooseTypeOfRoom
  };

})();


