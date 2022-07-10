import { isEscapeKey, checkStringLength } from './util.js';
import { bodyElement } from './full-photo.js';

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;

const uploadInputElement = document.querySelector('#upload-file');
const modalContainer = document.querySelector('.img-upload__overlay');

const uploadForm = document.querySelector('.img-upload__form');
const cancelButton = document.querySelector('#upload-cancel');

const hashtagInput = document.querySelector('.text__hashtags');
/**
* Открытие модального окна
*/
const showModalHandler = () => {
  modalContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress);
};

/**
* Закрытие модального окна
*/
const closeModal = () => {
  modalContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
  uploadForm.reset();
};

/**
* Закрывает модальное окно нажатием на клавишу esc
*/
function onEscPress (evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-error'
});

uploadInputElement.addEventListener('change', showModalHandler);

// отменить обработчик Esc при фокусе
hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

/**
 * Проверка на кол-во хештегов
 * @param {string} value - значение поля ввода хештега
 */
const validateHashtagsCount = function (value) {
  const words = value.split(' ');
  return (words.length <= MAX_HASHTAGS);
};

pristine.addValidator(hashtagInput, validateHashtagsCount, 'Не более 5 тегов');

/**
 * Проверка на длину каждого хештега
 * @param {string} value - значение поля ввода хештега
 */
const validateHashtagsLength = (value) => {
  const words = value.split(' ');
  return words.every((word) => word.length <= HASHTAG_MAX_LENGTH);
};

pristine.addValidator(hashtagInput, validateHashtagsLength, `Длина хештега не может превышать ${HASHTAG_MAX_LENGTH} символов`);

/**
 * Проверка на допустимые символы
 * @param {string} value - значение поля ввода хештега
 */
const validateHashtags = (value) => {
  const words = value.split(' ');
  return words.every((word) => {
    const re = new RegExp(HASHTAG_PATTERN);
    return re.test(word);
  });
};

pristine.addValidator(hashtagInput, validateHashtags, 'Хештеги содержат недопустимые символы');

/**
 * Проверка на уникальность хэштегов
 * @param {string} value - значение поля ввода хештега
 */
const validateIsHashtagsUnique = (value) => {
  const words = value.toLowerCase().split(' ');
  const uniqueTag = new Set(words);

  return (uniqueTag.size === words.length);
};

pristine.addValidator(hashtagInput, validateIsHashtagsUnique, 'Хештеги должны быть уникальными');

const commentInput = document.querySelector('.text__description');

// отменить обработчик Esc при фокусе
commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

/**
 * Проверка на длину комментария
 * @param {string} value - значение поля ввода комментария
 */
const validateCommentLength = (value) => ( checkStringLength(value, COMMENT_MAX_LENGTH) );

pristine.addValidator(commentInput, validateCommentLength, 'Длина комментария не должна превышать 140 символов');

cancelButton.addEventListener('click', () => {
  closeModal();
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (isFormValid) {
    uploadForm.submit();
  }
});
