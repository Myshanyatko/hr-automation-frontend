import { ShortEvent } from './../../models/shortEvent';

import { createAction, props } from '@ngrx/store';
import { Event } from 'src/app/models/event';
import { Filter } from 'src/app/models/filterEvents';

export const getEvents = createAction(
  '[Events Page] Get Events',
  props<{ pageNumber: number, filter: Filter }>()
);
export const setEvents = createAction(
  '[Events Page] Set Events',
  props<{ events: ShortEvent[]; pages: number }>()
);

export const getPastEvents = createAction(
  '[Events Page] Get Past Events',
  props<{ pageNumber: number }>()
);
export const setPastEvents = createAction(
  '[Events Page] Set Past Events',
  props<{ pastEvents: ShortEvent[]; pages: number }>()
);
export const getEvent = createAction(
  '[Event Page] Get Event',
  props<{ id: number }>()
);
export const setEvent = createAction(
  '[Event Page] Set Event',
  props<{ event: Event }>()
);
export const createEvent = createAction(
  '[Create Event Page] Create Event',
  props<{ event: Event; processId: number }>()
);
export const createEventSuccess = createAction(
  '[Create Event Page] Create Event Success',
  props<{  processId: number }>()
);
export const deleteEvent = createAction(
  '[Event Page] Delete Event',
  props<{ id: number; processId: number }>()
);
export const deleteEventSuccess = createAction(
  '[Event Page] Delete Event Success',
  props<{  processId: number }>()
);
export const editEvent = createAction(
  '[Edit Event Page] Edit Event',
  props<{ event: Event; processId: number }>()
);
export const editEventSuccess = createAction(
  '[Edit Event Page] Edit Event Success',
  props<{  processId: number }>()
);
