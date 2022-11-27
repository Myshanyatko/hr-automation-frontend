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
  getUsers() {
    return this.http.get<User[]>(API, {
      params: { pageNumber: 0, size: 10, sortBy: 'id' },
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
    });
  }

  // запрос на удаление сотрудника
  deleteUser(id: number) {
    return this.http.delete(API + '/' + id);
  }

  // запрос на добавление сотрудника
  postUser(user: UserInfo) {
    return this.http.post(API, {
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
