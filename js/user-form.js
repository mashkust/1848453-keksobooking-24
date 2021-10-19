import {ROOMS_NUMBER, TYPES, TIMES} from './mock.js';

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
  if (roomNumberSelect.value === ROOMS_NUMBER.HUNDRED_ROOMS) {
    capacityOption[3].disabled = false;
    getDisabled(0, 2, true);
    capacityOption[3].selected=true;
  }
  else if (roomNumberSelect.value === ROOMS_NUMBER.ONE_ROOM) {
    getDisabled(0, 3, true);
    capacityOption[2].disabled = false;
  }
  else if (roomNumberSelect.value === ROOMS_NUMBER.TWO_ROOMS) {
    getDisabled(0, 3, true);
    getDisabled(1, 2, false);
  }
  else {
    capacityOption[3].disabled = true;
    getDisabled(0, 2, false);
  }
});

typeSelect.addEventListener('change', () => {
  if (typeSelect.value === TYPES[3]) {
    putPrice(0);
  }
  else if (typeSelect.value === TYPES[1]) {
    putPrice(1000);
  }
  else if (typeSelect.value === TYPES[4]) {
    putPrice(3000);
  }
  else if (typeSelect.value === TYPES[2]) {
    putPrice(5000);
  }
  else {
    putPrice(10000);
  }
});

timeinSelect.addEventListener('change', () => {
  timeoutSelect.value = timeinSelect.value;
});

timeoutSelect.addEventListener('change', () => {
  timeinSelect.value = timeoutSelect.value;
});
