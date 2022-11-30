import { UserInfo } from './../../models/userInfo';
import { User } from './../../models/user';
export interface UserState {
  users: User[] | null;
  selectedUser: UserInfo;
}

export const initialUserState: UserState = {
  users: null,
  selectedUser: {
    id: 0,
    username: '',
    birthDate: null,
    email: '',
    project: '',
    post: '',
    photo: null,
    about: '',
    admin: false,
  },
};
