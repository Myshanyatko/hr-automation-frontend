import { setCurrentCity, setStatuses } from './../actions/restaurants.actions';
import { initialRestaurantsState } from './../state/restaurants.state';
import { createReducer, on } from '@ngrx/store';
import { createRestaurant, setCities, setRestaurants } from '../actions/restaurants.actions';

export const restaurantsReducer = createReducer(
  initialRestaurantsState,
  on(setRestaurants, (state, { restaurants }) => {
    return { ...state, restaurants: restaurants };
  }),
  on(setStatuses, (state, { statuses }) => {
    return { ...state, statuses: statuses };
  }),
  on(setCurrentCity, (state, { city }) => {
    return { ...state, currentCity: city };
  }),
  on(createRestaurant, (state, { restaurant }) => {
    return { ...state};
  }),
  on(setCities, (state, { cities }) => {
    return { ...state, cities: cities};
  })
);
