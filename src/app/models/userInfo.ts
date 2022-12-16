export interface UserInfo {
  id: number;
  username: string;
  birthDate: Date | null;
  email: string;
  project: string;
  post: string;
  photo: File | null;
  pictureUrl: string;
  about: string;
  admin: boolean;
}
