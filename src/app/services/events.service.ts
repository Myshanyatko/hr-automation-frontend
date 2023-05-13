import { ShortEvent } from './../models/shortEvent';
import { url } from './url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Filter } from '../models/filterEvents';

const API = url + 'events';
interface responseEvents {
  events: ShortEvent[];
  pages: number;
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
    return this.http.get<ShortEvent[]>(API + '/get/archive', {
      params: { pageNumber: pageNumber, size: 20, sortBy: 'id' },
    });
  }
  getEvent(id: number) {
    return this.http.get<Event>(API + `/get/${id}`);
  }
  getEvents(filter: Filter, pageNumber: number) {
    return this.http.post<responseEvents>(
      API + '/get',

      filter,
      { params: { pageNumber: pageNumber, size: 20, sortBy: 'date' } }
    );
  }
  createEvent(event: Event) {
    return this.http.post(API + '/add', {
      name: event.name,
      description: event.description,
      cityId: event.cityId,
      materials: event.materials,
      date: event.date,
      format: event.format,
      address: event.address,
      lat: event.lat,
      lng: event.lng,
    });
  }
  deleteEvent(id: number) {
    return this.http.delete(API + '/delete/' + id);
  }
  editEvent(event: Event) {
    return this.http.put(API + '/update', event);
  }
}
