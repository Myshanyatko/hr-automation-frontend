import { UserInfo } from './../../models/userInfo';
import { User } from '../../models/user';
import { createAction, props } from '@ngrx/store';

// список всех пользователей
export const getUsers = createAction(
  '[Users Page] Get Users',
  props<{ pageNumber: number }>()
);
export const setUsers = createAction(
  '[Users Page] Set Users',
  props<{ userList: User[]; pages: number }>()
);

// список отфильтрованных пользователей
export const getFilteredUsers = createAction(
  '[Users Page] Get Filtered Users',
  props<{ pageNumber: number; filter: string }>()
);
// выбранный пользователь
export const getUser = createAction(
  '[Users Page] Get User',
  props<{ userId: number }>()
);
export const setUser = createAction(
  '[Users Page] Set User',
  props<{ user: UserInfo }>()
);
//изменить выбранного пользователя
export const editUser = createAction(
  '[Users Page] Edit User',
  props<{ user: UserInfo; photo: FormData | null; processId: number }>()
);
export const editUserSuccess = createAction(
  '[Users Page] Edit User Success',
  props<{ user: UserInfo; photo: FormData | null; processId: number }>()
);
//изменить выбранного пользователя
export const addNewUser = createAction(
  '[Users Page] Add New User',
  props<{ user: UserInfo; photo: FormData | null; processId: number }>()
);
export const addNewUserSuccess = createAction(
  '[Users Page] Add New User Succes',
  props<{ user: UserInfo; photo: FormData | null; processId: number }>()
);
//удалить выбранного пользователя
export const deleteUser = createAction(
  '[Users Page] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[Users Page] Delete User Succes',
  props<{ id: number }>()
);
