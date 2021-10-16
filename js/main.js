import {ADS} from'./data.js';
import {createCard} from './marking.js';
import './form.js';

const offerObject = ADS[2];
const userCard = createCard(offerObject);
document.querySelector('#map-canvas').appendChild(userCard) ;
