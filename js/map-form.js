import {createCard} from'./marking.js';
import {getData} from './api.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersType = mapFilters.querySelector('#housing-type');
// const mapFiltersTypeInput = mapFiltersType.createElement('div');
// const mapFiltersPrice = mapFilters.querySelector('#housing-price');
const mapFiltersRooms = mapFilters.querySelector('#housing-rooms');
// const mapFiltersGuests = mapFilters.querySelector('#housing-guests');
// const mapFiltersFeatures = mapFilters.querySelector('#housing-features');

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

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) => {
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

getData((cards) => {
  cards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

const createTypeFilters = (cards) => {
  const VAL_TYPE = mapFiltersType.value;
  // const VAL_PRICE = mapFiltersPrice.value;
  // const VAL_GUESTS = mapFiltersGuests.value;
  // const VAL_FEATURES = mapFiltersFeatures.value;
  // let FILTERS_ARRAY = cards.slice()
  const FILTERS_ARRAY = [];
  let newi=0;
  for(let i = 0; i < cards.length ; i++) {
    if(cards[i].offer.type === VAL_TYPE ) {
      FILTERS_ARRAY[newi] = cards[i];
      newi++;
    }
    if(VAL_TYPE==='any') {
      FILTERS_ARRAY[newi] = cards[i];
      newi++;
    }
  }
  return FILTERS_ARRAY;
};

const createRoomsFilters = (cards) => {
  // const VAL_PRICE = mapFiltersPrice.value;
  const VAL_ROOMS = mapFiltersRooms.value;
  // const VAL_GUESTS = mapFiltersGuests.value;
  // const VAL_FEATURES = mapFiltersFeatures.value;
  // let FILTERS_ARRAY = cards.slice()
  const FILTERS_ARRAY = [];
  let newi=0;
  for(let i = 0; i < cards.length ; i++) {
    if(cards[i].offer.rooms === Number(VAL_ROOMS)) {
      FILTERS_ARRAY[newi] = cards[i];
      newi++;
    }
    if(VAL_ROOMS==='any') {
      FILTERS_ARRAY[newi] = cards[i];
      newi++;
    }
  }
  return FILTERS_ARRAY;
};

mapFiltersRooms.addEventListener('click', () => {
  markerGroup.clearLayers();
  getData((cards) => {
    const FILTERS_ARRAY =createRoomsFilters(cards);
    FILTERS_ARRAY.slice(0, 10).forEach((card) => {
      createMarker(card);
    });
  });
});

mapFiltersType.addEventListener('click', () => {
  markerGroup.clearLayers();
  getData((cards) => {
    const FILTERS_ARRAY =createTypeFilters(cards);
    FILTERS_ARRAY.slice(0, 10).forEach((card) => {
      createMarker(card);
    });
  });
});

// mapFilters.addEventListener('click', () => {
//   markerGroup.clearLayers();
//   getData((cards) => {
//     const FILTERS_ARRAY =createRoomsFilters(cards);
//     const FILTERS_ARRAY1 =createTypeFilters(cards);
//     const FILTERS_ARRAY3 = [];
//     let newi=0;
//     for (let i=0; i < FILTERS_ARRAY ; i++) {
//       for (let j=0; i < FILTERS_ARRAY1 ; j++) {
//         if (FILTERS_ARRAY[i] === FILTERS_ARRAY1[j]) {
//           FILTERS_ARRAY3[newi] = FILTERS_ARRAY[i];
//           newi++;
//         }
//       }
//     }
//     FILTERS_ARRAY3.slice(0, 10).forEach((card) => {
//       createMarker(card);
//     });
//   });
// });
