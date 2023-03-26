import { EventsState } from './../state/events.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectEvents = (state: AppState) => state.events

export const selectUpcomingEvents = createSelector(
  selectEvents,
  (state: EventsState) => state.upcomingEvents
);
export const selectPastEvents = createSelector(
  selectEvents,
  (state: EventsState) => state.pastEvents
);