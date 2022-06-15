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

//checkStringLength('Комментарий', 140);
export {getRandomNumber};
