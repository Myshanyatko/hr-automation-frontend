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
  getRestaurant,
  setRestaurant,
  getFiltredRestaurants,
  setFiltredRestaurants,
  deleteRestaurant,
  deleteRestaurantSuccess,
  deleteReview,
  deleteReviewSuccess,
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
          map((res) => setRestaurants({ builds: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  getFiltredRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFiltredRestaurants),
      mergeMap((res) =>
        this.restaurantsService.getFiltredRestaurants(res.filter).pipe(
          map((res) => setFiltredRestaurants({ restaurants: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  getRestaurant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRestaurant),
      mergeMap((res) =>
        this.restaurantsService.getRestaurant(res.id).pipe(
          map((res) => setRestaurant({ restaurant: res })),
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
  deleteRestaurant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRestaurant),
      mergeMap((res) =>
        this.restaurantsService.deleteRestaurant(res.id).pipe(
          map(
            () => deleteRestaurantSuccess({ id: res.id, processId: res.processId }),
            catchError((err) => {
              this.alert.showNotificationError(err.error).subscribe();
              return EMPTY;
            })
          )
        )
      )
    )
  );
  deleteRestaurantSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteRestaurantSuccess),
        map(() =>
          this.alert.showNotificationSuccess('Ресторан удален').subscribe()
        )
      ),
    { dispatch: false }
  );
  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteReview),
      mergeMap((res) =>
        this.restaurantsService.deleteReview(res.id).pipe(
          map(
            () => deleteReviewSuccess({ id: res.id }),
            catchError((err) => {
              this.alert.showNotificationError(err.error).subscribe();
              return EMPTY;
            })
          )
        )
      )
    )
  );
  deleteReviewSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteReviewSuccess),
        map(() =>
          this.alert.showNotificationSuccess('Отзыв удален').subscribe()
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
