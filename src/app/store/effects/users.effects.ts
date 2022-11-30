import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { UsersService } from './../../services/users.service';
import { map, tap } from 'rxjs/operators';
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
  editUserSuccess,
} from './../actions/users.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY } from 'rxjs';
@Injectable()
export class USersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap((action) =>
        this.usersService.getUsers(action.pageNumber).pipe(
          map((users) => setUsers({ userList: users })),
          catchError((err) => {
            this.dialogService.showDialog(err.error).subscribe();
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
            this.dialogService.showDialog(err.error).subscribe();
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
            return editUserSuccess({
              user: action.user,
              processId: action.processId
            });
          }),

          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  editUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editUserSuccess),

        map((action) =>{this.alert.showNotificationSuccess('Изменения сохранены').subscribe()
          return setUser({
            user: action.user,
            
          })}
          
        )
      )
  );

  AddNewUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewUser),
      exhaustMap((action) =>
        this.usersService.postUser(action.user).pipe(
          map(() => {
            return addNewUserSuccess({
              user: action.user,
              processId: action.processId,
            });
          }),
          catchError((err) => {
            this.alert.showNotificationError(err.error).subscribe();
            return EMPTY;
          })
        )
      )
    )
  );
  AddNewUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addNewUserSuccess),
        tap(() => {
          this.alert
            .showNotificationSuccess('Новый сотрудник добавлен')
            .subscribe();
        })
      ),
    { dispatch: false }
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
