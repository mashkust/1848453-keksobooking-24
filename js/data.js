import {getPositiveInt, getPositiveFloatRange} from './util';
import {LENGHT_ADS_ARRAY, TYPES, TIMES, FEATURES, PHOTOS} from './mock';

const getArray = (some, min, max) => {
  const MAX_LENGHT = some.length;
  const LENGHT_ARRAY = getPositiveInt(1, MAX_LENGHT);
  const ARRAY = [];
  for(let index = 0; index < LENGHT_ARRAY; index++) {
    const INDEX_EL = getPositiveInt(min, max);
    const ELEM = some[INDEX_EL];
    if (some === FEATURES && !ARRAY.includes(ELEM)) {
      ARRAY.push(ELEM);
    }
    if(some === PHOTOS) {
      ARRAY.push(ELEM);
    }
  }
  return ARRAY;
};

const createAuthor = (xx) => ({
  avatar:`img/avatars/user${xx}.png`,
});

const createAd = (xx) => {
  const RANDOM_LAT = getPositiveFloatRange(35.65, 35.7, 5);
  const RANDOM_LNG = getPositiveFloatRange(139.7, 139.8, 5);
  return{
    author: createAuthor(xx),
    offer: {
      title: 'Сдаётся',
      address: `${RANDOM_LAT},${RANDOM_LNG}`,
      price: getPositiveInt(0,1000),
      type: TYPES[getPositiveInt(0,4)],
      rooms: getPositiveInt(0,10),
      guests: getPositiveInt(0,10),
      checkin: TIMES[getPositiveInt(0,2)],
      checkout: TIMES[getPositiveInt(0,2)],
      features: getArray(FEATURES, 0, 5),
      description: 'Квартира',
      photos: getArray(PHOTOS, 0, 2),
    },
    location: {
      lat: RANDOM_LAT,
      lng: RANDOM_LNG,
    },
  };
};

export const createAds = () => {
  const ADS_ARRAY = [];
  for(let index = 0; index < LENGHT_ADS_ARRAY-1; index++) {
    ADS_ARRAY[index] = createAd(`0${index+1}`);
  }
  ADS_ARRAY[LENGHT_ADS_ARRAY-1] = createAd(LENGHT_ADS_ARRAY);
  return ADS_ARRAY;
};

