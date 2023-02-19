import { shortRest } from './../../models/shortRest';
import { Build } from './../../models/build';
import { RestStatus } from './../../models/restStatus';
import { City } from './../../models/city';
import { Restaurant } from './../../models/restaurant';

export interface RestaurantsState {
  builds: Build[] | null;
  filtredRestaurants: shortRest[] | null;
  cities: City[] | null;
  currentCity: City;
  currentRest: Restaurant | null;
  statuses: RestStatus[]
}

export const initialRestaurantsState: RestaurantsState = {
  builds: null,
  cities: null,
  filtredRestaurants: null,
  currentCity: { id: 1, lat: 56.4894541, lng: 84.8685493, name: 'Томск' },
  statuses: [],
  currentRest: null
};
