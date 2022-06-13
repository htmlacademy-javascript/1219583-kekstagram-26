
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Возвращает случайное число
 * @param {number} a - минимальное значение из диапазона
 * @param {number} b - максимальное значение из диапазона
 * @return {integer}  - случайное число
 */

const getRandomNumber = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

/**
*Проверяет длину введенного комментария
* @param {string} string - строка
* @param {integer} maxLength - максимальная длина строки
* @return {boolean}  - true/false
*/

const checkStringLength = function (string, length) {
  return string.length <= length;
};

checkStringLength('Комментарий', 140);

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

/**
* Возвращает случайный элемент
* @param {array} elements - массив данных
* @return {string}  - случайный элемент
*/

const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

/**
* Создает комментарий
* @return {array}  - массив данных
*/

const createPhotoComment = function () {
  return {
    id: getRandomNumber(1,1000),
    avatar: `img/avatar-${getRandomNumber(1,25)}.svg`,
    message: getRandomArrayElement(TEXT_COMMENT),
    name: getRandomArrayElement(NAME_USERS)
  };
};

/**
* Создает описание изображения
* @return {array}  - массив данных
*/

const createPhotoDescription = function () {
  return {
    id: getRandomNumber(1,25),
    url: `photos/${getRandomNumber(1,25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTO),
    likes: getRandomNumber(15,200),
    comments: createPhotoComment()
  };
};

Array.from({length: 25}, createPhotoDescription);

