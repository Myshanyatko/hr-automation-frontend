import { Build } from './../../models/build';
import { RestStatus } from './../../models/restStatus';
import { City } from './../../models/city';
import { Restaurant } from './../../models/restaurant';
import { createAction, props } from '@ngrx/store';

export interface shortRest {
  name: string;
  address: string;
  statusId: number;
  cityId: number;
}
export const getRestaurants = createAction(
  '[Restaurants Page] Get Restaurants',
  props<{ cityId: number }>()
);
export const setRestaurants = createAction(
  '[Restaurants Page] Set Restaurants',
  props<{ builds: Build[] }>()
);
export const getRestaurant = createAction(
  '[Restaurants Page] Get Restaurant',
  props<{ id: number }>()
);
export const setRestaurant = createAction(
  '[Restaurants Page] Set Restaurant',
  props<{ restaurant: Restaurant }>()
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
  props<{ restaurant: shortRest; processId: number }>()
);
export const createRestaurantSuccess = createAction(
  '[Restaurants Page] Create Restaurant Success',
  props<{ restaurant: shortRest; processId: number }>()
);
export const createCity = createAction(
  '[Restaurants Page] Create City',
  props<{ city: City; processId: number }>()
);
export const createCitySuccess = createAction(
  '[Restaurants Page] Create City Success',
  props<{ city: City; processId: number }>()
);
export const setCurrentCity = createAction(
  '[Restaurants Page] Set Current City',
  props<{ city: City }>()
);
export const deleteCity = createAction(
  '[Restaurants Page] Delete City',
  props<{ id: number }>()
);
export const deleteCitySuccess = createAction(
  '[Restaurants Page] Delete City Success',
  props<{ id: number }>()
);
