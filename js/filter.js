'use strict';

(function () {
  var pinsAfterFilter = [];
  var filterPropertyes = {};
  var filterFeatures = [];
  var PriceFilter = {
    MIN_PRICE: 10000,
    MAX_PRICE: 50000
  };

  //  ------  Записываем все фильтры в объект

  var getFeatures = function () {
    filterFeatures = [];
    var filterInputChecked = Array.from(mapFilter.querySelectorAll('input:checked'));
    filterInputChecked.forEach(function (item) {
      filterFeatures.push(item.value);
    });
    return filterFeatures;
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
    return (type === 'any' || value === type);
  };

  var checkPinPrice = function (value) {
    var price = filterPropertyes['housing-price'];
    if (price === 'any') {
      return value;
    } else if (price === 'low') {
      return value < PriceFilter.MIN_PRICE;
    } else if (price === 'high') {
      return value > PriceFilter.MAX_PRICE;
    }
    return (value <= PriceFilter.MAX_PRICE && value >= PriceFilter.MIN_PRICE);
  };

  var checkPinRooms = function (value) {
    var rooms = filterPropertyes['housing-rooms'];
    return (rooms === 'any' || value === Number(rooms));
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
      return features.every(function (value) {
        return (valueArray.indexOf(value) >= 0);
      });
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
  mapFilter.addEventListener('change', window.debounce(refreshPins), true);
})();
