import { mathClamp } from './util.js';

const PREVIEW_SCALE_STEP = 25;
const PREVIEW_MIN_SCALE = 25;
const PREVIEW_MAX_SCALE = 100;
const PREVIEW_DEFAULT_SCALE = 100;

const effectSliderContainer = document.querySelector('.effect-level__slider');
const effectInput = document.querySelector('.effect-level__value');
const previewImg = document.querySelector('.img-upload__preview img');
const scaleValueInput = document.querySelector('.scale__control--value');
const imgEffectsFieldset = document.querySelector('.img-upload__effects');
const uploadForm = document.querySelector('.img-upload__form');
let effectValueSlider = null;

const ImageEffectFilter = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const sliderFilterSettings = {
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    format: {
      to(value) { return value.toFixed(1); },
      from(value) { return parseFloat(value); }
    }
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    format: {
      to(value) { return value.toFixed(1); },
      from(value) { return parseFloat(value); }
    }
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    format: {
      to(value) { return `${value}%`; },
      from(value) { return parseFloat(value); }
    }
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    format: {
      to(value) { return `${value.toFixed(1)}px`; },
      from(value) { return parseFloat(value); }
    }
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    format: {
      to(value) { return value.toFixed(1); },
      from(value) { return parseFloat(value); }
    }
  }
};

const showEffectSlider = () => {
  effectSliderContainer.removeAttribute('hidden', true);
};

const hideEffectSlider = () => {
  effectSliderContainer.setAttribute('hidden', true);
};

const updatePreviewImgClass = (filterName) => {
  previewImg.className = (filterName) ? `effects__preview--${filterName}` : '';
};

const updatePreviewImgEffect = (effectName, effectValue) => {
  previewImg.style.filter = (effectName) ? `${ImageEffectFilter[effectName]}(${effectValue})` : '';
};

function onFilterChange(evt) {
  const filterName = evt.target.value;
  hideEffectSlider();
  updatePreviewImgClass(filterName);
  updatePreviewImgEffect();
  const sliderSettings = sliderFilterSettings[filterName];
  if (sliderSettings) {
    effectValueSlider.updateOptions(sliderSettings);
    effectValueSlider.set(sliderSettings.max);
    showEffectSlider();
  }
}

function enableFilters() {
  effectInput.value = 1;
  hideEffectSlider();
  effectValueSlider = noUiSlider.create(
    effectSliderContainer,
    {
      range: { min: 0, max: 1, },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to(value) { return value; },
        from(value) { return value; }
      }
    }
  );

  effectValueSlider.on('update', () => {
    const effectValue = effectValueSlider.get();
    const effectName = uploadForm.effect.value;
    effectInput.value = effectValue;
    if (uploadForm.effect.value === 'none') {
      return;
    }
    updatePreviewImgEffect(effectName, effectValue);
  });
  imgEffectsFieldset.addEventListener('change', onFilterChange);
}

function disableFilters() {
  imgEffectsFieldset.removeEventListener('change', onFilterChange);
  updatePreviewImgClass();
  updatePreviewImgEffect();
  uploadForm.effect.value = 'none';
  effectValueSlider.destroy();
}

function getCurrentScale() {
  return parseFloat(scaleValueInput.value);
}

function setPreviewScale(scale) {
  scale = mathClamp(scale, PREVIEW_MIN_SCALE, PREVIEW_MAX_SCALE);
  scaleValueInput.value = `${scale}%`;
  previewImg.style.transform = `scale(${scale}%)`;
}

function onScaleButtonClick(evt) {
  const currentScale = getCurrentScale();
  if (evt.target.classList.contains('scale__control--smaller')) {
    return setPreviewScale(currentScale - (PREVIEW_SCALE_STEP));
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    return setPreviewScale(currentScale + (PREVIEW_SCALE_STEP));
  }
}

function makeScalable() {
  setPreviewScale(PREVIEW_DEFAULT_SCALE);
  document.querySelector('.img-upload__scale').addEventListener('click', onScaleButtonClick);
}

function makeUnscalable() {
  setPreviewScale(PREVIEW_DEFAULT_SCALE);
  document.querySelector('.img-upload__scale').removeEventListener('click', onScaleButtonClick);
}

export { previewImg, enableFilters, disableFilters, makeScalable, makeUnscalable };
