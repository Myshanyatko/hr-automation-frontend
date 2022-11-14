import { User } from './../staff/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectFeature = (state: User[]) => state;
export const selectUsersFeature = createFeatureSelector<User[]>(
  '[Users Page] Get Users'
);
export const selectUsers = createSelector(
  selectFeature,
  (state: User[]): User[] => state
);
