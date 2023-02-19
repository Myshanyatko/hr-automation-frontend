import { RestaurantsState } from './../state/restaurants.state';
import { ProductsState } from './../state/products.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectRestaurants = (state: AppState) => state.restaurants

export const selectAllRestaurants = createSelector(
  selectRestaurants,
  (state: RestaurantsState) => state.builds
);
export const selectRestaurant = createSelector(
  selectRestaurants,
  (state: RestaurantsState) => state.currentRest
);
export const selectCities = createSelector(
  selectRestaurants,
  (state: RestaurantsState) => state.cities
);
export const selectCurrentCity = createSelector(
  selectRestaurants,
  (state: RestaurantsState) => state.currentCity
);
export const selectStatuses = createSelector(
  selectRestaurants,
  (state: RestaurantsState) => state.statuses
);