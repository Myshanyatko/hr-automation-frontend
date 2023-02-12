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

  getRestaurants() {
    return this.http.get<Restaurant[]>(API + '/get/all', {
      params: { pageNumber: 0, size: 20, sortBy: 'id' },
    });
  }
  createRestaurant(restaurant: Restaurant) {
    return this.http.post<Restaurant[]>(
      API + `/add/status/${restaurant.status}/city/2`,
      {
        name: restaurant.name, //название рестика
        rating: 3.7, //звезды//id статусa (ресторан, кафе...)
        average: 700, //средний чек
        address: restaurant.address, //адрес рестика ('Ленина 1')
        lat: restaurant.lat,
        lng: restaurant.lng,
      }
    );
  }
}
