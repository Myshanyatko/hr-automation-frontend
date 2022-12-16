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
  on(setUsers, (state, { userList, pages}) => {
    return { ...state, users: userList , pages: pages};
  }),
  on(setUser, (state, { user }) => {
    return {
      ...state,
      selectedUser: user,
    };
  }),
  on(editUser, (state, { user }) => {
    return { ...state, selectedUser: user };
  }),
  on(addNewUserSuccess, (state, { user }) => {
    if (state.users != null) {
      return { ...state, users: [...state.users, user] };
    } else return { ...state };
  }),
  on(deleteUserSuccess, (state, { id }) => {
    if (state.users != null) {
      return {
        ...state,
        users: [
          ...state.users.filter((user) => {
            user.id !== id;
          }),
        ],
      };
    } else return { ...state };
  })
);
