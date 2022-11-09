import { userInfo } from './../../models/userInfo';
import { User } from '../../models/user';
import { Action, createAction, props } from '@ngrx/store';

export const getUsers = createAction('[Users Page] Get Users');
class setUsers implements Action {
  readonly type = '[Users Page] Set Users';
  constructor(public payload: User[]) {}
}
export class setUser implements Action {
  readonly type = '[Users Page] Set User';
  constructor(public payload: userInfo) {}
}
export const getUser = createAction(
  '[Users Page] Get User',
  props<{ userId: number }>()
);
export const setUsersError = createAction(
  '[Users Page] Set Users Error',
  props<{ userList: [{ id: 3; username: 'error'; post: 'error' }] }>()
);
export type userActions = setUsers | setUser;
