import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';

const API = 'http://localhost:8080/users';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  // запрос на получение списка юзеров
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(API).pipe(
  //     tap((_) => console.log('fetched users')),
  //     catchError(this.handleError<User[]>('getUsers', []))
  //   );
  // }
  getUsers() {
    const res = this.http.get(API + '?pageNumber=0&size=10&sortBy=id');
    console.log(res);
    return res;
  }
  // запрос на получение юзера по id

  public getUser(id: number) {
    return this.http.get(API + '/' + id);
  }

  // запрос на изменение пользователя
  putAPIUser(user: any) {
    this.http
      .put(API, {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.admin,
        project: user.project,
        post: user.post,
      })
      // this.http.put('assets/user.json', user)
      .subscribe({
        error: (err) => alert(err.message),
      });
  }

  // запрос на удаление сотрудника
  deleteAPIUser(id: number) {
    this.http.delete(API + '/' + id).subscribe({
      error: (err) => alert(err.message),
    });
  }

  // запрос на добавление сотрудника
  postAPIUser(user: any) {
    this.http
      .post(API, {
        email: user.email,
        username: user.name,
        role: user.admin,
        project: user.project,
        post: user.post,
      })
      .subscribe({
        error: (err) => alert(err.message),
      });
  }
  setUsers(users: any): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
  setUser(user: object): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
