import { Restaurant } from './../../models/restaurant';
import { filter } from 'rxjs/operators';
import {
  deleteCitySuccess,
  deleteReviewSuccess,
  setCurrentCity,
  setFiltredRestaurants,
  setRestaurant,
  setStatuses,
} from './../actions/restaurants.actions';
import { initialRestaurantsState } from './../state/restaurants.state';
import { createReducer, on } from '@ngrx/store';
import {
  createRestaurant,
  setCities,
  setRestaurants,
} from '../actions/restaurants.actions';

export const restaurantsReducer = createReducer(
  initialRestaurantsState,
  on(setRestaurants, (state, { builds }) => {
    return { ...state, builds: builds };
  }),
  on(setFiltredRestaurants, (state, { restaurants }) => {
    return { ...state, filtredRestaurants: restaurants };
  }),
  on(setRestaurant, (state, { restaurant }) => {
    return { ...state, currentRest: restaurant };
  }),
  on(setStatuses, (state, { statuses }) => {
    return { ...state, statuses: statuses };
  }),
  on(setCurrentCity, (state, { city }) => {
    return { ...state, currentCity: city };
  }),
  on(createRestaurant, (state, { restaurant }) => {
    return { ...state };
  }),
  on(setCities, (state, { cities }) => {
    return { ...state, cities: cities };
  }),
  on(deleteCitySuccess, (state, { id }) => {
    if (state.cities == null) return state;
    return {
      ...state,
      cities: [...state.cities.filter((city) => city.id != id)],
    };
  }),
  on(deleteReviewSuccess, (state, { id }) => {
    if (state.currentRest == null) return state;
    return {
      ...state,
      currentRest: {
        ...state.currentRest,
        reviews: [
          ...state.currentRest.reviews.filter((review) => review.id != id),
        ],
      },
    };
  })
);
