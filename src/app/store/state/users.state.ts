import { UserInfo } from './../../models/userInfo';
import { User } from './../../models/user';
export interface UserState {
  users: User[] | null;
  selectedUser: UserInfo | null;
  pages: number 
}

export const initialUserState: UserState = {
  users: null,
  selectedUser: null,
  pages: 1
};
