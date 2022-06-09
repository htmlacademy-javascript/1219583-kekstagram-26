
/**
 * Возвращает случайное число
 * @param {number} min - минимальное значение из диапазона
 * @param {number} max - максимальное значение из диапазона
 * @return {integer}  - случайное число
 */

 const getRandomNumber = (min, max) => {
    if (min > max) {
      [min,max] = [max,min]
    }
    if (min < 0) {
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomNumber(3,10);

  /**
   *Проверяет длину введенного комментария
   * @param {string} string - строка
   * @param {integer} maxLength - максимальная длина строки
   * @return {boolean}  - true/false
   */
  const checkStringLength = (string, maxLength) => string.length <= maxLength

  checkStringLength('Комментарий', 140);

