import { UserState } from './../state/users.state';
import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
const selectUsers = (state: AppState) => state.users;

export const selectUserList = createSelector(
  selectUsers,
  (state: UserState) => state.users
);
export const selectUser = createSelector(
  selectUsers,
  (state: UserState) => state.selectedUser
);
export const selectUserBirthDate = createSelector(
  selectUsers,
  (state: UserState) => {
    if (state.selectedUser != null) return state.selectedUser.birthDate;
    else return new Date();
  }
);
export const selectPages = createSelector(
  selectUsers,
  (state: UserState) => state.pages
  
);
