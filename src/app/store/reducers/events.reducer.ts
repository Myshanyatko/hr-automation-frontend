import { setUpcomingEvents, setPastEvents } from './../actions/events.actions';
import { initialEventsState } from './../state/events.state';

import { createReducer, on } from '@ngrx/store';
export const eventsReducer = createReducer(
  initialEventsState,
  on(setUpcomingEvents, (state, { upcomingEvents, pages }) => {
   
    
    return { ...state, upcomingEvents: upcomingEvents, pages: pages };
  }),
  on(setPastEvents, (state, { pastEvents, pages }) => {
    return { ...state, pastEvents: pastEvents, pages: pages };
  })
);
