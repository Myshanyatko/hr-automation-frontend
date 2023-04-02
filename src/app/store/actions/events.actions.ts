import { ShortEvent } from './../../models/shortEvent';

import { createAction, props } from '@ngrx/store';
import { Event } from 'src/app/models/event';

export const getUpcomingEvents = createAction(
  '[Events Page] Get Upcoming Events',
  props<{ pageNumber: number }>()
);
export const setUpcomingEvents = createAction(
  '[Events Page] Set Upcoming Events',
  props<{ upcomingEvents: ShortEvent[]; pages: number }>()
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
