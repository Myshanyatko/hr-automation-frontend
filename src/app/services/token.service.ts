import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})



export class TokenService {

  constructor(private router: Router, private http: HttpClient) { }

  setAccessToken(token : string) : void{
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.setItem('accessToken', token); //засэтали временный токен
  }
  getAccessToken(): string | null{
    return window.sessionStorage.getItem('accessToken');
  }
  setRefreshToken(token : string) : void{
    window.sessionStorage.removeItem('refreshToken');
    window.sessionStorage.setItem('refreshToken', token);//засэтали рефреш токен
    
  }
  getRefreshToken(): string | null{
    return window.sessionStorage.getItem('refreshToken');
  }
  setAuthUser(user: any): void {
    window.sessionStorage.removeItem('authUser');
    window.sessionStorage.setItem('authUser', JSON.stringify(user));
  }
  getAuthUser(): any {
    const user = window.sessionStorage.getItem('authUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  isLoggedIn(){
    return this.getRefreshToken() !== null 
  }
 
}
