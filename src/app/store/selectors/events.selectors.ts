import { EventsState } from './../state/events.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectEvents = (state: AppState) => state.events

export const selectAllEvents = createSelector(
  selectEvents,
  (state: EventsState) => state.events
);
export const selectPastEvents = createSelector(
  selectEvents,
  (state: EventsState) => state.pastEvents
);
export const selectEvent = createSelector(
  selectEvents,
  (state: EventsState) => state.currentEvent
);
export const selectPages = createSelector(
  selectEvents,
  (state: EventsState) => state.pages
);