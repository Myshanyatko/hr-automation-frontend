import { ShortEvent } from './../models/shortEvent';
import { Review } from './../models/review';
import { EditedRest } from './../models/editedRest';
import { Build } from './../models/build';
import {
  createRest,
  createRestViaCoords,
} from './../store/actions/restaurants.actions';
import { url } from './url';
import { RestStatus } from './../models/restStatus';
import { City } from './../models/city';
import { Restaurant } from './../models/restaurant';

import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = url + 'events';
interface responseEvents {
  events: ShortEvent[],
  pages: number
}
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getUpcomingEvents(pageNumber: number) {
    return this.http.get<ShortEvent[]>(API + '/get/current', {
      params: { pageNumber: pageNumber, size: 20, sortBy: 'id' },
    });
  }
  getPastEvents(pageNumber: number) {
    return this.http.get<ShortEvent[]>(API+'/get/archive', {
      params: { pageNumber: pageNumber, size: 20, sortBy: 'id' },
    });
  }
}
