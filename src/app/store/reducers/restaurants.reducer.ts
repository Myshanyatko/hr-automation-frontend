import { initialRestaurantsState } from './../state/restaurants.state';
import { createReducer, on } from '@ngrx/store';
import { setRestaurants } from '../actions/restaurants.actions';

export const restaurantsReducer = createReducer(
  initialRestaurantsState,
  on(setRestaurants, (state, { restaurants }) => {
    return { ...state, restaurants: restaurants };
  })
);
