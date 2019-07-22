'use strict';

(function () {
  var pinsAfterFilter = [];
  var filterPropertyes = {};
  var filterFueatures = [];

  //  ------  Записываем все фильтры в объект

  var getFeatures = function () {
    filterFueatures = [];
    var filterInputChecked = mapFilter.querySelectorAll('input:checked');
    filterInputChecked.forEach(function (item) {
      filterFueatures.push(item.value);
    });
    return filterFueatures;
  };

  var getfilterObject = function (target) {
    for (var i = 0; i < target.children.length; i++) {
      filterPropertyes[target.children[i].name] = target.children[i].value;
    }
    filterPropertyes['housing-features'] = getFeatures();
    return filterPropertyes;
  };

  //  -----   Проверка пинов на условия

  var checkPinType = function (value) {
    var type = filterPropertyes['housing-type'];
    if (type === 'any' || value === type) {
      return true;
    }
    return false;
  };

  var checkPinPrice = function (value) {
    var price = filterPropertyes['housing-price'];
    if (price === 'any') {
      return true;
    } else if (price === 'low') {
      return value < 10000;
    } else if (price === 'middle') {
      return (value <= 50000 && value >= 10000);
    } else if (price === 'high') {
      return value > 50000;
    }
    return false;
  };

  var checkPinRooms = function (value) {
    var rooms = filterPropertyes['housing-rooms'];
    if (rooms === 'any') {
      return true;
    } else if (value === Number(rooms)) {
      return true;
    }
    return false;
  };

  var checkPinGuests = function (value) {
    var guests = filterPropertyes['housing-guests'];
    if (guests === 'any') {
      return true;
    } else if (value === Number(guests)) {
      return true;
    } else if (value > 2 && Number(guests) === 0) {
      return true;
    }
    return false;
  };

  var checkPinFeatures = function (valueArray) {
    var features = filterPropertyes['housing-features'];
    if (features.length < 0) {
      return true;
    } else {
      var state = features.every(function (currentValue) {
        if (valueArray.indexOf(currentValue) < 0) {
          return false;
        }
        return true;
      });
      return state;
    }
  };

  //  -----   Процесс фильтрации

  var checkPinForFilters = function (pin) {
    if (checkPinType(pin.offer.type) && checkPinPrice(pin.offer.price) && checkPinRooms(pin.offer.rooms) && checkPinGuests(pin.offer.guests) && checkPinFeatures(pin.offer.features)) {
      pinsAfterFilter.push(pin);
    }
  };

  var getPinsAfterFilter = function () {
    window.backEnd.loadedData.allPins.forEach(checkPinForFilters);
  };

  //  -----   Перерисовка Пинов от условий

  var refreshPins = function () {
    pinsAfterFilter = [];
    window.util.popupClose();

    getfilterObject(mapFilter);
    getPinsAfterFilter();
    window.main.resetPins();
    window.render.addPinsOnMap(pinsAfterFilter);
  };

  var mapFilter = document.querySelector('.map__filters');
  mapFilter.addEventListener('change', refreshPins, true);
})();
