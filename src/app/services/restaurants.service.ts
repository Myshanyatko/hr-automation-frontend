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
    return this.http.get<Restaurant[]>(API+'/get/all', {
      params: { pageNumber: 0, size: 20, sortBy: 'id' },
    });
  }

  
}
