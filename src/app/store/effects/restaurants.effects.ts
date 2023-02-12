import { RestaurantsService } from './../../services/restaurants.service';
import {
  createRestaurant,
  getRestaurants,
  setRestaurants,
  createRestaurantSuccess,
} from './../actions/restaurants.actions';
import { AlertService } from './../../services/alert.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY, tap } from 'rxjs';
@Injectable()
export class RestaurantsEffects {
  getRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRestaurants),
      mergeMap(() =>
        this.restaurantsService.getRestaurants().pipe(
          map((res) => setRestaurants({ restaurants: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  createRestaurant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createRestaurant),
      mergeMap(({ restaurant, processId }) =>
        this.restaurantsService.createRestaurant(restaurant).pipe(
          map(() => {
            return createRestaurantSuccess({
              processId: processId,
              restaurant: restaurant,
            });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  createRestaurantSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createRestaurantSuccess),
        map(() => {
          this.alert.showNotificationSuccess('Ресторан создан').subscribe();
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private restaurantsService: RestaurantsService,
    private alert: AlertService
  ) {}
}
