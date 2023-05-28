import {
  editEvent,
  editEventSuccess,
} from 'src/app/store/actions/events.actions';
import {
  setEvents,
  getPastEvents,
  setPastEvents,
  getEvent,
  setEvent,
  createEventSuccess,
  createEvent,
  deleteEvent,
  deleteEventSuccess,
} from './../actions/events.actions';
import { EventsService } from './../../services/events.service';
import { AlertService } from './../../services/alert.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY, tap } from 'rxjs';
import { getEvents } from '../actions/events.actions';
@Injectable()
export class EventsEffects {
  getEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEvents),
      mergeMap((res) =>
        this.eventsService.getEvents(res.filter, res.pageNumber).pipe(
          map((res) => setEvents({ events: res.events, pages: res.pages })),
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
          map((res) => setPastEvents({ pastEvents: res, pages: 2 })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  getEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEvent),
      mergeMap((res) =>
        this.eventsService.getEvent(res.id).pipe(
          map((res) => setEvent({ event: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createEvent),
      mergeMap(({ event, processId, callback, photo }) =>
        this.eventsService.createEvent(event).pipe(
          map((id) => {
            return createEventSuccess({ processId: processId, photo: photo, id: id });
          }),
          catchError((err) => {
            callback();
            this.alert.showNotificationError2(err.error, processId).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  createEventSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createEventSuccess),
        map((action) => {
          if (action.photo != null)
            return this.eventsService
              .postPhoto(action.photo, action.id)
              .pipe(
                map(() => {
                  this.alert
                    .showNotificationSuccess('Событие создано')
                    .subscribe();
                }),
                catchError((err) => {
                  this.alert.showNotificationError(err.error).subscribe();
                  return EMPTY;
                })
              )
              .subscribe();
          else
            return this.alert
              .showNotificationSuccess('Продукт создан')
              .subscribe();
        })
      ),
    { dispatch: false }
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEvent),
      mergeMap(({ id, processId }) =>
        this.eventsService.deleteEvent(id).pipe(
          map(() => {
            return deleteEventSuccess({ processId: processId });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  deleteEventSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteEventSuccess),
        map(() =>
          this.alert.showNotificationSuccess('Событие удалено').subscribe()
        )
      ),

    { dispatch: false }
  );
  editEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editEvent),
      mergeMap(({ event, processId, callback, photo }) =>
        this.eventsService.editEvent(event).pipe(
          map(() => {
            return editEventSuccess({ processId: processId, photo: photo, id: event.id  });
          }),
          catchError((err) => {
            callback();
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  editEventSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editEventSuccess),
        map((action) => {
          if (action.photo != null)
            return this.eventsService
              .postPhoto(action.photo, action.id)
              .pipe(
                map(() => {
                  this.alert
                    .showNotificationSuccess('Событие изменино')
                    .subscribe();
                }),
                catchError((err) => {
                  this.alert.showNotificationError(err.error).subscribe();
                  return EMPTY;
                })
              )
              .subscribe();
          else
            return this.alert
              .showNotificationSuccess('Событие изменино')
              .subscribe();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
    private alert: AlertService
  ) {}
}
