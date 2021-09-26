function getRandomInt (min,max) {
  min=Math.ceil(min);
  max=Math.floor(max);
  return Math.floor(Math.random()* (max - min) + min);
}

function getPositiveInt (min,max) {
  if (typeof min==='number' && typeof max==='number' &&  min>=0 && max>=0) {
    if (min>max) {
      const NUM=min;
      min=max;
      max=NUM;
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
  if (typeof min==='number' && typeof max==='number' && typeof decimal==='number' && min>=0 && max>=0 && decimal>=0 && Number.isInteger(decimal)) {
    if (min>max) {
      const NUM=min;
      min=max;
      max=NUM;
      return getRandomFract (min, max, decimal);
    } else if (min<max || min===max ) {
      return getRandomFract (min, max, decimal);
    }
  } else {
    return null;
  }
}
getPositiveFract(2.5,10.8,3);

