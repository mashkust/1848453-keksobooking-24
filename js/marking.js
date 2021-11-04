const mapTemplate = document.querySelector('#card').content;

const getPhoto = (popupElement, photos) => {
  const popupPhotos = popupElement.querySelector('.popup__photos');
  if (typeof photos === 'undefined' || photos.length === 0) {
    popupPhotos.style.display = 'none';
    return;
  }
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const popupPhotoClone = popupPhoto.cloneNode(true);
  popupPhoto.remove();
  photos.forEach((photoSrc) => {
    const photo = popupPhotoClone.cloneNode(true);
    photo.src = photoSrc;
    popupPhotos.appendChild(photo);
  });
};

const translatePopupType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const makePopupFeatures = (popupElement, features) => {
  const popupFeatures = popupElement.querySelector('.popup__features');
  if (typeof features === 'undefined' || features.length === 0) {
    popupFeatures.style.display = 'none';
    return;
  }
  const popupFeaturesList = popupFeatures.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  popupFeaturesList.forEach((popupFeaturesItem) => {
    const modifier = popupFeaturesItem.classList[1];
    if (!modifiers.includes(modifier)) {
      popupFeaturesItem.remove();
    }
  });
};

export const createCard = (offerObject) => {
  const userCard  = mapTemplate.querySelector('.popup').cloneNode(true);
  const makeNone = (userClass,property) => {
    if ( typeof  property === 'undefined' || property.length === 0) {
      userCard.querySelector(userClass).style.display = 'none';
    }
  };
  makeNone('.popup__title', offerObject.offer.title);
  makeNone('.popup__text--price', offerObject.offer.price);
  makeNone('.popup__avatar', offerObject.author.avatar);
  makeNone('.popup__description', offerObject.offer.description);
  userCard.querySelector('.popup__title').textContent = offerObject.offer.title;
  userCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  userCard.querySelector('.popup__text--price').textContent = `${offerObject.offer.price  } р/ночь`;
  userCard.querySelector('.popup__type').textContent = translatePopupType(offerObject.offer.type);
  userCard.querySelector('.popup__text--capacity').textContent = `${offerObject.offer.rooms  } комнаты для ${  offerObject.offer.guests  } гостей`;
  userCard.querySelector('.popup__text--time').textContent = `Заезд после ${offerObject.offer.checkin}, выезд до ${  offerObject.offer.checkout}`;
  userCard.querySelector('.popup__features').src = makePopupFeatures(userCard, offerObject.offer.features);
  userCard.querySelector('.popup__description').textContent = offerObject.offer.description;
  userCard.querySelector('.popup__photos').src = getPhoto(userCard, offerObject.offer.photos);
  userCard.querySelector('.popup__avatar').src = offerObject.author.avatar;
  return userCard;
};

