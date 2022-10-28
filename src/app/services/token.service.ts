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
    console.log('засэтали аккес токен '+token)
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.setItem('accessToken', token); //засэтали временный токен
  }
  getAccessToken(): string | null{
    return window.sessionStorage.getItem('accessToken');
  }
  setRefreshToken(token : string) : void{
    window.sessionStorage.removeItem('refreshToken');
    window.sessionStorage.setItem('refreshToken', token);//засэтали рефреш токен
    console.log('принимаю '+token) 
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
    return {};
  }
  isLoggedIn(){
    console.log('сначала авторизуйтесь')
    return this.getRefreshToken() !== null 
  }
 
}
