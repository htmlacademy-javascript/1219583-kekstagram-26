import { openFullPhoto } from './full-photo.js';
import { getPhotoDescription } from './data.js';

const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photosPreview = getPhotoDescription(25);

/**
 * Отображение фото других пользователей
 * @param {array} similarPhoto - массив данных
 */
const renderPhotosPreview = () => {
  const photosFragment = document.createDocumentFragment();
  photosPreview.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', () => openFullPhoto(photo));
    photosFragment.appendChild(photoElement);
  });

  photoList.appendChild(photosFragment);
};

export { renderPhotosPreview };
