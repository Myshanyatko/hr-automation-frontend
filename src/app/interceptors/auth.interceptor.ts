import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,  throwError, catchError, filter, switchMap, take  } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    

    let authReq = req;
    const token = this.tokenService.getAccessToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('authorization?email=') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(error);
    }));
  
  }

    private addTokenHeader(request: HttpRequest<any>, token: string) {      
      return request.clone(
        { headers:
           request.headers.set('Authorization', 'Bearer ' + token) 
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
  
        const token = this.tokenService.getRefreshToken();
  
        if (token)
          return this.authService.refreshToken(token).pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.tokenService.setAccessToken(token.accessToken);
              this.refreshTokenSubject.next(token.accessToken);
              
              return next.handle(this.addTokenHeader(request, token.accessToken));
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.authService.logout();
              return throwError(err);
            })
          );
      }
  
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token)))
      );
    }
  }
  export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];


