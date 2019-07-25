'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'bmp'];

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var fileChooserPhoto = document.querySelector('#images');
  var previewPhotos = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

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

  var createImagePhoto = function () {
    var divPhotoElement = previewPhotos.cloneNode(true);
    var node = document.createElement('img');
    node.classList.add('ad-form__img');
    node.style = 'margin: 0 auto; text-align: center;';
    node.style.left = 0;
    node.style.right = 0;
    node.style.width = '70px';
    node.style.height = '70px';

    node.textContent = 'Photo';

    divPhotoElement.insertAdjacentElement('afterbegin', node);
    return divPhotoElement;
  };

  fileChooserAvatar.addEventListener('change', function () {
    setLoadedImage(fileChooserAvatar, previewAvatar);
  });

  fileChooserPhoto.addEventListener('change', function () {
    var newPreview = createImagePhoto();
    setLoadedImage(fileChooserPhoto, newPreview);
    previewPhotos.remove();
    photoContainer.appendChild(newPreview);
  });
})();


