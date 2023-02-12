import { RestStatus } from './../../models/restStatus';
import { City } from './../../models/city';
import { Restaurant } from './../../models/restaurant';
import { createAction, props } from '@ngrx/store';

export const getRestaurants = createAction(
  '[Restaurants Page] Get Restaurants',
  props<{ cityId: number }>()
);
export const setRestaurants = createAction(
  '[Restaurants Page] Set Restaurants',
  props<{ restaurants: Restaurant[] }>()
);
export const getCities = createAction('[Restaurants Page] Get Cities');
export const setCities = createAction(
  '[Restaurants Page] Set Cities',
  props<{ cities: City[] }>()
);
export const getStatuses = createAction('[Restaurants Page] Get Statuses');
export const setStatuses = createAction(
  '[Restaurants Page] Set Statuses',
  props<{ statuses: RestStatus[] }>()
);
export const createRestaurant = createAction(
  '[Restaurants Page] Create Restaurant',
  props<{ restaurant: Restaurant; processId: number }>()
);
export const createRestaurantSuccess = createAction(
  '[Restaurants Page] Create Restaurant Success',
  props<{ restaurant: Restaurant; processId: number }>()
);
export const setCurrentCity = createAction(
  '[Restaurants Page] Set Current City',
  props<{ city: City}>()
);