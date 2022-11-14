import { createReducer, on } from '@ngrx/store';
import {
  setUsers,
  setUser,
  editUser,
  addNewUserSuccess,
  deleteUserSuccess,
} from './../actions/users.actions';
import { initialUserState } from './../state/users.state';

export const userReducer = createReducer(
  initialUserState,
  on(setUsers, (state, { userList }) => {
    return { ...state, users: userList };
  }),
  on(setUser, (state, { user }) => {
    return { ...state, selectedUser: user };
  }),
  on(editUser, (state, { user }) => {
    return { ...state, selectedUser: user };
  }),
  on(addNewUserSuccess, (state, { user }) => {
    return { ...state, users: [...state.users, user] };
  }),
  on(deleteUserSuccess, (state, { id }) => {
    return {
      ...state,
      users: [
        ...state.users.filter((user) => {
          user.id !== id;
        }),
      ],
    };
  })
);
