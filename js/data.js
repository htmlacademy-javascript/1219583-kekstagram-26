import { getRandomNumber } from './util.js';

const NAME_USERS = [
  'Белла',
  'Кендал',
  'Миранда',
  'Хлоя',
  'Найджел',
  'Роберт',
  'Майкл',
  'Джон',
  'Стивен',
  'Илон'
];

const DESCRIPTION_PHOTO = [
  'Лучшие моменты',
  'Оставлю это здесь, потом удалю',
  'Что было вчера',
  'Почему бы и да',
  'Почему бы и нет',
  'Случайные фотографии - самые лучшие',
  'Моя жизнь',
  'Вся жизнь - театр',
  'А люди в нем - актеры',
  'Если есть рай на Земле, то он здесь'
];

const TEXT_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//--------------------------------------------------------------------
// счетчик id для фотограф
let photoId = 1;
const getUnigPhotoId = () => photoId++;

// счетчик id для коммент
let commentId = 1;
const getUnigCommentId = () => {
  commentId += 10;
  return commentId;
};

// счетчик url для фотограф
let photoUrl = 1;
const getUnigUrl = () => photoUrl++;

/**
* Возвращает случайный элемент
* @param {array} elements - массив данных
* @return {string}  - случайный элемент
*/

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};
//--------------------------------------------------------------------
/**
* Создает комментарий
* @return {array}  - массив данных
*/

const createPhotoComment = () => {
  return {
    id: getUnigCommentId(),
    avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
    message: getRandomArrayElement(TEXT_COMMENT),
    name: getRandomArrayElement(NAME_USERS)
  };
};

const getSomeComments = () => Array.from({length: getRandomNumber(1,25)}, createPhotoComment);
//--------------------------------------------------------------------
/**
* Создает описание изображения
* @return {array}  - массив данных
*/

const createPhotoDescription = () => {
  return {
    id: getUnigPhotoId(),
    url: `photos/${getUnigUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTO),
    likes: getRandomNumber(15,200),
    comments: getSomeComments()
  };
};

const getPhotoDescription = (count) => Array.from({length: count}, createPhotoDescription);

export { getPhotoDescription };
