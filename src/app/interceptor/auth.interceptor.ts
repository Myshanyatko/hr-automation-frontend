import { AuthService } from './../auth.service';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 
  refresh = false;
  constructor(private http: HttpClient, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const req = request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    )
    return next.handle(req)
   
  }
}
