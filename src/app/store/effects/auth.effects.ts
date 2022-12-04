import { AuthService } from './../../services/auth.service';
import {
  key,
  login,
  keySuccess,
  loginSuccess,
  logout,
  refresh,
  refreshSuccess,
  refreshError,
} from './../actions/auth.actions';
import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, EMPTY } from 'rxjs';
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService.login(action.email).pipe(
          map((res) => loginSuccess({ email: action.email, key: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        map((action) => {
          window.sessionStorage.setItem('email', action.email);
          window.sessionStorage.setItem('key', String(action.key));
          this.router.navigate(['/key']);
        })
      ),
    { dispatch: false }
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        map(() => {
          window.sessionStorage.clear();
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refresh),
      mergeMap((action) =>
        this.authService.refreshToken(action.token).pipe(
          map((res) => {
            window.sessionStorage.setItem('accessToken', res.accessToken);
            window.sessionStorage.setItem('refreshToken', res.refreshToken);
            return refreshSuccess();
          }),
          catchError(
            map((err: any) => {
              this.alert.showNotificationError(err.error).subscribe();
              return refreshError();
            })
          )
        )
      )
    )
  );

  key$ = createEffect(() =>
    this.actions$.pipe(
      ofType(key),
      mergeMap((action) =>
        this.authService.key(action.key, action.email).pipe(
          map((res) => keySuccess({ dataUser: res })),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );

  keySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(keySuccess),
        map((res) => {
          window.sessionStorage.setItem(
            'accessToken',
            res.dataUser.accessToken
          );
          window.sessionStorage.setItem(
            'refreshToken',
            res.dataUser.refreshToken
          );
          window.sessionStorage.setItem('username', res.dataUser.username);
          window.sessionStorage.setItem('userId', String(res.dataUser.userId));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private alert: AlertService
  ) {}
}
