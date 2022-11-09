import { userReducer } from './user.reducer';
import { AppState } from './../state/app.state';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';

export const appReducers: ActionReducerMap<AppState, any> = {
  users: userReducer,
};
