import { RestStatus } from './../models/restStatus';
import { City } from './../models/city';
import { Restaurant } from './../models/restaurant';

import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://hr-automation-backend.onrender.com/restaurants';
// const API = 'http://localhost:8080/products';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  getRestaurants(cityId: number) {
    return this.http.get<Restaurant[]>(API + `/get/city/${cityId}`, {
      params: { pageNumber: 0, size: 20, sortBy: 'id' },
    });
  }

  getStatuses() {
    return this.http.get<RestStatus[]>(API + '/get/all/statuses');
  }
  createRestaurant(restaurant: Restaurant) {
    return this.http.post<Restaurant[]>(
      API + `/add/status/${restaurant.status}/city/${restaurant.city}`,
      {
        name: restaurant.name, 
        rating: 1.7, 
        average: 700, 
        address: restaurant.address, 
        lat: restaurant.lat,
        lng: restaurant.lng,
      }
    );
  }
  getCities() {
    return this.http.get<City[]>('https://hr-automation-backend.onrender.com/cities/get/all')
  }
}
