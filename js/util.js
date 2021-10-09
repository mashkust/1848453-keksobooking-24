export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()* (max - min +1 )) + min;
};

export const getPositiveInt = (min, max) => {
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

export const getRandomFloatRange = (min, max, decimal) => {
  decimal = 10 ** decimal;
  return Math.floor((Math.random() * (max - min) + min) * decimal) / decimal;
};

export const getPositiveFloatRange = (min, max, decimal) => {
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
