import { AuthState } from './../state/auth.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectAuth = (state: AppState) => state.auth;

export const selectisLoginIn = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoginIn
);
