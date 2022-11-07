import { UsersActions, EUsersActions } from './../actions/users.actions';
import { User } from './../../models/user';
export interface State {
  users: User[];
  selectedUser: User;
}
export const initialState: State = {
  users: [],
  selectedUser: { id: 0, username: '', photo: '', post: '' },
};
export const usersReducer = (
  state = initialState,
  action: UsersActions
): State => {
  switch (action.type) {
    case EUsersActions.GET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    default:
      return state;
  }
};
