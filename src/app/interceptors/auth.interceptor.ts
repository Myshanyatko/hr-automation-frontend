import { Actions, ofType } from '@ngrx/effects';
import {
  logout,
  refresh,
  refreshSuccess,
  refreshError,
} from './../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../services/token.service';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  throwError,
  catchError,
  filter,
  switchMap,
  take,
} from 'rxjs';
import { AppState } from '../store/state/app.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private tokenService: TokenService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.tokenService.getAccessToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('authorization?email=') &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }

        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', token),
      // headers: request.headers.set('Access-Control-Allow-Origin', '*')
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();

      if (token) {
        this.store$.dispatch(refresh({ token: token }));
        this.actions$.pipe(ofType(refreshSuccess)).subscribe(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(this.tokenService.getAccessToken());
          return next.handle(
            this.addTokenHeader(
              request,
              String(this.tokenService.getAccessToken())
            )
          );
        });

        this.actions$.pipe(ofType(refreshError)).subscribe(() => {
          this.isRefreshing = false;
          this.store$.dispatch(logout());
        });
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
