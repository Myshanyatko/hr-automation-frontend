import { RestaurantsState } from './../state/restaurants.state';
import { ProductsState } from './../state/products.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectRestaurants = (state: AppState) => state.restaurants

export const selectAllRestaurants = createSelector(
  selectRestaurants,
  (state: RestaurantsState) => state.restaurants
);