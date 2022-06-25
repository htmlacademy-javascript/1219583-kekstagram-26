import { dataPhotoDescription } from './data.js';

const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhoto = dataPhotoDescription();
const photosFragment = document.createDocumentFragment();

similarPhoto.forEach(({url, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  photosFragment.append(photoElement);
});

photoList.append(photosFragment);
