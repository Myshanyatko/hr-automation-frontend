import { logout } from './../actions/auth.actions';

import { initialAuthState } from './../state/auth.state';
import { createReducer, on } from '@ngrx/store';
import { setUser } from '../actions/users.actions';
import { keySuccess } from '../actions/auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(keySuccess, (state) => {
    return { ...state, isLoginIn: true };
  }),
  on(logout, (state) => {
    return { ...state, isLoginIn: false };
  })
);
