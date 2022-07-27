import './data.js';
import {renderPhotosPreview, clearPhotosPreview} from './photos.js';
import './validate-form.js';
import  './filters.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import { initFilterForm } from './sort-photos.js';

getData((photos) => {
  renderPhotosPreview(photos);
  initFilterForm(photos, (filteredPhotos) => {
    clearPhotosPreview();
    renderPhotosPreview(filteredPhotos);
  });
}, showAlert);
