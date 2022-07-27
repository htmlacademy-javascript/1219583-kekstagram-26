import './data.js';
import {renderPhotosPreview} from './photos.js';
import './validate-form.js';
import  './filters.js';
import {getData} from './api.js';
import {showAlert} from './util.js';


getData((users) => {
  renderPhotosPreview(users);
}, showAlert);
