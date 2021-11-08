const FORMATS = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.ad-form-header__input');
const photoChooser = document.querySelector('.ad-form__input');
const preview = document.querySelector('.ad-form-header__preview');
const photoPreview = document.querySelector('.ad-form__photo');
const clearButton = document.querySelector('.ad-form__reset');

export const resetPhotos = () => {
  photoPreview.style.backgroundImage = 'none';
  preview.style.backgroundImage = 'none';
  preview.childNodes[1].style.zIndex = 0;
};

const addStyle = (templatePhoto, file) =>{
  templatePhoto.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  templatePhoto.style.backgroundRepeat = 'no-repeat';
  templatePhoto.style.backgroundSize = '100%';
};

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FORMATS.some((it) => fileName.endsWith(it));
  if (matches) {
    addStyle(preview, file);
    preview.childNodes[1].style.zIndex = -1;
  }
});

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FORMATS.some((it) => fileName.endsWith(it));
  if (matches) {
    addStyle(photoPreview, file);
  }
});

clearButton.addEventListener('click', () => resetPhotos());
