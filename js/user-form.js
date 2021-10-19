import {ROOMS_NUMBER} from './mock.js';

const capacitySelect =document.querySelector('#capacity');
const capacityOption = capacitySelect.querySelectorAll('option');
const roomNumberSelect = document.querySelector('#room_number');

const getDisabled = (startIndex, lengthOption, logicalType) => {
  if (!capacityOption[0].hasAttribute('disabled')) {
    capacityOption[0].setAttribute('disabled','');
  }
  for( let i = startIndex; i <= lengthOption; i++ ){
    capacityOption[i].disabled = logicalType;
  }
};

roomNumberSelect.addEventListener('change', () => {
  if (roomNumberSelect.value === ROOMS_NUMBER.HUNDRED_ROOMS) {
    capacityOption[3].disabled = false;
    getDisabled(0, 2, true);
  }
  else if (roomNumberSelect.value === ROOMS_NUMBER.ONE_ROOM) {
    getDisabled(0, 3, true);
    capacityOption[2].disabled = false;
  }
  else if (roomNumberSelect.value === ROOMS_NUMBER.TWO_ROOMS) {
    getDisabled(0, 3, true);
    getDisabled(1, 2, false);
  }
  else if (roomNumberSelect.value === ROOMS_NUMBER.THREE_ROOMS) {
    capacityOption[3].disabled = true;
    getDisabled(0, 2, false);
  }
});

