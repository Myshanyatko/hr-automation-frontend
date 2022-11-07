import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  setAccessToken(token: string): void {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.setItem('accessToken', token); //засэтали временный токен
  }
  getAccessToken(): string | null {
    return window.sessionStorage.getItem('accessToken');
  }
  setRefreshToken(token: string): void {
    window.sessionStorage.removeItem('refreshToken');
    window.sessionStorage.setItem('refreshToken', token); //засэтали рефреш токен
  }
  getRefreshToken(): string | null {
    return window.sessionStorage.getItem('refreshToken');
  }
  setAuthUserName(user: object): void {
    window.localStorage.setItem('authUserName', JSON.stringify(user));
  }
  getAuthUserName(): any {
    const user = window.localStorage.getItem('authUserName');
    if (user) {
      console.log('AuthUser');

      return JSON.parse(user);
    }
    return null;
  }
  isLoggedIn() {
    return this.getRefreshToken() !== null;
  }
}
