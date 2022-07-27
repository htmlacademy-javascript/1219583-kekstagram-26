import { isEscapeKey } from './util.js';

const fullPhoto = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');

const photoSrc = fullPhoto.querySelector('.big-picture__img').querySelector('img');
const photoLike = fullPhoto.querySelector('.likes-count');

const photoDescription = fullPhoto.querySelector('.social__caption');
const closeButton = fullPhoto.querySelector('#picture-cancel');

const commentsForm = fullPhoto.querySelector('.social__comments');
const oneCommentForm = commentsForm.querySelector('.social__comment');
const commentsCount = fullPhoto.querySelector('.comments-count');

const commentLoader = fullPhoto.querySelector('.comments-loader');

const loadedComment = document.querySelector('.comments-loaded');

const SHOWN_COMMENTS_COUNT = 5;
let shownComments = 0;
let photoComments = [];

//-------------------------------------------

/**
 * Заполняет форму комментариями пользователя
 * @param {array} commentsList - массив комментариев
 */
const createComment = (commentsList) => {
  const commentsFragment = document.createDocumentFragment();
  commentsList.forEach((comment) => {
    const commentItem = oneCommentForm.cloneNode(true);
    const commetatorPicture = commentItem.querySelector('.social__picture');

    commetatorPicture.src = comment.avatar;
    commetatorPicture.alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(commentItem);
  });

  commentsForm.appendChild(commentsFragment);
};

const loadSomeComments = function () {
  createComment(photoComments.slice(shownComments, shownComments + SHOWN_COMMENTS_COUNT));
  shownComments += SHOWN_COMMENTS_COUNT;

  if (photoComments.length > shownComments) {
    commentLoader.classList.remove('hidden');
  } else {
    commentLoader.classList.add('hidden');
    shownComments = photoComments.length;
  }
  loadedComment.textContent = shownComments;
};

/**
 * Заполняет форму полноразмерного изображения
 * @param {Object} photo - обьект массива
 */
const createFullPhoto = (photo) => {

  shownComments = 0;
  commentLoader.addEventListener('click', loadSomeComments);

  photoSrc.src = photo.url;
  photoLike.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;
  photoComments = photo.comments;

  commentsForm.innerHTML = '';
  loadSomeComments();
};

/**
* Основная функция закрытия полноразмерного изображения
*/
const closeFullPhoto = () => {
  fullPhoto.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', clickEscButton);
  commentLoader.removeEventListener('click', loadSomeComments);
  commentsForm.innerHTML = '';
};

/**
* Закрывает полноразмерное изображение нажатием на клавишу esc
*/
function clickEscButton (evt) {
  if (isEscapeKey(evt)) {
    closeFullPhoto();
  }
}

/**
 * Открывает полноразмерное изобрaжение
 */
const openFullPhoto = (photo) => {
  fullPhoto.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', clickEscButton);
  commentLoader.addEventListener('click', loadSomeComments);

  createFullPhoto(photo);
};

closeButton.addEventListener('click', closeFullPhoto);

export { openFullPhoto, bodyElement };
