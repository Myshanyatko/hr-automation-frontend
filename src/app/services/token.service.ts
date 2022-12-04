import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getAccessToken(): string | null {
    return window.sessionStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return window.sessionStorage.getItem('refreshToken');
  }
  getUserId(): any {
    return Number(window.sessionStorage.getItem('userId'));
  }
  getUsername(): any {
    return window.sessionStorage.getItem('username');
  }
  getEmail(): string {
    return String(window.sessionStorage.getItem('email'));
  }
  isLoggedIn() {
    return this.getRefreshToken() !== null;
  }
}
