import { setEvents, setPastEvents, setEvent, createEventSuccess } from './../actions/events.actions';
import { initialEventsState } from './../state/events.state';

import { createReducer, on } from '@ngrx/store';
export const eventsReducer = createReducer(
  initialEventsState,
  on(setEvents, (state, { events, pages }) => {
   
    
    return { ...state, events: events, pages: pages };
  }),
  on(setPastEvents, (state, { pastEvents, pages }) => {
    return { ...state, pastEvents: pastEvents, pages: pages };
  }),
  on(setEvent, (state, { event }) => {
    return { ...state, currentEvent: event };
  })
);
