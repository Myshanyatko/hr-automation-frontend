import { ShortEvent } from './../models/shortEvent';
import { url } from './url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';

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
  getEvent(id: number) {
    return this.http.get<Event>(API+`/get/${id}`);
  }
}
