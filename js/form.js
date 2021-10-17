const getInactiveNotice = () => {
  const formNotice = document.querySelector('.ad-form');
  const inactiveNotice = formNotice.classList.add('ad-form--disabled');
  const fieldsetNotice = formNotice.getElementsByTagName('fieldset');
  for( let i = 0; i < fieldsetNotice.length; i++ ){
    fieldsetNotice[i].setAttribute('disabled','');
  }
  return inactiveNotice;
};

const getInactiveMap = () => {
  const formMap = document.querySelector('.map__filters');
  const inactiveMap = formMap.classList.add('map__filters--disabled');
  const fieldsetMap = formMap.getElementsByTagName('fieldset');
  for( let i = 0; i < fieldsetMap.length; i++ ){
    fieldsetMap[i].setAttribute('disabled','');
  }
  return inactiveMap;
};

const getActiveNotice = () => {
  if (document.querySelector('.ad-form').classList.contains('ad-form--disabled')) {
    const formNotice = document.querySelector('.ad-form');
    const activeNotice = formNotice.classList.remove('ad-form--disabled');
    const fieldsetNotice = formNotice.getElementsByTagName('fieldset');
    for( let i = 0; i < fieldsetNotice.length; i++ ){
      fieldsetNotice[i].disabled=false;
    }
    return activeNotice;
  }
};

const getActiveMap = () => {
  if (document.querySelector('.ad-form').classList.contains('ad-form--disabled')){
    const formMap = document.querySelector('.map__filters');
    const activeMap = formMap.classList.remove('map__filters--disabled');
    const fieldsetMap = formMap.getElementsByTagName('fieldset');
    for( let i = 0; i < fieldsetMap.length; i++ ){
      fieldsetMap[i].disabled=false;
    }
    return activeMap;
  }
};

getInactiveNotice();
getInactiveMap();
getActiveNotice();
getActiveMap();
