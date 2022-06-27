import { getPhotoDescription } from './data.js';
import {getPhotosPreview} from './photos.js';

const similarPhoto = getPhotoDescription(25);

getPhotosPreview(similarPhoto);
