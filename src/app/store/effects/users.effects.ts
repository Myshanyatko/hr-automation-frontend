import { map } from 'rxjs/operators';
import { User } from './../../models/user';
import { AppState } from './../state/app.state';
import { Store, select } from '@ngrx/store';
// import { getUsers, setUsers } from './../actions/users.actions';
import { UsersService } from './../../services/users.service';
import { Injectable } from '@angular/core';
import { EMPTY, switchMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError } from 'rxjs';
@Injectable()
export class USersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Users Page] Get Users'),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => ({
            type: '[Users Page] Set Users',
            payload: users,
          })),
          catchError(() => of({ type: '[Users Page] Set Users Error' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private usersService: UsersService
  ) {
    console.log('effect');
  }
}
