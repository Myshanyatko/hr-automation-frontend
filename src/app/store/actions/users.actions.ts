import { User } from '../../models/user';
import { Action } from '@ngrx/store';

import { userInfo } from '../../models/userInfo';
export enum EUsersActions {
  GET_USERS = '[Users] Get Users',

  ADD_NEW_USER = '[Users] Add One',
}

export class GetUsers implements Action {
  public readonly type = EUsersActions.GET_USERS;
  constructor(public payload: User[]) {}
}
// export class GetUser implements Action {
//   public readonly type = EUsersActions.GET_USERS;
//   constructor(public payload: User) {}
// }

export type UsersActions = GetUsers;
