// import { TokenService } from './../services/token.service';
// import { AuthService } from '../services/auth.service';

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
// import { catchError, Observable, switchMap, throwError } from 'rxjs';

// @Injectable()
// export class RefreshTokenInterceptor implements HttpInterceptor {

 
//   refresh = false;
//   constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     const req = request.clone(
//       {
//         setHeaders: {
//           Authorization: `Bearer ${this.tokenService.getAccessToken()}`
//         }
//       }
//     )
//     return next.handle(req)
   
//   }
// }
