import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { DialogService } from './../../services/dialog.service';
import { UsersService } from './../../services/users.service';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
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
  getFilteredUsers,
} from './../actions/users.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, catchError, EMPTY } from 'rxjs';
@Injectable()
export class USersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap((action) => {
        if (
          sessionStorage.getItem('usersFilter') == null ||
          sessionStorage.getItem('usersFilter') == ''
        ) {
          return this.usersService.getUsers(action.pageNumber).pipe(
            map((res) => setUsers({ userList: res.users, pages: res.pages })),
            catchError((err) => {
              this.alert.showNotificationError(err.error).subscribe();
              return EMPTY;
            })
          );
        } else
          return this.usersService
            .getFilteredUsers(
              action.pageNumber,
              String(sessionStorage.getItem('usersFilter'))
            )
            .pipe(
              map((res) => setUsers({ userList: res.users, pages: res.pages })),
              catchError((err) => {
                this.alert.showNotificationError(err.error).subscribe();
                return EMPTY;
              })
            );
      })
    )
  );

  getFiltredUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilteredUsers),
      mergeMap((action) =>
        this.usersService
          .getFilteredUsers(action.pageNumber, action.filter)
          .pipe(
            map((res) => setUsers({ userList: res.users, pages: res.pages })),
            catchError((err) => {
              this.alert.showNotificationError(err.error).subscribe();
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
            this.alert.showNotificationError(err.error).subscribe();
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
              photo: action.photo,
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
  editUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserSuccess),
      tap((action) =>  
      {  if (action.photo != null) 
          return this.usersService.postPhoto(action.photo, action.user.id).pipe(
            map(() => {
              this.alert
                .showNotificationSuccess('Изменения сохранены и фото тоже')
                .subscribe();
              return setUser({
                user: action.user,
              });
            }),
            catchError((err) => {
              this.alert.showNotificationError(err.error).subscribe();
              return EMPTY;
            })
          )
        else  {
            this.alert.showNotificationSuccess('Изменения сохранены').subscribe();
           return setUser({
              user: action.user,
            });
          }})
       
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
              photo: action.photo,
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

  addNewUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addNewUserSuccess),
        map((action) => {
          if (action.photo != null)
            return this.usersService.postPhoto(action.photo, -1).pipe(
              map(() => {
                this.alert
                  .showNotificationSuccess('Новый сотрудник добавлен')
                  .subscribe();
              }),
              catchError((err) => {
                this.alert.showNotificationError(err.message).subscribe();
                return EMPTY;
              })
            );
          else
            return this.alert
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
    private alert: AlertService,
    private router: Router,
    private usersService: UsersService
  ) {}
}
