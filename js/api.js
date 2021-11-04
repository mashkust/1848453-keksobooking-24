import {resetFilters} from './filters.js' ;
import { mainPinMarker , startCoordinate} from './map-form.js';

const getData = async (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
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
        onSuccess();
        document.querySelector('.ad-form__reset').click();
        resetFilters();
        mainPinMarker.setLatLng(startCoordinate);
        document.querySelector('#address').value = `${35.68950},${139.69200}`;
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
