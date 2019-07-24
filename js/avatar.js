'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'bmp'];

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var fileChooserPhoto = document.querySelector('images');
  var previewPhotos = document.querySelector('.ad-form__photo');

  var setLoadedImage = function (elem, previewField) {
    var file = elem.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewField.children[0].src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    setLoadedImage(fileChooserAvatar, previewAvatar);
  });
})();


