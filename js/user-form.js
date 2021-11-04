import {RoomsNumber, types, priceTypeOfHousing} from './mock.js';
import {showAlert} from './message.js';
import {sendData} from './api.js';

const cardForm = document.querySelector('.ad-form ');
const success = document.querySelector('#success').content;
const error = document.querySelector('#error').content;

const capacitySelect =document.querySelector('#capacity');
const capacityOption = capacitySelect.querySelectorAll('option');
const roomNumberSelect = document.querySelector('#room_number');

const typeSelect =document.querySelector('#type');
const housingPrice = document.querySelector('#price');

const timeinSelect =document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

const getDisabled = (startIndex, lengthOption, logicalType) => {
  if (!capacityOption[0].hasAttribute('disabled')) {
    capacityOption[0].setAttribute('disabled','');
  }
  capacityOption[2].selected=true;
  for( let i = startIndex; i <= lengthOption; i++ ){
    capacityOption[i].disabled = logicalType;
  }
};

const putPrice = (minPrice) => {
  housingPrice.min=minPrice;
  housingPrice.placeholder=minPrice;
};

roomNumberSelect.addEventListener('change', () => {
  if (roomNumberSelect.value === RoomsNumber.HUNDRED_ROOMS) {
    capacityOption[3].disabled = false;
    getDisabled(0, 2, true);
    capacityOption[3].selected=true;
  }
  else if (roomNumberSelect.value === RoomsNumber.ONE_ROOM) {
    getDisabled(0, 3, true);
    capacityOption[2].disabled = false;
  }
  else if (roomNumberSelect.value === RoomsNumber.TWO_ROOMS) {
    getDisabled(0, 3, true);
    getDisabled(1, 2, false);
  }
  else {
    capacityOption[3].disabled = true;
    getDisabled(0, 2, false);
  }
});

typeSelect.addEventListener('change', () => {
  if (typeSelect.value === types[3]) {
    putPrice(priceTypeOfHousing.bungalow);
  }
  else if (typeSelect.value === types[1]) {
    putPrice(priceTypeOfHousing.flat);
  }
  else if (typeSelect.value === types[4]) {
    putPrice(priceTypeOfHousing.hotel);
  }
  else if (typeSelect.value === types[2]) {
    putPrice(priceTypeOfHousing.house);
  }
  else {
    putPrice(priceTypeOfHousing.palace);
  }
});

timeinSelect.addEventListener('change', () => {
  timeoutSelect.value = timeinSelect.value;
});

timeoutSelect.addEventListener('change', () => {
  timeinSelect.value = timeoutSelect.value;
});

const setUserFormSubmit = () => {
  cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => showAlert(success),
      () => showAlert(error),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit ();
