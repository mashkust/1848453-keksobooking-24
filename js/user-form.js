const capacitySelect =document.querySelector('#capacity');
const capacityOption = capacitySelect.querySelectorAll('option');
const roomNumberSelect = document.querySelector('#room_number');

const gerDisabled = (startIndex, lengthOption, logicalType) => {
  if (!capacityOption[0].hasAttribute('disabled','')) {
    capacityOption[0].setAttribute('disabled','');
  }
  for( let i = startIndex; i <= lengthOption; i++ ){
    capacityOption[i].disabled = logicalType;
  }
};

roomNumberSelect.addEventListener('change', () => {
  if (roomNumberSelect.value === '100') {
    capacityOption[3].disabled = false;
    gerDisabled(0, 2, true);
  }
  else if (roomNumberSelect.value === '1') {
    gerDisabled(0, 3, true);
    capacityOption[2].disabled = false;
  }
  else if (roomNumberSelect.value === '2') {
    gerDisabled(0, 3, true);
    gerDisabled(1, 2, false);
  }
  else if (roomNumberSelect.value === '3') {
    capacityOption[3].disabled = true;
    gerDisabled(0, 2, false);
  }
});
