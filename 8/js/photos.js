import { getPhotoDescription } from './data.js';
import { openFullPhoto } from './full-photo.js';

const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photosFragment = document.createDocumentFragment();

/**
 * Отображение фото других пользователей
 * @param {array} similarPhoto - массив данных
 */
const getPhotosPreview = (similarPhoto) => {
  similarPhoto.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', () => openFullPhoto(photo));
    photosFragment.appendChild(photoElement);
  });

  photoList.appendChild(photosFragment);
};

export { getPhotosPreview };
