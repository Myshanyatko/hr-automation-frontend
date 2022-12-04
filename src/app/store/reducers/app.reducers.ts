import { authReducer } from './auth.reducer';
import { productsReducer } from './products.reducer';
import { faqReducer } from './faq.reducer';
import { userReducer } from './user.reducer';
import { AppState } from './../state/app.state';
import {  ActionReducerMap } from '@ngrx/store';

export const appReducers: ActionReducerMap<AppState, any> = {
  users: userReducer,
  faq: faqReducer,
  products: productsReducer,
  auth: authReducer
};
