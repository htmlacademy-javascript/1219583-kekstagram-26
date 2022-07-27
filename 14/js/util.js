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

const isEscapeKey = (evt) => ( evt.key === 'Escape' );

const mathClamp = function (number, min, max) {
  if (number < min) {
    number = min;
  }
  if (number > max) {
    number = max;
  }
  return number;
};

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ec5b54';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const randomIntegersBetweenRange = function (count, min, max) {
  const results = [];
  for (let i = 0; i < count;) {
    const randomInteger = getRandomNumber(min, max);
    if (!results.includes(randomInteger)) {
      results.push(randomInteger);
      i++;
    }
  }
  return results;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomNumber, isEscapeKey, checkStringLength, mathClamp, showAlert, randomIntegersBetweenRange, debounce };
