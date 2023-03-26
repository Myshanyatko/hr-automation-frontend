import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getAccessToken(): string | null {
    return window.localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return window.localStorage.getItem('refreshToken');
  }
  getUserId(): any {
    return Number(window.localStorage.getItem('userId'));
  }
  getUsername(): any {
    return window.localStorage.getItem('username');
  }
  getEmail(): string {
    return String(window.localStorage.getItem('email'));
  }
  isLoggedIn() {
    return this.getRefreshToken() !== null;
  }
}
