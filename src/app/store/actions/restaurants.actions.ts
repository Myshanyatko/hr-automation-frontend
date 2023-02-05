import { Restaurant } from './../../models/restaurant';
import { createAction, props } from '@ngrx/store';


export const getRestaurants = createAction(
  '[Restaurants Page] Get Restaurants'
);
export const setRestaurants = createAction(
  '[Restaurants Page] Set Restaurants',
  props<{ restaurants: Restaurant[] }>()
);
