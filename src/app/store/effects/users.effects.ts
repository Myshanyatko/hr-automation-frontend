import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
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

      mergeMap((action) =>
        this.usersService.putUser(action.user).pipe(
          map(() => {
            this.dialogService.showDialog('Изменения сохранены').subscribe();
            return setUser({ user: action.user });
          }),

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
          map(() => {
            this.dialogService
              .showDialog('Новый сотрудник добавлен')
              .subscribe();
            this.router.navigate(['users']);
            return addNewUserSuccess({ user: action.user });
          }),
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
          map(() => {
            this.dialogService.showDialog('Сотрудник удален').subscribe();
            this.router.navigate(['users']);
            return deleteUserSuccess({ id: action.id });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private router: Router,
    private usersService: UsersService
  ) {}
}
