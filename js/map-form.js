import {createCard} from'./marking.js';
import {getData} from './api.js';

export const controlObj = {
  preparedCards: null,
};

const RERENDER_DELAY = 500;
const START_X = 35.68950;
const START_Y = 139.69200;

export const startCoordinate =  {
  lat: START_X,
  lng: START_Y,
};

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
    lat: START_X,
    lng: START_Y,
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

export const mainPinMarker = L.marker(
  startCoordinate,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  document.querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(5)},${evt.target.getLatLng().lng.toFixed(5)}`;
});

export const markerGroup = L.layerGroup().addTo(map);

export const createMarker = (card) => {
  const {lat, lng} = card.location;

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
    .addTo(markerGroup)
    .bindPopup(createCard(card));
};

getData(_.debounce(
  (cards) => {
    const ads = cards;
    cards.slice(0, 10).forEach((card) => {
      createMarker(card);
    });
    controlObj.preparedCards = ads;
  },
  RERENDER_DELAY,
));
