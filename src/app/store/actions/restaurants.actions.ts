import { Review } from './../../models/review';
import { EditedRest } from './../../models/editedRest';

import { Build } from './../../models/build';
import { RestStatus } from './../../models/restStatus';
import { City } from './../../models/city';
import { Restaurant } from './../../models/restaurant';
import { createAction, props } from '@ngrx/store';
import { shortRest } from 'src/app/models/shortRest';

export interface createRest {
  name: string;
  address: string;
  statusId: number;
  cityId: number;
}
export interface createRestViaCoords {
  name: string;
  lat: number;
  lng: number;
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
export const getReviews = createAction(
  '[Restaurant Page] Get Reviews',
  props<{ id: number }>()
);
export const setReviews = createAction(
  '[Restaurant Page] Set Reviews',
  props<{ reviews: Review[] }>()
);
export const getFiltredRestaurants = createAction(
  '[Restaurants Page] Get Filtred Restaurants',
  props<{ filter: string }>()
);
export const setFiltredRestaurants = createAction(
  '[Restaurants Page] Set Filtred Restaurants',
  props<{ restaurants: shortRest[] }>()
);
export const getRestaurant = createAction(
  '[Restaurants Page] Get Restaurant',
  props<{ id: number }>()
);
export const setRestaurant = createAction(
  '[Restaurants Page] Set Restaurant',
  props<{ restaurant: Restaurant }>()
);
export const getEditedRestaurant = createAction(
  '[Restaurants Page] Get Edited Restaurant',
  props<{ id: number }>()
);
export const setEditedRestaurant = createAction(
  '[Restaurants Page] Set Edited Restaurant',
  props<{ restaurant: createRest }>()
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
  props<{ restaurant: createRest; processId: number }>()
);
export const createRestaurantViaCoords = createAction(
  '[Restaurants Page] Create Restaurant',
  props<{ restaurant: createRestViaCoords; processId: number }>()
);
export const createRestaurantSuccess = createAction(
  '[Restaurants Page] Create Restaurant Success',
  props<{ processId: number }>()
);
export const createCity = createAction(
  '[Restaurants Page] Create City',
  props<{ city: string; processId: number }>()
);
export const createCitySuccess = createAction(
  '[Restaurants Page] Create City Success',
  props<{ city: string; processId: number }>()
);
export const updateRestaurant = createAction(
  '[Edit Restaurant Page] Update Restaurant',
  props<{ restaurant: EditedRest; processId: number }>()
);
export const updateRestaurantSuccess = createAction(
  '[Edit Restaurant Page] Update Restaurant Success',
  props<{ restaurant: EditedRest; processId: number }>()
);
export const setCurrentCity = createAction(
  '[Restaurants Page] Set Current City',
  props<{ city: City }>()
);
export const deleteCity = createAction(
  '[Restaurants Page] Delete City',
  props<{ id: number }>()
);
export const deleteRestaurant = createAction(
  '[Restaurants Page] Delete Restaurant',
  props<{ id: number; processId: number }>()
);
export const deleteCitySuccess = createAction(
  '[Restaurants Page] Delete City Success',
  props<{ id: number }>()
);
export const deleteRestaurantSuccess = createAction(
  '[Restaurants Page] Delete City Restaurant',
  props<{ id: number ; processId: number}>()
);
export const deleteReview = createAction(
  '[Restaurants Page] Delete Review',
  props<{ id: number}>()
);
export const deleteReviewSuccess = createAction(
  '[Restaurants Page] Delete Review Success',
  props<{ id: number }>()
);