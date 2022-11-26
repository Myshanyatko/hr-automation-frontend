export interface UserInfo {
  id: number;
  username: string;
  birthDate: Date | null;
  email: string;
  project: string;
  post: string;
  photo: File | null;
  about: string;
  admin: boolean;
}
