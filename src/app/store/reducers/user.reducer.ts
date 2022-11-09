import { userActions } from './../actions/users.actions';

import { User } from './../../models/user';
import { initialUserState, UserState } from './../state/users.state';
import * as Actions from '../actions/users.actions';
import { createReducer, on, Action } from '@ngrx/store';

// export const userReducer = createReducer(
//   initialUserState,
//   on(Actions.setUsers, (state, { userList }) => ({
//     ...state,
//     users: userList,
//   })),
//   on(Actions.setUsersError, (state, { userList }) => ({
//     ...state,
//     users: userList,
//   }))
// );
export function userReducer(state = initialUserState, action: userActions) {
  switch (action.type) {
    case '[Users Page] Set Users': {
      return {
        ...state,
        users: action.payload,
      };
    }

    default:
      return state;
  }
}
