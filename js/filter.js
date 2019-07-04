'use strict';

(function () {
  //    ---------     фильтрация Пинов

  var filterTypeofHouse = function (filterValue) {
    window.main.resetPins();
    var arrayPins = window.backEnd.loadedData.allPins;
    var newArrayPins = arrayPins.filter(function (elem) {
      return elem.offer.type === filterValue;
    });
    window.render.addPinsOnMap(newArrayPins);
  };

  var refreshPins = function (evt) {
    switch (evt.target.name) {
      case 'housing-type':
        filterTypeofHouse(evt.target.value);
        break;
      default:
        break;
    }
  };

  var mapFilter = document.querySelector('.map__filters');
  mapFilter.addEventListener('change', refreshPins, true);
})();
