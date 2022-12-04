export interface UserShort {
  username: string;
  userId: number;
}
export interface AuthState {
  isLoginIn: boolean;
}

export const initialAuthState: AuthState = {
  isLoginIn: false,
};
