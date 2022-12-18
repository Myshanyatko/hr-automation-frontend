import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserInfo } from '../models/userInfo';

const API = 'https://hr-automation-backend.onrender.com/users';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // запрос на поучение списка юзеров
  getUsers(pageNumber: number) {
    return this.http.get<{users: User[], pages: number}>(API, {
      params: { pageNumber: pageNumber, size: 5, sortBy: 'id' },
    });
  }
  getFilteredUsers(pageNumber: number, filter: string) {
    return this.http.get< User[]>(API + '/search', {
      params: { pageNumber: pageNumber, size: 5, sortBy: 'id', filter: filter },
    });
  }
  // запрос на получение юзера по id

  getUser(id: number) {
    return this.http.get<UserInfo>(API + '/' + id);
  }

  // запрос на изменение пользователя
  putUser(user: UserInfo) {
    return this.http.put(API, {
      id: user.id,
      email: user.email,
      birthDate: user.birthDate,
      username: user.username,
      admin: user.admin,
      project: user.project,
      post: user.post,
      about: user.about,
      pictureUrl: user.pictureUrl
    });
  }
  postPhoto(fd: FormData, id: number) {
    return this.http.post(
      'https://hr-automation-backend.onrender.com/file/user/'+id,
      fd
    );
  }

  // запрос на удаление сотрудника
  deleteUser(id: number) {
    return this.http.delete(API + '/' + id);
  }

  // запрос на добавление сотрудника
  postUser(user: UserInfo) {
    return this.http.post<number>(API, {
      id: user.id,
      email: user.email,
      birthDate: user.birthDate,
      username: user.username,
      admin: user.admin,
      project: user.project,
      post: user.post,
      about: user.about,
    });
  }
}
