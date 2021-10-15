const mapTemplate = document.querySelector('#card').content;
const OffersTypes = {flat: 'Квартира', house: 'Дом', palace: 'Дворец', bungalo: 'Бунгало'};

const getPhoto = (photo) => {
  let scrPhoto;
  for (let i = 0; i < photo.length; i++) {
    scrPhoto = `${photo[i]}`;
    return scrPhoto;
  }
};

export const createCard = (offerObject) => {
  const userCard  = mapTemplate.querySelector('.popup').cloneNode(true);
  userCard.querySelector('.popup__title').textContent = offerObject.offer.title;
  userCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  userCard.querySelector('.popup__text--price').textContent = `${offerObject.offer.price  } р/ночь`;
  userCard.querySelector('.popup__type').textContent = OffersTypes[offerObject.offer.type];
  userCard.querySelector('.popup__text--capacity').textContent = `${offerObject.offer.rooms  } комнаты для ${  offerObject.offer.guests  } гостей`;
  userCard.querySelector('.popup__text--time').textContent = `Заезд после ${offerObject.offer.checkin}, выезд до ${  offerObject.offer.checkout}`;
  userCard.querySelector('.popup__features').textContent = offerObject.offer.features;
  userCard.querySelector('.popup__description').textContent = offerObject.offer.description;
  userCard.querySelector('.popup__photos img').src = getPhoto(offerObject.offer.photos); // отображается только одна фотография
  userCard.querySelector('.popup__avatar').src = offerObject.author.avatar;
  /*for (let i=0; i < userCard.childNodes.length; i++ ) {
    if (!Object.keys(userCard.childNodes[i]).length) {
      userCard.childNodes[i].classList.add('hidden');
    }
  }*/ //как скрыть пустые элементы
  return userCard;
};
