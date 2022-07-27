import { openFullPhoto } from './full-photo.js';

const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const clearPhotosPreview = function () {
  photoList.querySelectorAll('.picture').forEach((photoListElement) => {
    photoListElement.remove();
  });
};

/**
 * Отображение фото других пользователей
 * @param {array} photos - массив данных
 */
const renderPhotosPreview = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', () => openFullPhoto(photo));
    photosFragment.appendChild(photoElement);
  });

  photoList.appendChild(photosFragment);
};

export { renderPhotosPreview, clearPhotosPreview };
