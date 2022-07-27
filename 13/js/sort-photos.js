import { randomIntegersBetweenRange, debounce } from './util.js';

const PHOTOS_RANDOM_COUNT = 10;
const filterButtonClass = 'img-filters__button';
const filterActiveButtonClass = 'img-filters__button--active';

const filterForm = document.querySelector('.img-filters');
const filterButtons = filterForm.querySelectorAll(`.${filterButtonClass}`);

filterForm.classList.remove('img-filters--inactive');

const filterPhotosDefault = function (photos) {
  return photos;
};

const filterPhotosRandom = function (photos, maxCount) {
  const indexes = randomIntegersBetweenRange(Math.min(photos.length, maxCount), 0, photos.length - 1);
  return indexes.map((index) => photos[index]);
};

const filterPhotosDiscussed = function (photos) {
  return [...photos].sort((prevPost, nextPhotos) => nextPhotos.comments.length - prevPost.comments.length);
};

const filterChange = function (evt, photos, cb) {
  const target = evt.target;

  const filterName = target.id;

  let filteredPhotos = [];
  switch (filterName) {
    case 'filter-default':
      filteredPhotos = filterPhotosDefault(photos);
      break;

    case 'filter-random':
      filteredPhotos = filterPhotosRandom(photos, PHOTOS_RANDOM_COUNT);
      break;

    case 'filter-discussed':
      filteredPhotos = filterPhotosDiscussed(photos);
      break;
  }

  cb(filteredPhotos);
};

const onFilterChange = debounce(filterChange);

const initFilterForm = function (photos, cb) {
  const onFilterButtonClick = function (evt) {
    if (!evt.target.classList.contains(filterButtonClass)) {
      return;
    }
    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove(filterActiveButtonClass);
    });
    evt.target.classList.add(filterActiveButtonClass);
    onFilterChange.call(this, evt, photos, cb);
  };
  filterForm.removeEventListener('click', onFilterButtonClick);
  filterForm.addEventListener('click', onFilterButtonClick);
};

export { initFilterForm };
