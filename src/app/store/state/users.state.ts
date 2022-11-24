import { UserInfo } from './../../models/userInfo';
import { User } from './../../models/user';
export interface UserState {
  users: User[];
  selectedUser: UserInfo;
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: {
    id: 0,
    username: '',
    date: '',
    email: '',
    project: '',
    post: '',
    photo: '',
    about: '',
    admin: false,
  },
};
