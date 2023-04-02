import { ShortEvent } from './../../models/shortEvent';
import { Event } from 'src/app/models/event';

export interface EventsState {
  upcomingEvents: ShortEvent[] | null;
  pastEvents: ShortEvent[] | null;
  pages: number
}

export const initialEventsState: EventsState = {
  upcomingEvents: null,
  pastEvents: null,
  pages: 1
};