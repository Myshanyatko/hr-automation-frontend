import { setUpcomingEvents, getPastEvents, setPastEvents } from './../actions/events.actions';
import { EventsService } from './../../services/events.service';
import { AlertService } from './../../services/alert.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY, tap } from 'rxjs';
import { getUpcomingEvents } from '../actions/events.actions';
@Injectable()
export class EventsEffects {
  getUpcomingEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUpcomingEvents),
      mergeMap((res) =>
        this.eventsService.getUpcomingEvents(res.pageNumber).pipe(
          map((res) => setUpcomingEvents({ upcomingEvents: res, pages: 2})),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  getPastEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPastEvents),
      mergeMap((res) =>
        this.eventsService.getPastEvents(res.pageNumber).pipe(
          map((res) => setPastEvents({ pastEvents:  res, pages: 2 })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
    private alert: AlertService
  ) {}
}
