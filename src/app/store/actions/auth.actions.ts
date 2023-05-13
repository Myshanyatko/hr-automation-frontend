import { DataUser } from './../../services/auth.service';
import { UserInfo } from './../../models/userInfo';
import { createAction, props } from '@ngrx/store';

// отправляем почту
export const login = createAction(
  '[Auth Page] Login',
  props<{ email: string, callback: Function  }>()
);
export const loginSuccess = createAction(
  '[Auth Page] Login Success',
  props<{ email: string; key: number }>()
);
// отправляем key
export const key = createAction(
  '[Auth Page] Key',
  props<{ key: number; email: string, callback: Function }>()
);
export const keySuccess = createAction(
  '[Auth Page] Key Success',
  props<{ dataUser: DataUser }>()
);
// выход
export const logout = createAction('[Auth Page] Logout');
// рефреш
export const refresh = createAction(
  '[Auth Page] Refresh Token',
  props<{ token: string }>()
);
export const refreshSuccess = createAction('[Auth Page] Refresh Token Success');
export const refreshError = createAction('[Auth Page] Refresh Token Error');
