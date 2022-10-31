import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API = "http://localhost:8080/users";
@Injectable({
  providedIn: 'root'
})

export class UsersService {
  

  constructor(private http: HttpClient) { }

    // запрос на получение списка юзеров
  getAPIUsers() {
    this.http.get(API).subscribe({
    // this.http.get('https://jsonplaceholder.typicode.com/users')
    // .subscribe({
      next: (res: any) => this.setUsers(res),
      error: (err) => alert(err.message)
        })
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
  getAPIUser(id: number) {
     return new Observable(()=>{
   this.http.get(API+'/'+id)
   .subscribe({
      next: (res: object) => this.setUser(res),
      error: (err) =>  alert(err)
        })  
        // return this.getUser()   
       })
       
  }


  // запрос на изменение пользователя
  putAPIUser(user: any){
    this.http.put(API, {
      id: user.id,
      email: user.email, 
      username: user.name,
      role: user.admin,
      project: user.project,
      post: user.post
  }, httpOptions)
    // this.http.put('assets/user.json', user)
    .subscribe({
      error: (err) => alert(err.message)
        })
  }

   // запрос на удаление сотрудника
  deleteAPIUser(id: number){
    this.http.delete(API+ '/'+id).subscribe({
      error: (err) => alert(err.message)
    })
  }

  // запрос на добавление сотрудника
  postAPIUser(user: any){
    this.http.post(API, {
      email: user.email, 
      username: user.name,
      role: user.admin,
      project: user.project,
      post: user.post
  }, httpOptions)
    .subscribe({
      error: (err) => alert(err.message)
        })
  }
  setUsers(users: any): void{
    
    localStorage.setItem('users', JSON.stringify(users));
  }
  setUser(user: object): void{
    
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUsers(){
    return JSON.parse(localStorage.getItem("users")  || '{}');
  }
  getUser(){
   
    return JSON.parse(localStorage.getItem("user")  || '{}');
  }
}
