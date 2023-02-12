import { Restaurant } from './../../models/restaurant';
import { createAction, props } from '@ngrx/store';


export const getRestaurants = createAction(
  '[Restaurants Page] Get Restaurants'
);
export const setRestaurants = createAction(
  '[Restaurants Page] Set Restaurants',
  props<{ restaurants: Restaurant[] }>()
);
export const createRestaurant = createAction(
  '[Restaurants Page] Create Restaurant',
  props<{ restaurant: Restaurant , processId: number}>()
);
export const createRestaurantSuccess = createAction(
  '[Restaurants Page] Create Restaurant Success',
  props<{ restaurant: Restaurant , processId: number}>()
);
