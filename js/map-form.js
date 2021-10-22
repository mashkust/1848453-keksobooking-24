import {ADS} from'./data.js';
import {createCard} from'./marking.js';

/*const getInactive = (someClass, disabledClass) => {
  const formSome = document.querySelector(someClass);
  const inactiveSome = formSome.classList.add(disabledClass);
  const fieldsetSome = formSome.getElementsByTagName('fieldset');
  for( let i = 0; i < fieldsetSome.length; i++ ){
    fieldsetSome[i].disabled=true;
  }
  return inactiveSome;
};*/

const getActive = (someClass, disabledClass) => {
  if (document.querySelector(someClass).classList.contains(disabledClass)){
    const formSome = document.querySelector(someClass);
    const activeSome = formSome.classList.remove(disabledClass);
    const fieldsetSome = formSome.getElementsByTagName('fieldset');
    for( let i = 0; i < fieldsetSome.length; i++ ){
      fieldsetSome[i].disabled=false;
    }
    return activeSome;
  }
};

const map = L.map('map-canvas')
  .on('load', () => {
    getActive('.ad-form', 'ad-form--disabled');
    getActive('.map__filters', 'map__filters--disabled');
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  document.querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(5)},${evt.target.getLatLng().lng.toFixed(5)}`;
});

// fetch('https://24.javascript.pages.academy/keksobooking/data')
//   .then((response) => {
//     if (response.ok) {
//       return response;
//     }

//     throw new Error(`${response.status} — ${response.statusText}`);
//   })
//   .then((response) => response.json())
//   .then((posts) => console.log(posts))
//   .catch((error) => console.log(error));

// const offerObject = ADS[2];
// const userCard = createCard(offerObject);

const createMarker = (point) => {
  const {lat, lng} = point;

  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createCard(point));
};

ADS.forEach((point) => {
  createMarker(point);
});
