import { userInfo } from './../../models/userInfo';
import { User } from '../../models/user';
import { Action, createAction, props } from '@ngrx/store';

export const getUsers = createAction('[Users Page] Get Users');
// export const setUsers = createAction(
//   '[Users Page] Set Users',
//   props<{ userList: User[] }>()
// );
class setUsers implements Action {
  readonly type = '[Users Page] Set Users';
  constructor(public payload: User[]) { }
}
export const setUsersError = createAction(
  '[Users Page] Set Users Error',
  props<{ userList: [{ id: 3; username: 'error'; post: 'error' }] }>()
);
export type userActions  = setUsers