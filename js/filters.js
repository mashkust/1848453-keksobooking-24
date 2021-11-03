import {preparedCards, markerGroup, createMarker} from './map-form.js' ;

const mapFilters = document.querySelector('.map__filters');
const mapFiltersType = mapFilters.querySelector('#housing-type');
const mapFiltersPrice = mapFilters.querySelector('#housing-price');
const mapFiltersRooms = mapFilters.querySelector('#housing-rooms');
const mapFiltersGuests = mapFilters.querySelector('#housing-guests');
const mapFiltersFeatures = mapFilters.querySelector('#housing-features');
const mapFiltersWifi = mapFiltersFeatures.querySelector('#filter-wifi');
const mapFiltersDishwasher = mapFiltersFeatures.querySelector('#filter-dishwasher');
const mapFiltersWasher = mapFiltersFeatures.querySelector('#filter-washer');
const mapFiltersParking = mapFiltersFeatures.querySelector('#filter-parking');
const mapFiltersElevator = mapFiltersFeatures.querySelector('#filter-elevator');
const mapFiltersConditioner = mapFiltersFeatures.querySelector('#filter-conditioner');

const chosenFilters = {
  type: null,
  price: null,
  rooms: null,
  guests: null,
  wifi: null,
  dishwasher: null,
  washer: null,
  parking: null,
  elevator: null,
  conditioner: null,
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
  const setChosenFeatures = (feature, strfeature) => {
    if (feature) {
      prev = prev.filter((elem) => {
        if (elem.offer.features) {
          return elem.offer.features.includes(strfeature);
        }
        return false;
      });
    }
  };
  setChosenFeatures(chosenFilters.wifi, 'wifi');
  setChosenFeatures(chosenFilters.dishwasher, 'dishwasher');
  setChosenFeatures(chosenFilters.washer, 'washer');
  setChosenFeatures(chosenFilters.parking, 'parking');
  setChosenFeatures(chosenFilters.elevator, 'elevator');
  setChosenFeatures(chosenFilters.conditioner, 'conditioner');
  return prev;
};

const changeFilter = (mapFiltersParameter, parameter) => {
  mapFiltersParameter.addEventListener('change', (evt) => {
    markerGroup.clearLayers();
    if (evt.currentTarget.value !== 'any') {
      setChosenFilter( parameter, evt.currentTarget.value);
    } else {
      setChosenFilter(parameter, null);
    }
    const filteredCards = getFilteredCards();
    filteredCards.slice(0, 10).forEach((card) => {
      createMarker(card);
    });
  });
};

mapFiltersWifi.addEventListener('change', () => {
  markerGroup.clearLayers();
  if ( chosenFilters.wifi ) {
    setChosenFilter('wifi', null);
  } else  {
    setChosenFilter('wifi', true);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

mapFiltersDishwasher.addEventListener('change', () => {
  markerGroup.clearLayers();
  if (chosenFilters.dishwasher) {
    setChosenFilter('dishwasher', null);
  } else  {
    setChosenFilter('dishwasher', true);
  }
  const filteredCards = getFilteredCards();

  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

mapFiltersWasher.addEventListener('change', () => {
  markerGroup.clearLayers();
  if (chosenFilters.washer) {
    setChosenFilter('washer', null);
  } else  {
    setChosenFilter('washer', true);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

mapFiltersParking.addEventListener('change', () => {
  markerGroup.clearLayers();
  if (chosenFilters.parking) {
    setChosenFilter('parking', null);
  } else  {
    setChosenFilter('parking', true);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

mapFiltersElevator.addEventListener('change', () => {
  markerGroup.clearLayers();
  if (chosenFilters.elevator) {
    setChosenFilter('elevator', null);
  } else  {
    setChosenFilter('elevator', true);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

mapFiltersConditioner.addEventListener('change', () => {
  markerGroup.clearLayers();
  if (chosenFilters.conditioner) {
    setChosenFilter('conditioner', null);
  } else  {
    setChosenFilter('conditioner', true);
  }
  const filteredCards = getFilteredCards();
  filteredCards.slice(0, 10).forEach((card) => {
    createMarker(card);
  });
});

changeFilter(mapFiltersRooms, 'rooms');
changeFilter(mapFiltersType, 'type');
changeFilter(mapFiltersPrice, 'price');
changeFilter(mapFiltersGuests, 'guests');
