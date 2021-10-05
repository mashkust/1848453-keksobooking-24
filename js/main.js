const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()* (max - min +1 )) + min;
};

const getPositiveInt = (min, max) => {
  if (typeof Number(min) === 'number' && typeof Number(max) === 'number') {
    min = Number(min);
    max = Number(max);
  }
  if (typeof min === 'number' && typeof max === 'number' &&  min >= 0 && max >= 0) {
    if (min > max) {
      const NUM1 = min;
      min = max;
      max = NUM1;
      return getRandomInt(min, max);
    } else if (min < max || (min === max && Number.isInteger(min)) ) {
      return getRandomInt (min, max);
    } return null;
  } return null;
};

const getRandomFloatRange = (min, max, decimal) => {
  decimal = 10 ** decimal;
  return Math.floor((Math.random() * (max - min) + min) * decimal) / decimal;
};

const getPositiveFloatRange = (min, max, decimal) => {
  if (typeof Number(min) === 'number' && typeof Number(max) === 'number' && typeof Number(decimal) === 'number') {
    min=Number(min);
    max=Number(max);
    decimal=Number(decimal);
  }
  if (typeof min === 'number' && typeof max === 'number' && min >= 0 && max >= 0 && decimal >= 0 && Number.isInteger(decimal)) {
    if (min > max) {
      const NUM2 = min;
      min = max;
      max = NUM2;
      return getRandomFloatRange (min, max, decimal);
    } else if (min < max || min === max ) {
      return getRandomFloatRange (min, max, decimal);
    }
  } return null;
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LENGHT_ADS_ARRAY = 10 ;

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

const createAds = () => {
  const ADS_ARRAY = [];
  for(let index = 0; index < LENGHT_ADS_ARRAY-1; index++) {
    ADS_ARRAY[index] = createAd(`0${index+1}`);
  }
  ADS_ARRAY[LENGHT_ADS_ARRAY-1] = createAd(LENGHT_ADS_ARRAY);
  return ADS_ARRAY;
};

const ADS = createAds();
ADS;


