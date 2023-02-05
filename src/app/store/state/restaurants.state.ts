import { Restaurant } from './../../models/restaurant';

export interface RestaurantsState {
  restaurants: Restaurant[] | null;
}

export const initialRestaurantsState: RestaurantsState = {
  restaurants: null,
};
