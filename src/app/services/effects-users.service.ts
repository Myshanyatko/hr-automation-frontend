import { User } from './../models/user';
import { map, catchError } from 'rxjs/operators';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EffectsUsersService {
  constructor(private usersService: UsersService) {}
  getUsers() {
    return this.usersService.getUsers().pipe(
      map((users) => ({
        type: '[Users Page] Set Users',
        payload: users,
      })),
      catchError(() => of({ type: '[Users Page] Set Users Error' }))
    );
  }
  getUser(userId: number) {

    return this.usersService.getUser(userId).pipe(
      map((user) => ({
        type: '[Users Page] Set User',
        payload: user,
      })),
      catchError(() => EMPTY)
    );
  }
}
