import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../staff/user';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
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
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API).pipe(
      tap((_) => console.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  // запрос на получение юзера по id
  // getAPIUser(id: number) {
  //    return new Promise((resolve, reject)=>{
  //  this.http.get(API+'/'+id).subscribe({
  //     next: (res: object) => this.setUser(res),
  //     error: (err) =>  alert(err)
  //       })
  //      resolve(true)
  //      } )
  // }
  public getAPIUser(id: number) {
    return new Observable(() => {
      this.http.get(API + '/' + id).subscribe({
        next: (res: object) => this.setUser(res),
        error: (err) => alert(err),
      });
      // return this.getUser()
    });
  }

  // запрос на изменение пользователя
  putAPIUser(user: any) {
    this.http
      .put(
        API,
        {
          id: user.id,
          email: user.email,
          username: user.name,
          role: user.admin,
          project: user.project,
          post: user.post,
        },
        httpOptions
      )
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
      .post(
        API,
        {
          email: user.email,
          username: user.name,
          role: user.admin,
          project: user.project,
          post: user.post,
        },
        httpOptions
      )
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

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
