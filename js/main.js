import { getPhotoDescription } from './data.js';
import {renderPhotosPreview} from './photos.js';
import './validate-form.js';
import  './filters.js';

const generatedRandomPhotos = getPhotoDescription(25);
renderPhotosPreview(generatedRandomPhotos);
