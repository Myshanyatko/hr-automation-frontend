import { UsersService } from './../../services/users.service';
import { map } from 'rxjs/operators';
import {
  getUser,
  getUsers,
  setUsers,
  setUser,
  editUser,
  addNewUser,
  addNewUserSuccess,
  deleteUser,
  deleteUserSuccess,
} from './../actions/users.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY } from 'rxjs';
@Injectable()
export class USersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => setUsers({ userList: users })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      exhaustMap((action) =>
        this.usersService.getUser(action.userId).pipe(
          map((user) => setUser({ user })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      exhaustMap((action) =>
        this.usersService.putUser(action.user).pipe(
          map(() => setUser({ user: action.user })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  AddNewUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewUser),
      exhaustMap((action) =>
        this.usersService.postUser(action.user).pipe(
          map(() => addNewUserSuccess({ user: action.user })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      exhaustMap((action) =>
        this.usersService.deleteUser(action.id).pipe(
          map(() => deleteUserSuccess({ id: action.id })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  constructor(private actions$: Actions, private usersService: UsersService) {}
}
