import { ShortEvent } from './../../models/shortEvent';

import { createAction, props } from '@ngrx/store';
import { Event } from 'src/app/models/event';

export const getEvents = createAction(
  '[Events Page] Get Events',
  props<{ pageNumber: number }>()
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
