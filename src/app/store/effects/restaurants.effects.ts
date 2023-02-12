import { RestaurantsService } from './../../services/restaurants.service';
import {
  createRestaurant,
  getRestaurants,
  setRestaurants,
  createRestaurantSuccess,
  getCities,
  setCities,
  getStatuses,
  setStatuses,
  createCity,
  createCitySuccess,
  deleteCity,
  deleteCitySuccess,
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
      mergeMap((res) =>
        this.restaurantsService.getRestaurants(res.cityId).pipe(
          map((res) => setRestaurants({ restaurants: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  getStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStatuses),
      mergeMap(() =>
        this.restaurantsService.getStatuses().pipe(
          map((res) => setStatuses({ statuses: res })),
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
  createCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCity),
      mergeMap(({ city, processId }) =>
        this.restaurantsService.createCity(city).pipe(
          map(() => {
            return createCitySuccess({
              processId: processId,
              city: city,
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
  createCitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCitySuccess),
        map(() => {
          this.alert.showNotificationSuccess('Город добавлен').subscribe();
        })
      ),
    { dispatch: false }
  );
  getCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCities),
      mergeMap(() =>
        this.restaurantsService.getCities().pipe(
          map((res) => setCities({ cities: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCity),
      mergeMap((res) =>
        this.restaurantsService.deleteCity(res.id).pipe(
          map(
            () => deleteCitySuccess({ id: res.id }),
            catchError((err) => {
              this.alert.showNotificationError(err.error).subscribe();
              return EMPTY;
            })
          )
        )
      )
    )
  );
  deleteCitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCitySuccess),
        map(() =>
          this.alert.showNotificationSuccess('Город удален').subscribe()
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private restaurantsService: RestaurantsService,
    private alert: AlertService
  ) {}
}
