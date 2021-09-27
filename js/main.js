function getRandomInt (min,max) {
  min=Math.ceil(min);
  max=Math.floor(max);
  return Math.floor(Math.random()* (max - min +1)) + min;
}

function getPositiveInt (min,max) {
  if (typeof Number(min)==='number' && typeof Number(max)==='number') {
    min=Number(min);
    max=Number(max);
  }
  if (typeof min==='number' && typeof max==='number' &&  min>=0 && max>=0) {
    if (min>max) {
      const NUM1=min;
      min=max;
      max=NUM1;
      return getRandomInt(min,max);
    } else if (min<max || (min===max && Number.isInteger(min)) ) {
      return getRandomInt (min,max);
    } else {
      return null;
    }
  } else {
    return null;
  }
}
getPositiveInt(5,10);

function getRandomFract (min, max, decimal) {
  decimal= 10 ** decimal;
  return Math.floor((Math.random() * (max - min) + min) * decimal) / decimal;
}

function getPositiveFract (min,max, decimal) {
  if (typeof Number(min)==='number' && typeof Number(max)==='number' && typeof Number(decimal)==='number') {
    min=Number(min);
    max=Number(max);
    decimal=Number(decimal);
  }
  if (typeof min==='number' && typeof max==='number' && min>=0 && max>=0 && decimal>=0 && Number.isInteger(decimal)) {
    if (min>max) {
      const NUM2=min;
      min=max;
      max=NUM2;
      return getRandomFract (min, max, decimal);
    } else if (min<max || min===max ) {
      return getRandomFract (min, max, decimal);
    }
  } else {
    return null;
  }
}
getPositiveFract(2.5,10.8,3);

