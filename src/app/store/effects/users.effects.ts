import { AlertService } from './../../services/alert.service';
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
          catchError((err) => {
            this.dialogService.showDialog(err.message).subscribe();
            return EMPTY;
          })
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
          catchError((err) => {
            this.dialogService.showDialog(err.message).subscribe();
            return EMPTY;
          })
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
            this.alert
              .showNotificationSuccess('Изменения сохранены')
              .subscribe();
            return setUser({ user: action.user });
          }),

          catchError((err) => {
            this.alert.showNotificationError(err.message).subscribe();
            return EMPTY;
          })
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
            this.alert
              .showNotificationSuccess('Новый сотрудник добавлен')
              .subscribe();
            this.router.navigate(['users']);
            return addNewUserSuccess({ user: action.user });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.message).subscribe();
            return EMPTY;
          })
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
            this.alert.showNotificationSuccess('Сотрудник удален').subscribe();
            this.router.navigate(['users']);
            return deleteUserSuccess({ id: action.id });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.message).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private alert: AlertService,
    private router: Router,
    private usersService: UsersService
  ) {}
}
