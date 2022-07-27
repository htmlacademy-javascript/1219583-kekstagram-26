const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Не удалось установить связь с сервером.');
      }
    })
    .then((photos) => onSuccess(photos))
    .catch((err) => {
      onFail(err.message);
    });
};

export { getData };
