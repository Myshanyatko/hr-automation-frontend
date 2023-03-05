import { Review } from './../models/review';
import { EditedRest } from './../models/editedRest';
import { Build } from './../models/build';
import { createRest, createRestViaCoords } from './../store/actions/restaurants.actions';
import { url } from './url';
import { RestStatus } from './../models/restStatus';
import { City } from './../models/city';
import { Restaurant } from './../models/restaurant';

import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shortRest } from '../models/shortRest';

const API = url + 'restaurants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  getRestaurant(id: number) {
    return this.http.get<Restaurant>(API + `/${id}`);
  }
  getRestaurants(cityId: number) {
    return this.http.get<Build[]>(API + `/get/city/${cityId}`, {
      params: { pageNumber: 0, size: 20, sortBy: 'id' },
    });
  }
  getFiltredRestaurants(filter: string) {
    return this.http.get<shortRest[]>(API + `/search`, {
      params: { filter: filter, pageNumber: 0, size: 20, sortBy: 'id' },
    });
  }
  getEditedRestaurant(id: number) {
    return this.http.get<createRest>(API + `/update/${id}`);
  }

  getStatuses() {
    return this.http.get<RestStatus[]>(API + '/get/all/statuses');
  }
  createRestaurant(restaurant: createRest) {
    return this.http.post(
      API + `/add/status/${restaurant.statusId}/city/${restaurant.cityId}`,
      {
        name: restaurant.name,
        address: restaurant.address,
      }
    );
  }
  createRestaurantViaCoords(restaurant: createRestViaCoords) {
    return this.http.post(
      API + `/add/status/${restaurant.statusId}/city/${restaurant.cityId}`,
      restaurant
    );
  }
  createCity(city: string) {
    return this.http.post(
      `https://hr-automation-backend.onrender.com/cities/add`,
    {name: city}
    );
  }
  deleteCity(id: number) {
    return this.http.delete(
      `https://hr-automation-backend.onrender.com/cities/delete/${id}`
    );
  }
  deleteRestaurant(id: number) {
    return this.http.delete(API + `/delete/${id}`);
  }
  deleteReview(id: number) {
    return this.http.delete(
      `https://hr-automation-backend.onrender.com/reviews/delete/${id}`
    );
  }
  updateRestaurant(restaurant: EditedRest) {
    return this.http.put(API + `/update`, 
      restaurant
    );
  }
  getCities() {
    return this.http.get<City[]>(
      'https://hr-automation-backend.onrender.com/cities/get/all'
    );
  }
  getReviews(id: number) {
    return this.http.get<Review[]>(
    `https://hr-automation-backend.onrender.com/reviews/get/restaurant/${id}`
    );
  }
}
