'use strict';

(function () {
  var ANSWER_OK = 200;
  var ANSWER_NOT_FOUND = 404;
  var ANSWER_INTERNAL_SERVER = 500;
  var ANSWER_SERVER_ON_REBUILD = 503;
  var loadedData = {};

  var xhrRequestJson = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ANSWER_OK:
          loadedData.allPins = xhr.response;
          onSuccess(xhr.response);
          break;
        case ANSWER_NOT_FOUND:
          onError('Статус ответа: ' + xhr.status + ' Ошибка, страницы не существует');
          break;
        case ANSWER_INTERNAL_SERVER:
          onError('Статус ответа: ' + xhr.status + ' Ошибка на сервере');
          break;
        case ANSWER_SERVER_ON_REBUILD:
          onError('Статус ответа: ' + xhr.status + ' Производятся работы на сервере');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    return xhr;
  };

  var loadData = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';

    var xhrJson = xhrRequestJson(onSuccess, onError);

    xhrJson.open('GET', URL);
    xhrJson.send();

  };

  var sendData = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';

    var xhrJson = xhrRequestJson(onSuccess, onError);

    xhrJson.open('POST', URL);
    xhrJson.send(data);
  };

  window.backEnd = {
    'loadData': loadData,
    'sendData': sendData,
    'loadedData': loadedData,
  };

})();
