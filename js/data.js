import {getPositiveInt, getPositiveFloatRange} from './util.js';
import {LENGHT_ADS_ARRAY, USER_PICTURE_EXT, USER_PICTURE_PATH, TYPES, TIMES, FEATURES, PHOTOS} from './mock.js';

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

const createAuthor = (i) => ({
  avatar: USER_PICTURE_PATH + i + USER_PICTURE_EXT ,
});

const createAd = (i) => {
  const RANDOM_LAT = getPositiveFloatRange(35.65, 35.7, 5);
  const RANDOM_LNG = getPositiveFloatRange(139.7, 139.8, 5);
  return{
    author: createAuthor(i),
    offer: {
      title: 'Сдаётся',
      address: `${RANDOM_LAT},${RANDOM_LNG}`,
      price: getPositiveInt(1,1000),
      type: TYPES[getPositiveInt(0,4)],
      rooms: getPositiveInt(1,10),
      guests: getPositiveInt(1,10),
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

const createAds = () => {
  const ADS_ARRAY = [];
  for(let index = 0; index < LENGHT_ADS_ARRAY-1; index++) {
    ADS_ARRAY[index] = createAd(`0${index+1}`);
  }
  ADS_ARRAY[LENGHT_ADS_ARRAY-1] = createAd(String(LENGHT_ADS_ARRAY));
  return ADS_ARRAY;
};

export const ADS = createAds();
ADS;
