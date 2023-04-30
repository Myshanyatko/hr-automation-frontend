import { ShortEvent } from './../../models/shortEvent';
import { Event } from 'src/app/models/event';

export interface EventsState {
  events: ShortEvent[] | null;
  pastEvents: ShortEvent[] | null;
  pages: number;
  currentEvent: Event | null;
}

export const initialEventsState: EventsState = {
  events: null,
  pastEvents: null,
  pages: 1,
  currentEvent: null
};
