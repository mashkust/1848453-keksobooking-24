import {createCard} from'./marking.js';
import {getData} from './api.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersType = mapFilters.querySelector('#housing-type');
const mapFiltersPrice = mapFilters.querySelector('#housing-price');
const mapFiltersRooms = mapFilters.querySelector('#housing-rooms');
const mapFiltersGuests = mapFilters.querySelector('#housing-guests');

let preparedCards = null;

const chosenFilters = {
  type: null,
  price: null,
  rooms: null,
  guests: null,
};

const setChosenFilter = ( key, value ) => chosenFilters[key] = value;

const getFilteredCards = () => {
  let prev = preparedCards.slice(0);
  if (chosenFilters.type) {
    prev = prev.filter((elem) => elem.offer.type === chosenFilters.type);
  }
  if (chosenFilters.rooms) {
    prev = prev.filter((elem) => elem.offer.rooms === Number(chosenFilters.rooms));
  }
  if (chosenFilters.guests) {
    prev = prev.filter((elem) => elem.offer.guests === Number(chosenFilters.guests));
  }
  if (chosenFilters.price==='low') {
    prev = prev.filter((elem) => elem.offer.price < 10000);
  }
  if (chosenFilters.price==='high') {
    prev = prev.filter((elem) => elem.offer.price > 50000);
  }
  if (chosenFilters.price==='middle') {
    prev = prev.filter((elem) => elem.offer.price < 50000 && elem.offer.price >10000);
  }
  return prev;
};
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
  const ads = cards;
  cards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
  preparedCards =  ads;
});

// const createFeaturesFilters = (cards) => {
//   // const VAL_FEATURES = mapFiltersFeatures.querySelector('#filter-wifi').value;
//   const FILTERS_ARRAY = [];
//   let newi=0;
//   for(let i = 0; i < cards.length ; i++) {
//     for(let j = 0; j < cards[i].offer.features.length ; j++) {
//       if(cards[i].offer.features[j] === 'wi-fi') {
//         FILTERS_ARRAY[newi] = cards[i];
//         newi++;
//       }
//     }
//   }
//   return FILTERS_ARRAY;
// };

// mapFiltersFeatures.querySelector('#filter-wifi').addEventListener('change', () => {
//   markerGroup.clearLayers();
//   getData((cards) => {
//     const FILTERS_ARRAY = createFeaturesFilters(cards);
//     FILTERS_ARRAY.slice(0, 10).forEach((card) => {
//       createMarker(card);
//     });
//   });
// });

mapFiltersRooms.addEventListener('change', (evt) => {
  markerGroup.clearLayers();
  if (evt.currentTarget.value !== 'any') {
    setChosenFilter( 'rooms', evt.currentTarget.value);
  } else {
    setChosenFilter('rooms', null);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

mapFiltersType.addEventListener('change', (evt) => {
  markerGroup.clearLayers();
  if (evt.currentTarget.value !== 'any') {
    setChosenFilter( 'type', evt.currentTarget.value);
  }  else {
    setChosenFilter('type', null);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

mapFiltersPrice.addEventListener('change', (evt) => {
  markerGroup.clearLayers();
  if (evt.currentTarget.value !== 'any') {
    setChosenFilter( 'price', evt.currentTarget.value);
  }  else {
    setChosenFilter('price', null);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

// mapFiltersPrice.addEventListener('change', (evt) => {
//   markerGroup.clearLayers();
//   if (evt.currentTarget.value !== 'any') {
//     setChosenFilter( 'price', evt.currentTarget.value);
//   } else {
//     setChosenFilter( 'price', null);
//   }
//   const filteredCards = getFilteredCards();
//   filteredCards.slice(0, 10).forEach((card) => {
//     createMarker(card);
//   });
//   // getData((cards) => {
//   //   const filters = createPriceFilters(cards);
//   //   filters.slice(0, 10).forEach((card) => {
//   //     createMarker(card);
//   //   });
//   // });
// });

mapFiltersGuests.addEventListener('change', (evt) => {
  markerGroup.clearLayers();
  if (evt.currentTarget.value !== 'any') {
    setChosenFilter( 'guests', evt.currentTarget.value);
  } else {
    setChosenFilter('guests', null);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});
