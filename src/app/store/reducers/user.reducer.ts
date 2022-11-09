import { userActions } from './../actions/users.actions';
import { initialUserState } from './../state/users.state';

export function userReducer(state = initialUserState, action: userActions) {
  switch (action.type) {
    case '[Users Page] Set Users': {
      return {
        ...state,
        users: action.payload,
      };
    }
    case '[Users Page] Set User': {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }

    default:
      return state;
  }
}
