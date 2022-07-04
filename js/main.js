import { getPhotoDescription } from './data.js';
import {renderPhotosPreview} from './photos.js';
import './validate-form.js';

const generateRandomPhotos = getPhotoDescription(25);
renderPhotosPreview(generateRandomPhotos);
