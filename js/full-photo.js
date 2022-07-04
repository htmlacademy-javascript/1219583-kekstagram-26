import { isEscapeKey } from './util.js';
// import { renderPhotosPreview } from './photos.js';

const fullPhoto = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');

const photoSrc = fullPhoto.querySelector('.big-picture__img').querySelector('img');
const photoLike = fullPhoto.querySelector('.likes-count');

const photoDescription = fullPhoto.querySelector('.social__caption');
const closeButton = fullPhoto.querySelector('#picture-cancel');

const commentsForm = fullPhoto.querySelector('.social__comments');
const oneCommentForm = commentsForm.querySelector('.social__comment');
const commentsCount = fullPhoto.querySelector('.comments-count');

// Временное скрытие .social__comment-count, .comments-loader
const commentLoader = fullPhoto.querySelector('.comments-loader');
const commentCount = fullPhoto.querySelector('.social__comment-count');

commentCount.classList.add('hidden');
commentLoader.classList.add('hidden');
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

/**
 * Заполняет форму полноразмерного изображения
 * @param {Object} photo - обьект массива
 */
const createFullPhoto = (photo) => {
  photoSrc.src = photo.url;
  photoLike.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;

  createComment(photo.comments);
};

/**
* Основная функция закрытия полноразмерного изображения
*/
const closeFullPhoto = () => {
  fullPhoto.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', clickEscButton);

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

  createFullPhoto(photo);
  document.addEventListener('keydown', clickEscButton);
};

/**
* Закрывает полноразмерное изображение нажатием на кнопку выхода
*/
closeButton.addEventListener('click', () => {
  closeFullPhoto();
});

export { openFullPhoto, bodyElement };
