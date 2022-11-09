import { User } from './../../models/user';
export interface UserState {
  users: User[];
}

export const initialUserState: UserState = {
  users: [{ id: 0, username: 'its initional state', post: 'null' }],
};
