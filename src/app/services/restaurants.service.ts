import { Build } from './../models/build';
import { shortRest } from './../store/actions/restaurants.actions';
import { url } from './url';
import { RestStatus } from './../models/restStatus';
import { City } from './../models/city';
import { Restaurant } from './../models/restaurant';

import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = url+ 'restaurants';

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

  getStatuses() {
    return this.http.get<RestStatus[]>(API + '/get/all/statuses');
  }
  createRestaurant(restaurant: shortRest) {
    return this.http.post(
      API + `/add/status/${restaurant.statusId}/city/${restaurant.cityId}`,
      {
        name: restaurant.name, 
        address: restaurant.address, 
      }
    );
  }
  createCity(city: City) {
    return this.http.post(
      `https://hr-automation-backend.onrender.com/cities/add`,
      city
    );
  }
  deleteCity(id: number) {
    return this.http.delete(
      `https://hr-automation-backend.onrender.com/cities/delete/${id}`
    );
  }
  getCities() {
    return this.http.get<City[]>('https://hr-automation-backend.onrender.com/cities/get/all')
  }
}
