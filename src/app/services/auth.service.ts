import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DataUser {
  username: string;
  userId: number;
  refreshToken: string;
  accessToken: string;
}
export interface Tokens {
  refreshToken: string;
  accessToken: string;
}
const AUTH_API = 'https://hr-automation-backend.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //функция делающая get запрос после введения почты
  login(email: string) {
    return this.http.get<number>(
      AUTH_API + 'authorization/admin?email=' + email,
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  }

  key(key: number, email: string) {
    return this.http.get<DataUser>(
      AUTH_API + 'authorization/confirm?email=' + email + '&code=' + key
    );
  }

  //рефреш токена, когда протух
  refreshToken(token: string) {
    return this.http.post<Tokens>(AUTH_API + 'refresh', token);
  }
}
