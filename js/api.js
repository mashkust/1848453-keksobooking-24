import {resetFilters} from './filters.js' ;
import {mainPinMarker, startCoordinate} from './map-form.js';
import {showAlertError} from './message.js';
import {resetPhotos} from './avatar.js';

const getData = async (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
    })
    .catch(() => {
      showAlertError('Не удалось получить похожие объявления');
    });
};

const sendData = async (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        document.querySelector('.ad-form__reset').click();
        resetFilters();
        resetPhotos();
        mainPinMarker.setLatLng(startCoordinate);
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
