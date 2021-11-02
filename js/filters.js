import {preparedCards, markerGroup, createMarker} from './map-form.js' ;

const mapFilters = document.querySelector('.map__filters');
const mapFiltersType = mapFilters.querySelector('#housing-type');
const mapFiltersPrice = mapFilters.querySelector('#housing-price');
const mapFiltersRooms = mapFilters.querySelector('#housing-rooms');
const mapFiltersGuests = mapFilters.querySelector('#housing-guests');
// const mapFiltersFeatures = mapFilters.querySelector('#housing-features');
// const mapFiltersWifi = mapFiltersFeatures.querySelector('#filter-wifi');

const chosenFilters = {
  type: null,
  price: null,
  rooms: null,
  guests: null,
  features: null,
  // wifi: null,
  // dishwasher: null,
  // washer: null,
  // parking: null,
  // elevator: null,
  // conditioner: null,
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
  // if (chosenFilters.features==='wifi') {
  //   prev = prev.filter((elem) => elem.offer.features.indexOf('wifi') !== -1);
  // }
  return prev;
};

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

// mapFiltersWifi.addEventListener('change', ( ) => {
//   markerGroup.clearLayers();
//   setChosenFilter('features', 'wifi');
//   const filteredCards = getFilteredCards();
//   filteredCards.slice(0, 10).forEach((card) => {
//     createMarker(card);
//   });
// });

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
